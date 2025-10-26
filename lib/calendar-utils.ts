import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  isValid
} from 'date-fns';

/**
 * Generates a 6-week calendar grid for a given month
 * Returns an array of 42 dates (6 weeks × 7 days)
 */
export function generateCalendarGrid(date: Date): Date[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  // Get the start of the week for the first day of the month (Monday as first day)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  
  // Get the end of the week for the last day of the month
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  // Generate all days in the calendar grid
  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });
  
  // Ensure we always have exactly 42 days (6 weeks)
  // If we have less than 42 days, extend to the next week
  if (days.length < 42) {
    const additionalDays = eachDayOfInterval({
      start: days[days.length - 1],
      end: endOfWeek(addMonths(calendarEnd, 0), { weekStartsOn: 1 })
    }).slice(1); // Remove the first day as it's already included
    
    days.push(...additionalDays.slice(0, 42 - days.length));
  }
  
  return days.slice(0, 42); // Ensure exactly 42 days
}

/**
 * Formats a date for display in the calendar header
 */
export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy');
}

/**
 * Formats a date for display in day cells
 */
export function formatDayNumber(date: Date): string {
  return format(date, 'd');
}

/**
 * Formats a date to ISO string for storage (YYYY-MM-DD)
 */
export function formatDateForStorage(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Formats time for display (HH:MM)
 */
export function formatTime(timeString: string): string {
  // Assumes timeString is in HH:MM format
  return timeString;
}

/**
 * Parses an ISO date string to Date object
 */
export function parseStoredDate(dateString: string): Date | null {
  try {
    const parsed = parseISO(dateString);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Checks if a date is in the current month being displayed
 */
export function isCurrentMonth(date: Date, currentMonth: Date): boolean {
  return isSameMonth(date, currentMonth);
}

/**
 * Checks if a date is today
 */
export function isTodayDate(date: Date): boolean {
  return isToday(date);
}

/**
 * Checks if two dates are the same day
 */
export function isSameDayDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

/**
 * Gets the previous month
 */
export function getPreviousMonth(date: Date): Date {
  return subMonths(date, 1);
}

/**
 * Gets the next month
 */
export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

/**
 * Gets today's date
 */
export function getTodayDate(): Date {
  return new Date();
}

/**
 * Validates if a time string is in correct HH:MM format
 */
export function isValidTimeFormat(timeString: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}

/**
 * Compares two time strings and returns true if start is before end
 */
export function isStartTimeBeforeEndTime(startTime: string, endTime: string): boolean {
  if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
    return false;
  }
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;
  
  return startTotalMinutes < endTotalMinutes;
}

/**
 * Gets the days of the week labels (Monday to Sunday)
 */
export function getWeekDayLabels(): string[] {
  // Generate a week starting from Monday
  const monday = new Date(2024, 0, 1); // January 1, 2024 was a Monday
  const week = eachDayOfInterval({
    start: startOfWeek(monday, { weekStartsOn: 1 }),
    end: endOfWeek(monday, { weekStartsOn: 1 })
  });
  
  return week.map(day => format(day, 'EEE')); // Short day names: Mon, Tue, Wed, etc.
}