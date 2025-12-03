-- Learning Through Motion - Database Schema
-- Phase 1: Core Tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- USERS & AUTHENTICATION
-- ==========================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'parent' CHECK (role IN ('parent', 'admin')),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ==========================================
-- CHILDREN PROFILES
-- ==========================================

CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  age INTEGER GENERATED ALWAYS AS (
    EXTRACT(YEAR FROM AGE(date_of_birth))
  ) STORED,
  notes TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_children_user_id ON children(user_id);

-- ==========================================
-- SESSION BLOCKS (7-week programmes)
-- ==========================================

CREATE TABLE session_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  capacity INTEGER DEFAULT 6,
  current_bookings INTEGER DEFAULT 0,
  location VARCHAR(255),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'full', 'cancelled')),
  registration_fee DECIMAL(10, 2) DEFAULT 30.00,
  session_fee DECIMAL(10, 2) DEFAULT 15.00,
  total_sessions INTEGER DEFAULT 7,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_session_blocks_status ON session_blocks(status);
CREATE INDEX idx_session_blocks_start_date ON session_blocks(start_date);

-- ==========================================
-- INDIVIDUAL SESSIONS
-- ==========================================

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  block_id UUID NOT NULL REFERENCES session_blocks(id) ON DELETE CASCADE,
  session_number INTEGER NOT NULL, -- 1-7
  date DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(block_id, session_number)
);

CREATE INDEX idx_sessions_block_id ON sessions(block_id);
CREATE INDEX idx_sessions_date ON sessions(date);

-- ==========================================
-- BOOKINGS
-- ==========================================

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  block_id UUID NOT NULL REFERENCES session_blocks(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
  payment_method VARCHAR(20) CHECK (payment_method IN ('online', 'bank_transfer')),
  subtotal DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  total_amount DECIMAL(10, 2) NOT NULL,
  amount_paid DECIMAL(10, 2) DEFAULT 0.00,
  discount_code_used VARCHAR(50),
  is_trial BOOLEAN DEFAULT FALSE,
  trial_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_child_id ON bookings(child_id);
CREATE INDEX idx_bookings_block_id ON bookings(block_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);

-- ==========================================
-- PAYMENTS
-- ==========================================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('stripe', 'bank_transfer')),
  transaction_id VARCHAR(255), -- Stripe payment intent ID or bank reference
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  paid_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);

-- ==========================================
-- DISCOUNT CODES (Phase 3, but schema now)
-- ==========================================

CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed_amount')),
  value DECIMAL(10, 2) NOT NULL,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  usage_limit INTEGER, -- NULL = unlimited
  times_used INTEGER DEFAULT 0,
  applicable_to VARCHAR(20) DEFAULT 'all' CHECK (applicable_to IN ('all', 'specific_blocks')),
  applicable_block_ids UUID[], -- Array of block IDs if specific
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'disabled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_discount_codes_code ON discount_codes(code);
CREATE INDEX idx_discount_codes_status ON discount_codes(status);

-- ==========================================
-- ATTENDANCE (Phase 4, but schema now)
-- ==========================================

CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'cancelled')),
  notes TEXT,
  marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  marked_by UUID REFERENCES users(id),
  UNIQUE(session_id, child_id)
);

CREATE INDEX idx_attendance_session_id ON attendance(session_id);
CREATE INDEX idx_attendance_child_id ON attendance(child_id);

-- ==========================================
-- TRIGGERS FOR UPDATED_AT
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_blocks_updated_at
  BEFORE UPDATE ON session_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discount_codes_updated_at
  BEFORE UPDATE ON discount_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- TRIGGER FOR BOOKING REFERENCE GENERATION
-- ==========================================

CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_reference = 'LTM-' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' ||
    LPAD(NEXTVAL('booking_reference_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE booking_reference_seq START 1;

CREATE TRIGGER generate_booking_reference_trigger
  BEFORE INSERT ON bookings
  FOR EACH ROW
  WHEN (NEW.booking_reference IS NULL)
  EXECUTE FUNCTION generate_booking_reference();

-- ==========================================
-- TRIGGER TO UPDATE BLOCK CAPACITY
-- ==========================================

CREATE OR REPLACE FUNCTION update_block_capacity()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.status = 'confirmed') OR
     (TG_OP = 'UPDATE' AND OLD.status != 'confirmed' AND NEW.status = 'confirmed') THEN
    -- Increment current bookings
    UPDATE session_blocks
    SET current_bookings = current_bookings + 1
    WHERE id = NEW.block_id;

    -- Check if block is now full
    UPDATE session_blocks
    SET status = 'full'
    WHERE id = NEW.block_id
    AND current_bookings >= capacity
    AND status = 'published';

  ELSIF (TG_OP = 'UPDATE' AND OLD.status = 'confirmed' AND NEW.status != 'confirmed') OR
        (TG_OP = 'DELETE' AND OLD.status = 'confirmed') THEN
    -- Decrement current bookings
    UPDATE session_blocks
    SET current_bookings = GREATEST(current_bookings - 1, 0)
    WHERE id = COALESCE(NEW.block_id, OLD.block_id);

    -- Update status if no longer full
    UPDATE session_blocks
    SET status = 'published'
    WHERE id = COALESCE(NEW.block_id, OLD.block_id)
    AND status = 'full'
    AND current_bookings < capacity;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_block_capacity_on_booking
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_block_capacity();

-- ==========================================
-- SEED DATA FOR DEVELOPMENT
-- ==========================================

-- Admin user (password: admin123 - hash generated with bcrypt)
INSERT INTO users (email, name, phone, password_hash, role, email_verified) VALUES
('admin@learningthroughmotion.co.uk', 'Admin User', '07356074072', '$2a$10$rKZU8q7K7YQQ7h3xVZ2Z7uB0Y1f0Z1K7YQQ7h3xVZ2Z7uB0Y1f0Z1', 'admin', TRUE);

-- Sample session block (Jan-Feb 2025)
INSERT INTO session_blocks (
  name,
  description,
  start_date,
  end_date,
  day_of_week,
  time_start,
  time_end,
  capacity,
  location,
  status,
  registration_fee,
  session_fee,
  total_sessions
) VALUES (
  'January - February 2025 Block',
  'Sunday morning developmental sessions for children aged 5-10',
  '2025-01-11',
  '2025-02-22',
  0, -- Sunday
  '10:00:00',
  '10:45:00',
  6,
  'Sports Hall, Bolton',
  'published',
  30.00,
  15.00,
  7
);

-- Generate the 7 individual sessions for the block
INSERT INTO sessions (block_id, session_number, date, time_start, time_end)
SELECT
  sb.id,
  generate_series AS session_number,
  sb.start_date + (generate_series - 1) * INTERVAL '1 week' AS date,
  sb.time_start,
  sb.time_end
FROM session_blocks sb
CROSS JOIN generate_series(1, 7)
WHERE sb.name = 'January - February 2025 Block';

-- Sample discount code for testing
INSERT INTO discount_codes (
  code,
  description,
  type,
  value,
  valid_from,
  valid_until,
  usage_limit,
  status
) VALUES (
  'TRIAL20',
  'Free session after completing trial',
  'fixed_amount',
  15.00,
  '2025-01-01',
  '2025-12-31',
  100,
  'active'
);

-- ==========================================
-- USEFUL VIEWS
-- ==========================================

-- View: Upcoming sessions with booking count
CREATE VIEW v_upcoming_sessions AS
SELECT
  s.id,
  s.date,
  s.time_start,
  s.time_end,
  sb.name AS block_name,
  sb.location,
  COUNT(DISTINCT b.id) FILTER (WHERE b.status = 'confirmed') AS confirmed_bookings,
  sb.capacity
FROM sessions s
JOIN session_blocks sb ON s.block_id = sb.id
LEFT JOIN bookings b ON b.block_id = sb.id AND b.status = 'confirmed'
WHERE s.date >= CURRENT_DATE
  AND s.status = 'scheduled'
GROUP BY s.id, s.date, s.time_start, s.time_end, sb.name, sb.location, sb.capacity
ORDER BY s.date, s.time_start;

-- View: Booking summary for admin
CREATE VIEW v_booking_summary AS
SELECT
  b.id,
  b.booking_reference,
  b.created_at,
  u.name AS parent_name,
  u.email AS parent_email,
  u.phone AS parent_phone,
  c.name AS child_name,
  c.age AS child_age,
  sb.name AS block_name,
  sb.start_date,
  b.status,
  b.payment_status,
  b.payment_method,
  b.total_amount,
  b.amount_paid,
  (b.total_amount - b.amount_paid) AS amount_outstanding
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN children c ON b.child_id = c.id
JOIN session_blocks sb ON b.block_id = sb.id
ORDER BY b.created_at DESC;

-- View: Block capacity summary
CREATE VIEW v_block_capacity AS
SELECT
  sb.id,
  sb.name,
  sb.start_date,
  sb.end_date,
  sb.status,
  sb.capacity,
  sb.current_bookings,
  sb.capacity - sb.current_bookings AS spots_remaining,
  ROUND((sb.current_bookings::DECIMAL / sb.capacity * 100), 2) AS capacity_percentage,
  COUNT(b.id) FILTER (WHERE b.payment_status = 'paid') AS paid_count,
  COUNT(b.id) FILTER (WHERE b.payment_status = 'unpaid') AS unpaid_count,
  SUM(b.total_amount) AS total_revenue_potential,
  SUM(b.amount_paid) AS total_revenue_received
FROM session_blocks sb
LEFT JOIN bookings b ON sb.id = b.block_id AND b.status = 'confirmed'
GROUP BY sb.id, sb.name, sb.start_date, sb.end_date, sb.status, sb.capacity, sb.current_bookings
ORDER BY sb.start_date DESC;

-- ==========================================
-- HELPFUL QUERIES FOR DEVELOPMENT
-- ==========================================

-- Query: Find all bookings awaiting payment
-- SELECT * FROM v_booking_summary WHERE payment_status = 'unpaid' AND status = 'confirmed';

-- Query: Check block capacity
-- SELECT * FROM v_block_capacity WHERE status = 'published';

-- Query: Today's sessions
-- SELECT * FROM v_upcoming_sessions WHERE date = CURRENT_DATE;

-- Query: Revenue summary
-- SELECT SUM(amount_paid) as total_revenue FROM bookings WHERE payment_status = 'paid';
