// Learning Through Motion - TypeScript Types
// Matching database schema

export type UserRole = 'parent' | 'admin';

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Child = {
  id: string;
  user_id: string;
  name: string;
  date_of_birth: Date;
  age: number;
  notes?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at: Date;
  updated_at: Date;
};

export type SessionBlockStatus = 'draft' | 'published' | 'full' | 'cancelled';

export type SessionBlock = {
  id: string;
  name: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  time_start: string;
  time_end: string;
  capacity: number;
  current_bookings: number;
  location?: string;
  status: SessionBlockStatus;
  registration_fee: number;
  session_fee: number;
  total_sessions: number;
  created_at: Date;
  updated_at: Date;
};

export type SessionStatus = 'scheduled' | 'completed' | 'cancelled';

export type Session = {
  id: string;
  block_id: string;
  session_number: number;
  date: Date;
  time_start: string;
  time_end: string;
  status: SessionStatus;
  notes?: string;
  created_at: Date;
};

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded';
export type PaymentMethod = 'online' | 'bank_transfer';

export type Booking = {
  id: string;
  booking_reference: string;
  user_id: string;
  child_id: string;
  block_id: string;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method?: PaymentMethod;
  subtotal: number;
  discount_amount: number;
  total_amount: number;
  amount_paid: number;
  discount_code_used?: string;
  is_trial: boolean;
  trial_date?: Date;
  notes?: string;
  created_at: Date;
  updated_at: Date;
};

export type Payment = {
  id: string;
  booking_id: string;
  amount: number;
  payment_method: 'stripe' | 'bank_transfer';
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paid_at?: Date;
  notes?: string;
  created_at: Date;
};

export type DiscountCodeType = 'percentage' | 'fixed_amount';
export type DiscountCodeStatus = 'active' | 'expired' | 'disabled';

export type DiscountCode = {
  id: string;
  code: string;
  description?: string;
  type: DiscountCodeType;
  value: number;
  valid_from: Date;
  valid_until: Date;
  usage_limit?: number;
  times_used: number;
  applicable_to: 'all' | 'specific_blocks';
  applicable_block_ids?: string[];
  status: DiscountCodeStatus;
  created_at: Date;
  updated_at: Date;
};

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'cancelled';

export type Attendance = {
  id: string;
  session_id: string;
  child_id: string;
  status: AttendanceStatus;
  notes?: string;
  marked_at: Date;
  marked_by?: string;
};

// ==========================================
// VIEW TYPES (for database views)
// ==========================================

export type UpcomingSessionView = {
  id: string;
  date: Date;
  time_start: string;
  time_end: string;
  block_name: string;
  location?: string;
  confirmed_bookings: number;
  capacity: number;
};

export type BookingSummaryView = {
  id: string;
  booking_reference: string;
  created_at: Date;
  parent_name: string;
  parent_email: string;
  parent_phone?: string;
  child_name: string;
  child_age: number;
  block_name: string;
  start_date: Date;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method?: PaymentMethod;
  total_amount: number;
  amount_paid: number;
  amount_outstanding: number;
};

export type BlockCapacityView = {
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  status: SessionBlockStatus;
  capacity: number;
  current_bookings: number;
  spots_remaining: number;
  capacity_percentage: number;
  paid_count: number;
  unpaid_count: number;
  total_revenue_potential: number;
  total_revenue_received: number;
};

// ==========================================
// FORM INPUT TYPES
// ==========================================

export type SignUpInput = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

export type ChildInput = {
  name: string;
  date_of_birth: string;
  notes?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
};

export type BookingInput = {
  child_id: string;
  block_id: string;
  payment_method?: PaymentMethod;
  discount_code?: string;
};

export type TrialBookingInput = {
  child_id: string;
  trial_date: string;
};

// ==========================================
// API RESPONSE TYPES
// ==========================================

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type BookingWithDetails = Booking & {
  child: Child;
  block: SessionBlock;
  sessions: Session[];
  user: Pick<User, 'name' | 'email' | 'phone'>;
};

export type SessionBlockWithSessions = SessionBlock & {
  sessions: Session[];
  spots_remaining: number;
};

// ==========================================
// CART & CHECKOUT TYPES
// ==========================================

export type CartItem = {
  type: 'block' | 'trial';
  block_id?: string;
  child_id?: string;
  block?: SessionBlock;
  child?: Child;
  price: number;
};

export type CartState = {
  items: CartItem[];
  discount_code?: string;
  discount_amount: number;
  subtotal: number;
  total: number;
};

export type CheckoutSession = {
  booking_id: string;
  stripe_client_secret?: string;
  bank_transfer_reference?: string;
};

// ==========================================
// ADMIN TYPES
// ==========================================

export type CreateBlockInput = {
  name: string;
  description?: string;
  start_date: string;
  day_of_week: number;
  time_start: string;
  time_end: string;
  capacity: number;
  location: string;
  registration_fee: number;
  session_fee: number;
  total_sessions: number;
};

export type AdminDashboardStats = {
  today_sessions: number;
  today_attendees: number;
  pending_bookings: number;
  pending_payments: number;
  total_revenue_this_month: number;
  next_block_capacity: {
    filled: number;
    total: number;
  };
};

// ==========================================
// UTILITY TYPES
// ==========================================

export type DateRange = {
  start: Date;
  end: Date;
};

export type TimeSlot = {
  start: string; // HH:MM format
  end: string;
};

export type PricingBreakdown = {
  registration_fee: number;
  session_count: number;
  session_fee: number;
  sessions_total: number;
  discount_amount: number;
  subtotal: number;
  total: number;
};
