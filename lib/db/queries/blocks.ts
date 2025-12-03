// Learning Through Motion - Session Block Queries

import { supabase, handleSupabaseError } from '../client';
import type { SessionBlock, SessionBlockWithSessions, Session } from '@/lib/types/booking';

/**
 * Get all published session blocks available for booking
 * Filters out past blocks and orders by start date
 */
export async function getAvailableBlocks(): Promise<SessionBlock[]> {
  const { data, error } = await supabase
    .from('session_blocks')
    .select('*')
    .eq('status', 'published')
    .gte('start_date', new Date().toISOString().split('T')[0])
    .order('start_date', { ascending: true });

  if (error) handleSupabaseError(error);

  return data.map(block => ({
    ...block,
    start_date: new Date(block.start_date),
    end_date: new Date(block.end_date),
    created_at: new Date(block.created_at),
    updated_at: new Date(block.updated_at),
  }));
}

/**
 * Get a specific session block by ID with all its sessions
 */
export async function getBlockById(blockId: string): Promise<SessionBlockWithSessions | null> {
  // Get the block
  const { data: block, error: blockError } = await supabase
    .from('session_blocks')
    .select('*')
    .eq('id', blockId)
    .single();

  if (blockError) {
    if (blockError.code === 'PGRST116') return null; // Not found
    handleSupabaseError(blockError);
  }

  // Get associated sessions
  const { data: sessions, error: sessionsError } = await supabase
    .from('sessions')
    .select('*')
    .eq('block_id', blockId)
    .order('session_number', { ascending: true });

  if (sessionsError) handleSupabaseError(sessionsError);

  const mappedSessions: Session[] = sessions.map(session => ({
    ...session,
    date: new Date(session.date),
    created_at: new Date(session.created_at),
  }));

  return {
    ...block,
    start_date: new Date(block.start_date),
    end_date: new Date(block.end_date),
    created_at: new Date(block.created_at),
    updated_at: new Date(block.updated_at),
    sessions: mappedSessions,
    spots_remaining: block.capacity - block.current_bookings,
  };
}

/**
 * Get all blocks (for admin panel)
 */
export async function getAllBlocks(): Promise<SessionBlock[]> {
  const { data, error } = await supabase
    .from('session_blocks')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) handleSupabaseError(error);

  return data.map(block => ({
    ...block,
    start_date: new Date(block.start_date),
    end_date: new Date(block.end_date),
    created_at: new Date(block.created_at),
    updated_at: new Date(block.updated_at),
  }));
}

/**
 * Get block capacity summary (using database view)
 */
export async function getBlockCapacitySummary() {
  const { data, error } = await supabase
    .from('v_block_capacity')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) handleSupabaseError(error);

  return data.map(item => ({
    ...item,
    start_date: new Date(item.start_date),
    end_date: new Date(item.end_date),
  }));
}

/**
 * Check if a block has available capacity
 */
export async function checkBlockAvailability(blockId: string): Promise<{
  available: boolean;
  spotsRemaining: number;
}> {
  const { data, error } = await supabase
    .from('session_blocks')
    .select('capacity, current_bookings, status')
    .eq('id', blockId)
    .single();

  if (error) handleSupabaseError(error);

  const spotsRemaining = data.capacity - data.current_bookings;
  const available = data.status === 'published' && spotsRemaining > 0;

  return { available, spotsRemaining };
}

/**
 * Get upcoming sessions for a specific block
 */
export async function getUpcomingSessions(blockId: string): Promise<Session[]> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('block_id', blockId)
    .gte('date', new Date().toISOString().split('T')[0])
    .eq('status', 'scheduled')
    .order('date', { ascending: true });

  if (error) handleSupabaseError(error);

  return data.map(session => ({
    ...session,
    date: new Date(session.date),
    created_at: new Date(session.created_at),
  }));
}
