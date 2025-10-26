'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarHeaderProps } from '@/types';
import { formatMonthYear } from '@/lib/calendar-utils';

export default function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {/* Month/Year Display */}
      <h1 className="text-2xl font-semibold text-gray-900">
        {formatMonthYear(currentDate)}
      </h1>
      
      {/* Navigation Controls */}
      <div className="flex items-center space-x-2">
        {/* Today Button */}
        <button
          onClick={onToday}
          className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label="Go to today"
        >
          Today
        </button>
        
        {/* Previous Month Button */}
        <button
          onClick={onPreviousMonth}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Next Month Button */}
        <button
          onClick={onNextMonth}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}