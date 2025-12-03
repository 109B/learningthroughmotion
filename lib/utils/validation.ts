// Learning Through Motion - Validation Schemas with Zod

import { z } from 'zod';

/**
 * User Registration / Sign Up
 */
export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+44|0)[0-9]{10}$/, 'Invalid UK phone number').optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

/**
 * User Sign In
 */
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Child Profile
 */
export const childSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  date_of_birth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 3 && age <= 18;
  }, 'Child must be between 3 and 18 years old'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
  emergency_contact_name: z.string().min(2, 'Emergency contact name is required'),
  emergency_contact_phone: z.string().regex(/^(\+44|0)[0-9]{10}$/, 'Invalid UK phone number'),
});

/**
 * Booking Creation
 */
export const bookingSchema = z.object({
  child_id: z.string().uuid('Invalid child ID'),
  block_id: z.string().uuid('Invalid block ID'),
  payment_method: z.enum(['online', 'bank_transfer']).optional(),
  discount_code: z.string().max(50).optional(),
});

/**
 * Trial Booking
 */
export const trialBookingSchema = z.object({
  child_id: z.string().uuid('Invalid child ID'),
  trial_date: z.string().refine((date) => {
    const trialDate = new Date(date);
    const today = new Date();
    return trialDate >= today;
  }, 'Trial date must be in the future'),
});

/**
 * Session Block Creation (Admin)
 */
export const createBlockSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters').max(255),
  description: z.string().max(1000).optional(),
  start_date: z.string().refine((date) => {
    const startDate = new Date(date);
    const today = new Date();
    return startDate >= today;
  }, 'Start date must be in the future'),
  day_of_week: z.number().min(0).max(6),
  time_start: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  time_end: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  capacity: z.number().min(1).max(20),
  location: z.string().min(5).max(255),
  registration_fee: z.number().min(0).max(1000),
  session_fee: z.number().min(0).max(100),
  total_sessions: z.number().min(1).max(12),
}).refine((data) => {
  const start = data.time_start.split(':').map(Number);
  const end = data.time_end.split(':').map(Number);
  const startMinutes = start[0] * 60 + start[1];
  const endMinutes = end[0] * 60 + end[1];
  return endMinutes > startMinutes;
}, {
  message: 'End time must be after start time',
  path: ['time_end'],
});

/**
 * Discount Code Creation (Admin)
 */
export const discountCodeSchema = z.object({
  code: z.string().min(3).max(50).regex(/^[A-Z0-9]+$/, 'Code must be uppercase letters and numbers only'),
  description: z.string().max(500).optional(),
  type: z.enum(['percentage', 'fixed_amount']),
  value: z.number().positive('Value must be positive'),
  valid_from: z.string(),
  valid_until: z.string(),
  usage_limit: z.number().positive().optional(),
  applicable_to: z.enum(['all', 'specific_blocks']),
  applicable_block_ids: z.array(z.string().uuid()).optional(),
}).refine((data) => {
  if (data.type === 'percentage' && data.value > 100) {
    return false;
  }
  return true;
}, {
  message: 'Percentage discount cannot exceed 100%',
  path: ['value'],
}).refine((data) => {
  const validFrom = new Date(data.valid_from);
  const validUntil = new Date(data.valid_until);
  return validUntil > validFrom;
}, {
  message: 'Valid until date must be after valid from date',
  path: ['valid_until'],
});

/**
 * Booking Status Update (Admin)
 */
export const updateBookingStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
});

/**
 * Payment Status Update (Admin)
 */
export const updatePaymentStatusSchema = z.object({
  payment_status: z.enum(['unpaid', 'partial', 'paid', 'refunded']),
  amount_paid: z.number().min(0).optional(),
});

/**
 * Payment Record Creation
 */
export const createPaymentSchema = z.object({
  booking_id: z.string().uuid('Invalid booking ID'),
  amount: z.number().positive('Amount must be positive'),
  payment_method: z.enum(['stripe', 'bank_transfer']),
  transaction_id: z.string().max(255).optional(),
  notes: z.string().max(500).optional(),
});

/**
 * Attendance Marking (Admin)
 */
export const markAttendanceSchema = z.object({
  session_id: z.string().uuid('Invalid session ID'),
  child_id: z.string().uuid('Invalid child ID'),
  status: z.enum(['present', 'absent', 'late', 'cancelled']),
  notes: z.string().max(500).optional(),
});

/**
 * Helper to validate data against a schema
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  result.error.errors.forEach((error) => {
    const path = error.path.join('.');
    errors[path] = error.message;
  });

  return { success: false, errors };
}
