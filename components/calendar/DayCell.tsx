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
        {
          // Current month styling
          "bg-white hover:bg-gray-50": isCurrentMonth,
          // Other month styling (grayed out)
          "bg-gray-50 text-gray-400 hover:bg-gray-100": !isCurrentMonth,
        }
      )}
      onClick={onClick}
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

      {/* Event List - Stacked like Google Calendar */}
      {hasEvents && (
        <div className="mt-1 space-y-1 overflow-hidden">
          {/* Show up to 3 events as full-width bars */}
          {events.slice(0, 3).map((event, index) => (
            <button
              key={`${event.id}-${index}`}
              className={cn(
                "text-xs truncate px-2 py-0.5 rounded w-full text-left hover:opacity-80 transition-opacity cursor-pointer font-medium outline-none",
                event.color ? "text-white" : "text-white bg-blue-500"
              )}
              style={{
                backgroundColor: event.color || '#3b82f6'
              }}
              title={`${event.title} - Click to edit`}
              onClick={(e) => handleEventClick(e, event)}
              aria-label={`Edit event: ${event.title}`}
            >
              {event.title}
            </button>
          ))}

          {/* Show "+N more" indicator if there are more than 3 events */}
          {eventCount > 3 && (
            <button
              className="text-xs text-gray-600 hover:text-gray-900 px-2 py-0.5 w-full text-left font-medium transition-colors cursor-pointer outline-none"
              onClick={(e) => {
                e.stopPropagation();
                // Open modal to show all events or first event
                openModal(events[0]);
              }}
              title={`View all ${eventCount} events`}
              aria-label={`View all ${eventCount} events`}
            >
              +{eventCount - 3} more
            </button>
          )}
        </div>
      )}
    </div>
  );
}