// Learning Through Motion - User Queries

import { supabase, handleSupabaseError } from '../client';
import type { User, SignUpInput } from '@/lib/types/booking';
import bcrypt from 'bcryptjs';

/**
 * Create a new user (sign up)
 */
export async function createUser(input: SignUpInput): Promise<User> {
  // Hash the password
  const password_hash = await bcrypt.hash(input.password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert({
      email: input.email.toLowerCase(),
      name: input.name,
      phone: input.phone,
      password_hash,
      role: 'parent',
      email_verified: false,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      // Unique violation - email already exists
      throw new Error('An account with this email already exists');
    }
    handleSupabaseError(error);
  }

  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Get user by email (for authentication)
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    handleSupabaseError(error);
  }

  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    handleSupabaseError(error);
  }

  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Verify user password
 */
export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    handleSupabaseError(error);
  }

  const isValid = await bcrypt.compare(password, data.password_hash);
  if (!isValid) return null;

  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Update user profile
 */
export async function updateUser(userId: string, updates: {
  name?: string;
  phone?: string;
  email_verified?: boolean;
}): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) handleSupabaseError(error);

  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at),
  };
}

/**
 * Update user password
 */
export async function updatePassword(userId: string, newPassword: string): Promise<void> {
  const password_hash = await bcrypt.hash(newPassword, 10);

  const { error } = await supabase
    .from('users')
    .update({ password_hash })
    .eq('id', userId);

  if (error) handleSupabaseError(error);
}

/**
 * Check if email exists
 */
export async function emailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') {
    handleSupabaseError(error);
  }

  return !!data;
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) handleSupabaseError(error);

  return data.map(user => ({
    ...user,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at),
  }));
}

/**
 * Get user with their children and bookings
 */
export async function getUserWithDetails(userId: string) {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select(`
      *,
      children(*),
      bookings(
        *,
        child:children(name),
        block:session_blocks(name, start_date, end_date)
      )
    `)
    .eq('id', userId)
    .single();

  if (userError) {
    if (userError.code === 'PGRST116') return null;
    handleSupabaseError(userError);
  }

  return {
    ...user,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at),
    children: user.children.map((child: any) => ({
      ...child,
      date_of_birth: new Date(child.date_of_birth),
      created_at: new Date(child.created_at),
      updated_at: new Date(child.updated_at),
    })),
    bookings: user.bookings.map((booking: any) => ({
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
