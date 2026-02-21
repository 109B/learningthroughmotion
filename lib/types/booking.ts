// Learning Through Motion - Booking Types

export type SessionBlock = {
  id: string;
  name: string;
  description?: string;
  start_date: Date;
  end_date: Date | null;
  day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
  time_start: string;
  time_end: string;
  capacity: number;
  current_bookings: number;
  location: string | null;
  status: 'draft' | 'published' | 'full' | 'completed';
  registration_fee: number;
  session_fee: number;
  full_block_session_fee: number;
  total_sessions: number;
  created_at: Date;
  updated_at: Date;
};
