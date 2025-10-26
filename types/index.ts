/**
 * Core types for the Calendar UI system
 */

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO format (YYYY-MM-DD)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  color?: string; // Hex color code
}

export interface CalendarState {
  currentDate: Date;
  selectedDate: Date | null;
  events: Event[];
  isModalOpen: boolean;
  editingEvent: Event | null;
}

export interface EventContextType {
  // State
  events: Event[];
  currentDate: Date;
  selectedDate: Date | null;
  isModalOpen: boolean;
  editingEvent: Event | null;
  
  // Actions
  createEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsByDate: (date: string) => Event[];
  
  // Navigation
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date | null) => void;
  
  // Modal
  openModal: (event?: Event) => void;
  closeModal: () => void;
}

export interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}

export interface DayCellProps {
  date: Date;
  events: Event[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
  selectedDate: Date | null;
}