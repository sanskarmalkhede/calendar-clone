'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { Event, EventContextType, CalendarState } from '@/types';
import { format } from 'date-fns';

// Action types for the reducer
type EventAction =
  | { type: 'CREATE_EVENT'; payload: Event }
  | { type: 'UPDATE_EVENT'; payload: { id: string; event: Partial<Event> } }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'SET_CURRENT_DATE'; payload: Date }
  | { type: 'SET_SELECTED_DATE'; payload: Date | null }
  | { type: 'OPEN_MODAL'; payload?: Event }
  | { type: 'CLOSE_MODAL' }
  | { type: 'LOAD_EVENTS'; payload: Event[] };

// Initial state
const initialState: CalendarState = {
  currentDate: new Date(),
  selectedDate: null,
  events: [],
  isModalOpen: false,
  editingEvent: null,
};

// Reducer function
function eventReducer(state: CalendarState, action: EventAction): CalendarState {
  switch (action.type) {
    case 'CREATE_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id
            ? { ...event, ...action.payload.event }
            : event
        ),
      };
    
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };
    
    case 'SET_CURRENT_DATE':
      return {
        ...state,
        currentDate: action.payload,
      };
    
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload,
      };
    
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        editingEvent: action.payload || null,
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        editingEvent: null,
      };
    
    case 'LOAD_EVENTS':
      return {
        ...state,
        events: action.payload,
      };
    
    default:
      return state;
  }
}

// Create the context
const EventContext = createContext<EventContextType | undefined>(undefined);

// localStorage utilities
const STORAGE_KEY = 'calendar-events';

const saveEventsToStorage = (events: Event[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  } catch (error) {
    console.error('Failed to save events to localStorage:', error);
    
    // Handle quota exceeded error
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Consider clearing old data.');
      // Could implement cleanup logic here if needed
    }
    
    // Re-throw for component error handling if needed
    throw error;
  }
};

const loadEventsFromStorage = (): Event[] => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (error) {
    console.error('Failed to load events from localStorage:', error);
  }
  return [];
};

// Context provider component
export function EventProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = loadEventsFromStorage();
    if (storedEvents.length > 0) {
      dispatch({ type: 'LOAD_EVENTS', payload: storedEvents });
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (state.events.length > 0 || loadEventsFromStorage().length > 0) {
      try {
        saveEventsToStorage(state.events);
      } catch (error) {
        // Handle storage errors gracefully - events are still in memory
        console.warn('Events are saved in memory but could not be persisted to localStorage');
      }
    }
  }, [state.events]);

  // Generate unique ID for new events
  const generateId = useCallback(() => {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // CRUD operations with localStorage error handling
  const createEvent = useCallback((eventData: Omit<Event, 'id'>) => {
    try {
      const newEvent: Event = {
        ...eventData,
        id: generateId(),
      };
      dispatch({ type: 'CREATE_EVENT', payload: newEvent });
    } catch (error) {
      console.error('Failed to create event:', error);
      throw new Error('Failed to create event. Please try again.');
    }
  }, [generateId]);

  const updateEvent = useCallback((id: string, eventData: Partial<Event>) => {
    try {
      dispatch({ type: 'UPDATE_EVENT', payload: { id, event: eventData } });
    } catch (error) {
      console.error('Failed to update event:', error);
      throw new Error('Failed to update event. Please try again.');
    }
  }, []);

  const deleteEvent = useCallback((id: string) => {
    try {
      dispatch({ type: 'DELETE_EVENT', payload: id });
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw new Error('Failed to delete event. Please try again.');
    }
  }, []);

  // Filter events by date
  const getEventsByDate = useCallback((date: string) => {
    return state.events.filter(event => event.date === date);
  }, [state.events]);

  // Navigation functions
  const setCurrentDate = useCallback((date: Date) => {
    dispatch({ type: 'SET_CURRENT_DATE', payload: date });
  }, []);

  const setSelectedDate = useCallback((date: Date | null) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
  }, []);

  // Modal functions
  const openModal = useCallback((event?: Event) => {
    dispatch({ type: 'OPEN_MODAL', payload: event });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  // Load events (for localStorage integration)
  const loadEvents = useCallback((events: Event[]) => {
    dispatch({ type: 'LOAD_EVENTS', payload: events });
  }, []);

  const contextValue: EventContextType = {
    // State
    events: state.events,
    currentDate: state.currentDate,
    selectedDate: state.selectedDate,
    isModalOpen: state.isModalOpen,
    editingEvent: state.editingEvent,
    
    // Actions
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    
    // Navigation
    setCurrentDate,
    setSelectedDate,
    
    // Modal
    openModal,
    closeModal,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
}

// Custom hook to use the context
export function useEventContext() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
}

export default EventContext;