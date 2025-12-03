// Learning Through Motion - Database Client
// Supabase client for server-side and client-side operations

import { createClient } from '@supabase/supabase-js';

// Environment variable validation
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client for general use
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Don't persist sessions on server
  },
});

// Database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          password_hash: string;
          role: 'parent' | 'admin';
          email_verified: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      children: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          date_of_birth: string;
          age: number;
          notes: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      session_blocks: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          start_date: string;
          end_date: string;
          day_of_week: number;
          time_start: string;
          time_end: string;
          capacity: number;
          current_bookings: number;
          location: string | null;
          status: 'draft' | 'published' | 'full' | 'cancelled';
          registration_fee: number;
          session_fee: number;
          total_sessions: number;
          created_at: string;
          updated_at: string;
        };
      };
      sessions: {
        Row: {
          id: string;
          block_id: string;
          session_number: number;
          date: string;
          time_start: string;
          time_end: string;
          status: 'scheduled' | 'completed' | 'cancelled';
          notes: string | null;
          created_at: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          booking_reference: string;
          user_id: string;
          child_id: string;
          block_id: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          payment_status: 'unpaid' | 'partial' | 'paid' | 'refunded';
          payment_method: 'online' | 'bank_transfer' | null;
          subtotal: number;
          discount_amount: number;
          total_amount: number;
          amount_paid: number;
          discount_code_used: string | null;
          is_trial: boolean;
          trial_date: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          amount: number;
          payment_method: 'stripe' | 'bank_transfer';
          transaction_id: string | null;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          paid_at: string | null;
          notes: string | null;
          created_at: string;
        };
      };
      discount_codes: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          type: 'percentage' | 'fixed_amount';
          value: number;
          valid_from: string;
          valid_until: string;
          usage_limit: number | null;
          times_used: number;
          applicable_to: 'all' | 'specific_blocks';
          applicable_block_ids: string[] | null;
          status: 'active' | 'expired' | 'disabled';
          created_at: string;
          updated_at: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          session_id: string;
          child_id: string;
          status: 'present' | 'absent' | 'late' | 'cancelled';
          notes: string | null;
          marked_at: string;
          marked_by: string | null;
        };
      };
    };
    Views: {
      v_upcoming_sessions: {
        Row: {
          id: string;
          date: string;
          time_start: string;
          time_end: string;
          block_name: string;
          location: string | null;
          confirmed_bookings: number;
          capacity: number;
        };
      };
      v_booking_summary: {
        Row: {
          id: string;
          booking_reference: string;
          created_at: string;
          parent_name: string;
          parent_email: string;
          parent_phone: string | null;
          child_name: string;
          child_age: number;
          block_name: string;
          start_date: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          payment_status: 'unpaid' | 'partial' | 'paid' | 'refunded';
          payment_method: 'online' | 'bank_transfer' | null;
          total_amount: number;
          amount_paid: number;
          amount_outstanding: number;
        };
      };
      v_block_capacity: {
        Row: {
          id: string;
          name: string;
          start_date: string;
          end_date: string;
          status: 'draft' | 'published' | 'full' | 'cancelled';
          capacity: number;
          current_bookings: number;
          spots_remaining: number;
          capacity_percentage: number;
          paid_count: number;
          unpaid_count: number;
          total_revenue_potential: number;
          total_revenue_received: number;
        };
      };
    };
  };
};

// Helper function to handle Supabase errors consistently
export function handleSupabaseError(error: any): never {
  console.error('Database error:', error);
  throw new Error(error.message || 'Database operation failed');
}

// Helper to check if we have a valid Supabase connection
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('users').select('count').limit(1);
    return !error;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
}
