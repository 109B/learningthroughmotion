// Learning Through Motion - Date Utilities

import { format, parse, addWeeks, differenceInYears, isAfter, isBefore, isSameDay } from 'date-fns';

/**
 * Format a date for display (e.g., "11 Jan 2025")
 */
export function formatDate(date: Date): string {
  return format(date, 'd MMM yyyy');
}

/**
 * Format a date for display with day of week (e.g., "Sunday, 11 Jan 2025")
 */
export function formatDateWithDay(date: Date): string {
  return format(date, 'EEEE, d MMM yyyy');
}

/**
 * Format time for display (e.g., "10:00 AM")
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return format(date, 'h:mm a');
}

/**
 * Format time range for display (e.g., "10:00 AM - 10:45 AM")
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

/**
 * Get day of week name from number (0 = Sunday)
 */
export function getDayName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek] || '';
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date): number {
  return differenceInYears(new Date(), dateOfBirth);
}

/**
 * Generate session dates for a block
 * Given a start date and number of sessions, returns array of dates
 */
export function generateSessionDates(startDate: Date, totalSessions: number): Date[] {
  const dates: Date[] = [];

  for (let i = 0; i < totalSessions; i++) {
    dates.push(addWeeks(startDate, i));
  }

  return dates;
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: Date): boolean {
  return isBefore(date, new Date());
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(date: Date): boolean {
  return isAfter(date, new Date());
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Format date for input field (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Parse date from input field (YYYY-MM-DD)
 */
export function parseDateFromInput(dateString: string): Date {
  return parse(dateString, 'yyyy-MM-dd', new Date());
}

/**
 * Format date for database (ISO string)
 */
export function formatDateForDb(date: Date): string {
  return date.toISOString();
}

/**
 * Calculate end date from start date and number of sessions
 */
export function calculateEndDate(startDate: Date, totalSessions: number): Date {
  // Last session is (totalSessions - 1) weeks after start
  return addWeeks(startDate, totalSessions - 1);
}

/**
 * Get relative date string (e.g., "Today", "Tomorrow", "In 3 days")
 */
export function getRelativeDateString(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (isSameDay(date, tomorrow)) {
    return 'Tomorrow';
  }

  const daysUntil = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil > 0 && daysUntil <= 7) {
    return `In ${daysUntil} day${daysUntil === 1 ? '' : 's'}`;
  }

  if (daysUntil < 0 && daysUntil >= -7) {
    return `${Math.abs(daysUntil)} day${daysUntil === -1 ? '' : 's'} ago`;
  }

  return formatDate(date);
}

/**
 * Check if a session date falls within a date range
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return (isAfter(date, startDate) || isSameDay(date, startDate)) &&
         (isBefore(date, endDate) || isSameDay(date, endDate));
}

/**
 * Format date range for display (e.g., "11 Jan - 22 Feb 2025")
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  if (startDate.getFullYear() === endDate.getFullYear()) {
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${format(startDate, 'd')} - ${format(endDate, 'd MMM yyyy')}`;
    }
    return `${format(startDate, 'd MMM')} - ${format(endDate, 'd MMM yyyy')}`;
  }
  return `${format(startDate, 'd MMM yyyy')} - ${format(endDate, 'd MMM yyyy')}`;
}
