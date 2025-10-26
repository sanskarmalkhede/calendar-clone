"use client";

import React from 'react';
import { EventProvider } from '@/context/EventContext';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import EventModal from '@/components/calendar/EventModal';
import { useEventContext } from '@/context/EventContext';
import { getPreviousMonth, getNextMonth, getTodayDate } from '@/lib/calendar-utils';

function CalendarContent() {
  const {
    currentDate,
    selectedDate,
    events,
    isModalOpen,
    setCurrentDate,
    setSelectedDate,
    openModal,
    closeModal
  } = useEventContext();

  const handlePreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
  };

  const handleNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
  };

  const handleToday = () => {
    const today = getTodayDate();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    openModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
          />
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default function CalendarPage() {
  return (
    <EventProvider>
      <CalendarContent />
    </EventProvider>
  );
}