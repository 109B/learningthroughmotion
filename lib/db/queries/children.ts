// Learning Through Motion - Children Profile Queries

import { supabase, handleSupabaseError } from '../client';
import type { Child, ChildInput } from '@/lib/types/booking';

/**
 * Create a new child profile
 */
export async function createChild(userId: string, input: ChildInput): Promise<Child> {
  const { data, error } = await supabase
    .from('children')
    .insert({
      user_id: userId,
      name: input.name,
      date_of_birth: input.date_of_birth,
      notes: input.notes,
      emergency_contact_name: input.emergency_contact_name,
      emergency_contact_phone: input.emergency_contact_phone,
    })
    .select()
    .single();

  if (error) handleSupabaseError(error);

  return {
    ...data,
    date_of_birth: new Date(data.date_of_birth),
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Get all children for a specific user
 */
export async function getUserChildren(userId: string): Promise<Child[]> {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('user_id', userId)
    .order('name', { ascending: true });

  if (error) handleSupabaseError(error);

  return data.map(child => ({
    ...child,
    date_of_birth: new Date(child.date_of_birth),
    created_at: new Date(child.created_at),
    updated_at: new Date(child.updated_at),
  }));
}

/**
 * Get a specific child by ID
 */
export async function getChildById(childId: string): Promise<Child | null> {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    handleSupabaseError(error);
  }

  return {
    ...data,
    date_of_birth: new Date(data.date_of_birth),
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Update a child profile
 */
export async function updateChild(childId: string, input: Partial<ChildInput>): Promise<Child> {
  const { data, error } = await supabase
    .from('children')
    .update({
      ...(input.name && { name: input.name }),
      ...(input.date_of_birth && { date_of_birth: input.date_of_birth }),
      ...(input.notes !== undefined && { notes: input.notes }),
      ...(input.emergency_contact_name && { emergency_contact_name: input.emergency_contact_name }),
      ...(input.emergency_contact_phone && { emergency_contact_phone: input.emergency_contact_phone }),
    })
    .eq('id', childId)
    .select()
    .single();

  if (error) handleSupabaseError(error);

  return {
    ...data,
    date_of_birth: new Date(data.date_of_birth),
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Delete a child profile
 */
export async function deleteChild(childId: string): Promise<void> {
  const { error } = await supabase
    .from('children')
    .delete()
    .eq('id', childId);

  if (error) handleSupabaseError(error);
}

/**
 * Check if user owns a child profile
 */
export async function checkChildOwnership(childId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('children')
    .select('user_id')
    .eq('id', childId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return false;
    handleSupabaseError(error);
  }

  return data.user_id === userId;
}

/**
 * Get child with their booking history
 */
export async function getChildWithBookings(childId: string) {
  const { data: child, error: childError } = await supabase
    .from('children')
    .select(`
      *,
      bookings(
        *,
        block:session_blocks(name, start_date, end_date)
      )
    `)
    .eq('id', childId)
    .single();

  if (childError) {
    if (childError.code === 'PGRST116') return null;
    handleSupabaseError(childError);
  }

  return {
    ...child,
    date_of_birth: new Date(child.date_of_birth),
    created_at: new Date(child.created_at),
    updated_at: new Date(child.updated_at),
    bookings: child.bookings.map((booking: any) => ({
      ...booking,
      trial_date: booking.trial_date ? new Date(booking.trial_date) : undefined,
      created_at: new Date(booking.created_at),
      updated_at: new Date(booking.updated_at),
      block: {
        ...booking.block,
        start_date: new Date(booking.block.start_date),
        end_date: new Date(booking.block.end_date),
      },
    })),
  };
}
