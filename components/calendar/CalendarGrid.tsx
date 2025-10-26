'use client';

import React from 'react';
import { CalendarGridProps } from '@/types';
import { generateCalendarGrid, getWeekDayLabels, formatDateForStorage, isCurrentMonth, isTodayDate, isSameDayDate } from '@/lib/calendar-utils';
import DayCell from './DayCell';

export default function CalendarGrid({
  currentDate,
  events,
  onDateClick,
  selectedDate
}: CalendarGridProps) {
  const calendarDays = generateCalendarGrid(currentDate);
  const weekDayLabels = getWeekDayLabels();

  return (
    <div className="flex flex-col">
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDayLabels.map((dayLabel) => (
          <div
            key={dayLabel}
            className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50"
          >
            {dayLabel}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid - 6 weeks × 7 days */}
      <div className="grid grid-cols-7 border-l border-t border-gray-200">
        {calendarDays.map((date, index) => {
          const dateString = formatDateForStorage(date);
          const dayEvents = events.filter(event => event.date === dateString);
          const isCurrentMonthDate = isCurrentMonth(date, currentDate);
          const isToday = isTodayDate(date);
          const isSelected = selectedDate ? isSameDayDate(date, selectedDate) : false;

          return (
            <DayCell
              key={`${dateString}-${index}`}
              date={date}
              events={dayEvents}
              isCurrentMonth={isCurrentMonthDate}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => onDateClick(date)}
            />
          );
        })}
      </div>
    </div>
  );
}