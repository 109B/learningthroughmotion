// Learning Through Motion - Booking Queries

import { supabase, handleSupabaseError } from '../client';
import type {
  Booking,
  BookingWithDetails,
  BookingInput,
  BookingSummaryView
} from '@/lib/types/booking';

/**
 * Create a new booking
 */
export async function createBooking(input: BookingInput & {
  user_id: string;
  subtotal: number;
  total_amount: number;
}): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      user_id: input.user_id,
      child_id: input.child_id,
      block_id: input.block_id,
      payment_method: input.payment_method,
      discount_code_used: input.discount_code,
      subtotal: input.subtotal,
      total_amount: input.total_amount,
      discount_amount: input.subtotal - input.total_amount,
      status: 'pending',
      payment_status: 'unpaid',
      is_trial: false,
    })
    .select()
    .single();

  if (error) handleSupabaseError(error);

  return {
    ...data,
    trial_date: data.trial_date ? new Date(data.trial_date) : undefined,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Get a booking by ID
 */
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    handleSupabaseError(error);
  }

  return {
    ...data,
    trial_date: data.trial_date ? new Date(data.trial_date) : undefined,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Get booking by reference (e.g., LTM-2025-0001)
 */
export async function getBookingByReference(reference: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_reference', reference)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    handleSupabaseError(error);
  }

  return {
    ...data,
    trial_date: data.trial_date ? new Date(data.trial_date) : undefined,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Get all bookings for a specific user
 */
export async function getUserBookings(userId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) handleSupabaseError(error);

  return data.map(booking => ({
    ...booking,
    trial_date: booking.trial_date ? new Date(booking.trial_date) : undefined,
    created_at: new Date(booking.created_at),
    updated_at: new Date(booking.updated_at),
  }));
}

/**
 * Get booking summary (using database view) for admin
 */
export async function getBookingSummaries(): Promise<BookingSummaryView[]> {
  const { data, error } = await supabase
    .from('v_booking_summary')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) handleSupabaseError(error);

  return data.map(item => ({
    ...item,
    created_at: new Date(item.created_at),
    start_date: new Date(item.start_date),
  }));
}

/**
 * Get booking with full details (child, block, sessions, user)
 */
export async function getBookingWithDetails(bookingId: string): Promise<BookingWithDetails | null> {
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select(`
      *,
      child:children(*),
      block:session_blocks(*),
      user:users(name, email, phone)
    `)
    .eq('id', bookingId)
    .single();

  if (bookingError) {
    if (bookingError.code === 'PGRST116') return null;
    handleSupabaseError(bookingError);
  }

  // Get sessions for the block
  const { data: sessions, error: sessionsError } = await supabase
    .from('sessions')
    .select('*')
    .eq('block_id', booking.block.id)
    .order('session_number', { ascending: true });

  if (sessionsError) handleSupabaseError(sessionsError);

  return {
    ...booking,
    trial_date: booking.trial_date ? new Date(booking.trial_date) : undefined,
    created_at: new Date(booking.created_at),
    updated_at: new Date(booking.updated_at),
    child: {
      ...booking.child,
      date_of_birth: new Date(booking.child.date_of_birth),
      created_at: new Date(booking.child.created_at),
      updated_at: new Date(booking.child.updated_at),
    },
    block: {
      ...booking.block,
      start_date: new Date(booking.block.start_date),
      end_date: new Date(booking.block.end_date),
      created_at: new Date(booking.block.created_at),
      updated_at: new Date(booking.block.updated_at),
    },
    sessions: sessions.map(s => ({
      ...s,
      date: new Date(s.date),
      created_at: new Date(s.created_at),
    })),
    user: booking.user,
  };
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  bookingId: string,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) handleSupabaseError(error);

  return {
    ...data,
    trial_date: data.trial_date ? new Date(data.trial_date) : undefined,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Update payment status and amount paid
 */
export async function updatePaymentStatus(
  bookingId: string,
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded',
  amountPaid?: number
): Promise<Booking> {
  const updateData: any = { payment_status: paymentStatus };
  if (amountPaid !== undefined) {
    updateData.amount_paid = amountPaid;
  }

  const { data, error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) handleSupabaseError(error);

  return {
    ...data,
    trial_date: data.trial_date ? new Date(data.trial_date) : undefined,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Get pending bookings (for admin)
 */
export async function getPendingBookings(): Promise<BookingSummaryView[]> {
  const { data, error } = await supabase
    .from('v_booking_summary')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) handleSupabaseError(error);

  return data.map(item => ({
    ...item,
    created_at: new Date(item.created_at),
    start_date: new Date(item.start_date),
  }));
}

/**
 * Get unpaid bookings (for admin)
 */
export async function getUnpaidBookings(): Promise<BookingSummaryView[]> {
  const { data, error } = await supabase
    .from('v_booking_summary')
    .select('*')
    .in('payment_status', ['unpaid', 'partial'])
    .order('created_at', { ascending: false });

  if (error) handleSupabaseError(error);

  return data.map(item => ({
    ...item,
    created_at: new Date(item.created_at),
    start_date: new Date(item.start_date),
  }));
}

/**
 * Delete a booking (admin only)
 */
export async function deleteBooking(bookingId: string): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) handleSupabaseError(error);
}
