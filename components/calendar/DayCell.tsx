'use client';

import React from 'react';
import { DayCellProps } from '@/types';
import { formatDayNumber } from '@/lib/calendar-utils';
import { cn } from '@/lib/utils';
import { useEventContext } from '@/context/EventContext';

export default function DayCell({
  date,
  events,
  isCurrentMonth,
  isToday,
  isSelected,
  onClick
}: DayCellProps) {
  const { openModal } = useEventContext();
  const dayNumber = formatDayNumber(date);
  const hasEvents = events.length > 0;
  const eventCount = events.length;

  const handleEventClick = (event: React.MouseEvent, eventToEdit: any) => {
    event.stopPropagation(); // Prevent day cell click
    openModal(eventToEdit);
  };

  return (
    <div
      className={cn(
        "relative min-h-[120px] p-2 border-r border-b border-gray-200 cursor-pointer transition-colors",
        "hover:bg-gray-50",
        {
          // Current month styling
          "bg-white": isCurrentMonth,
          // Other month styling (grayed out)
          "bg-gray-50 text-gray-400": !isCurrentMonth,
          // Today highlighting
          "bg-blue-50 border-blue-200": isToday && isCurrentMonth,
          "bg-blue-100": isToday && !isCurrentMonth,
          // Selected date styling
          "ring-2 ring-blue-500 ring-inset": isSelected,
          // Enhanced hover effects for days with events
          "hover:bg-blue-100": isToday,
          "hover:bg-gray-100": !isCurrentMonth && !isToday && !hasEvents,
          "hover:bg-blue-50": isCurrentMonth && hasEvents && !isToday,
          "hover:bg-gray-200": !isCurrentMonth && hasEvents && !isToday,
          // Special styling for days with events
          "border-l-2 border-l-blue-400": hasEvents && isCurrentMonth,
          "border-l-2 border-l-blue-300": hasEvents && !isCurrentMonth,
        }
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${dayNumber} ${hasEvents ? `with ${eventCount} event${eventCount > 1 ? 's' : ''}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Date Number */}
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full",
          {
            // Today's date special styling
            "bg-blue-600 text-white": isToday && isCurrentMonth,
            "bg-blue-400 text-white": isToday && !isCurrentMonth,
            // Regular date styling
            "text-gray-900": !isToday && isCurrentMonth,
            "text-gray-400": !isToday && !isCurrentMonth,
          }
        )}
      >
        {dayNumber}
      </div>

      {/* Event Indicators */}
      {hasEvents && (
        <div className="mt-1 space-y-1">
          {/* Show first few events as colored dots */}
          <div className="flex flex-wrap gap-1">
            {events.slice(0, 3).map((event, index) => (
              <button
                key={`${event.id}-${index}`}
                className={cn(
                  "w-2 h-2 rounded-full hover:scale-125 transition-transform cursor-pointer",
                  event.color ? "" : "bg-blue-500"
                )}
                style={{
                  backgroundColor: event.color || '#3b82f6'
                }}
                title={`${event.title} - Click to edit`}
                onClick={(e) => handleEventClick(e, event)}
                aria-label={`Edit event: ${event.title}`}
              />
            ))}
          </div>

          {/* Event Count Badge for multiple events */}
          {eventCount > 3 && (
            <div className="flex justify-center">
              <button
                className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-gray-600 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Open modal with first event for editing, or could show a list
                  openModal(events[0]);
                }}
                title={`${eventCount} events - Click to view`}
                aria-label={`View ${eventCount} events`}
              >
                +{eventCount - 3}
              </button>
            </div>
          )}

          {/* Single event count badge alternative */}
          {eventCount > 1 && eventCount <= 3 && (
            <div className="flex justify-end">
              <button
                className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Open modal with first event for editing
                  openModal(events[0]);
                }}
                title={`${eventCount} events - Click to view`}
                aria-label={`View ${eventCount} events`}
              >
                {eventCount}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Event Titles Preview (for single event) */}
      {eventCount === 1 && (
        <div className="mt-1">
          <button
            className={cn(
              "text-xs truncate px-1 py-0.5 rounded w-full text-left hover:opacity-80 transition-opacity cursor-pointer",
              events[0].color ? "text-white" : "text-white bg-blue-500"
            )}
            style={{
              backgroundColor: events[0].color || '#3b82f6'
            }}
            title={`${events[0].title} - Click to edit`}
            onClick={(e) => handleEventClick(e, events[0])}
            aria-label={`Edit event: ${events[0].title}`}
          >
            {events[0].title}
          </button>
        </div>
      )}
    </div>
  );
}