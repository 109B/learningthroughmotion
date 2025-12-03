# Learning Through Motion - Booking System Design

## Executive Summary

This document outlines the complete design for a booking and shop system enabling parents to register children for group developmental sessions. The system supports flexible pricing, discount codes, free trials, and multiple payment methods while maintaining scalability for future service offerings.

---

## 1. Business Requirements

### Core Session Structure
- **Group Size:** 6 children per session
- **Duration:** 45 minutes per session
- **Programme Structure:** 7-week blocks aligned with school half-terms
- **First Block:** 11 January - 22 February 2025

### Pricing Model
- **Registration Fee:** £30 (one-time per child)
- **Session Fee:** £15 per session
- **7-Week Block Total:** £135 (£30 + £105)

### Key Features
- Free trial sessions for first-time attendees
- Discount code system
- Multiple payment methods (online/bank transfer)
- Session capacity management
- Calendar view for scheduling
- Future flexibility for pricing and services

---

## 2. User Personas

### Primary Persona: Sarah (Parent)
- Has a 7-year-old child with ADHD
- Looking for structured activities during weekends
- Price-conscious but values quality
- Prefers online booking but needs clear information
- Wants to try before committing

### Secondary Persona: Admin (Robbie/Coach)
- Needs to manage session capacity
- Track payments and registrations
- View upcoming sessions
- Generate reports
- Manage discount codes

---

## 3. User Journey Map

### Discovery Phase
1. Parent lands on website via Google/referral
2. Reads about programmes and benefits
3. Sees "Book a Session" CTA
4. Browses available sessions and dates

### Consideration Phase
5. Reads about free trial option
6. Compares pricing and commitment
7. Reviews session details and timings
8. Checks testimonials

### Decision Phase
9. Creates account or signs in
10. Adds child profile
11. Selects session block
12. Applies discount code (if applicable)
13. Reviews booking summary

### Purchase Phase
14. Chooses payment method
15. Completes payment or notes bank transfer
16. Receives confirmation email
17. Gets calendar invite and preparation info

### Post-Purchase Phase
18. Receives reminder emails
19. Attends sessions
20. Receives follow-up for next block

---

## 4. Site Structure & Page Hierarchy

```
/
├── /shop                           # Main shop landing
│   ├── /sessions                   # Browse all session types
│   │   ├── /developmental-group    # Specific session type
│   │   └── /consultation           # 1-on-1 consultations
│   ├── /blocks                     # View upcoming blocks
│   │   └── /[block-id]             # Specific block details
│   └── /cart                       # Shopping cart
│
├── /booking
│   ├── /start                      # Entry point
│   ├── /child-profile              # Add/select child
│   ├── /select-sessions            # Choose block/dates
│   ├── /checkout                   # Payment page
│   └── /confirmation/[id]          # Success page
│
├── /account
│   ├── /dashboard                  # Parent dashboard
│   ├── /children                   # Manage child profiles
│   ├── /bookings                   # View all bookings
│   ├── /payments                   # Payment history
│   └── /settings                   # Account settings
│
├── /trial
│   └── /book                       # Free trial booking flow
│
└── /admin                          # Admin panel
    ├── /dashboard
    ├── /sessions                   # Manage sessions
    ├── /bookings                   # View all bookings
    ├── /payments                   # Payment tracking
    ├── /discount-codes             # Manage codes
    └── /reports                    # Analytics
```

---

## 5. Component Architecture

### Reusable Components

```typescript
// Session Components
<SessionCard />              // Display session overview
<SessionCalendar />          // Calendar view of available sessions
<BlockSelector />            // Choose 7-week block
<CapacityIndicator />        // Shows spots remaining

// Booking Components
<ChildProfileForm />         // Add/edit child details
<ChildSelector />            // Select existing child
<PricingBreakdown />         // Itemized cost display
<DiscountCodeInput />        // Apply discount codes
<PaymentMethodSelector />    // Choose payment type

// Cart Components
<CartSummary />              // Cart sidebar
<CartItem />                 // Individual cart item
<PromoCodeBanner />          // Highlight active discounts

// Account Components
<BookingCard />              // Display booked session
<PaymentStatus />            // Payment state indicator
<UpcomingSessionsList />     // Next sessions widget
```

---

## 6. Detailed User Flows

### Flow 1: First-Time Parent Books Trial Session

**Entry Point:** Homepage CTA "Try a Free Session"

```
1. Landing Page: /trial/book
   - Hero: "Try Your First Session Free"
   - Benefits listed
   - Session details
   - CTA: "Book Free Trial"

2. Authentication Check
   - If logged in → Skip to step 4
   - If not → Show auth modal

3. Quick Sign-Up
   - Name, Email, Phone, Password
   - "Create Account" button
   - Link to login if existing user

4. Add Child Profile
   - Child's name, age, date of birth
   - Any specific needs/notes (optional)
   - Emergency contact
   - Save button

5. Select Trial Session
   - Calendar showing available dates
   - Session time: 10:00 AM - 10:45 AM
   - Location details
   - "Select This Session" button

6. Trial Confirmation
   - Session details summary
   - What to bring/expect
   - "Confirm Free Trial" button
   - Email confirmation sent

7. Post-Trial Follow-Up (After Session)
   - Email: "How was the session?"
   - Offer: "Sign up for full block with discount code: TRIAL20"
   - Link to booking flow
```

### Flow 2: Existing Parent Books 7-Week Block

**Entry Point:** Account Dashboard or Shop Page

```
1. Browse Sessions: /shop/sessions
   - Card grid showing session types
   - "Developmental Group Sessions" card
   - Details: Age range, group size, duration
   - "View Available Blocks" button

2. Select Block: /shop/blocks
   - List of upcoming 7-week blocks
   - Block 1: 11 Jan - 22 Feb
   - Calendar view showing all 7 dates
   - Capacity indicator: "4 of 6 spots remaining"
   - Price breakdown visible
   - "Book This Block" button

3. Select/Confirm Child: /booking/child-profile
   - Dropdown of existing children
   - Or "Add New Child" button
   - Selected child details displayed
   - "Continue" button

4. Review Booking: /booking/checkout
   - Session block summary
   - All 7 dates listed
   - Child details
   - Pricing breakdown:
     * Registration Fee: £30
     * 7 Sessions: £105 (£15 × 7)
     * Subtotal: £135
   - Discount code input
   - "Apply Code" button

5. Apply Discount (if applicable)
   - Enter code: "TRIAL20"
   - Validation feedback
   - Updated pricing:
     * Registration Fee: £30
     * 7 Sessions: £105
     * Discount (1 session free): -£15
     * Total: £120

6. Payment Method: /booking/checkout#payment
   - Option 1: Pay Online (Stripe)
     * Card details form
     * Secure payment badge
   - Option 2: Bank Transfer
     * Bank details displayed
     * Reference number provided
     * "Confirm & Pay Later" button

7. Payment Confirmation: /booking/confirmation/[id]
   - Success message
   - Booking reference number
   - Session details
   - Calendar download (.ics)
   - What to bring/expect
   - Contact details if questions

8. Email Confirmation
   - Immediate email with all details
   - Calendar attachment
   - Payment receipt (if paid online)
   - Bank transfer instructions (if selected)

9. Reminder Emails
   - 1 week before: "Getting ready for sessions"
   - 24 hours before: "Session starts tomorrow"
   - After each session: Brief feedback form
   - Before block ends: "Book next block"
```

### Flow 3: Admin Manages Sessions

**Entry Point:** /admin/dashboard

```
1. Dashboard Overview
   - Today's sessions widget
   - Revenue summary
   - Pending payments count
   - Recent bookings list

2. Create New Block: /admin/sessions/create
   - Date range picker (7 weeks)
   - Day of week selector
   - Time slot
   - Capacity setting (default 6)
   - Price override option
   - "Create Block" button

3. Manage Bookings: /admin/bookings
   - Filter by: Date, Status, Payment
   - List view with:
     * Child name
     * Parent contact
     * Payment status
     * Actions (view, cancel, refund)

4. Track Payments: /admin/payments
   - Filter: Paid, Pending, Overdue
   - Mark bank transfers as received
   - Send payment reminders
   - Export for accounting

5. Manage Discount Codes: /admin/discount-codes
   - List of active/expired codes
   - Create new code:
     * Code name
     * Type: Percentage or Fixed amount
     * Value
     * Expiry date
     * Usage limit
     * Applicable to (all/specific sessions)

6. Reports: /admin/reports
   - Attendance tracking
   - Revenue reports
   - Popular time slots
   - Discount code usage
   - Export to CSV/PDF
```

---

## 7. Key Screens & Wireframes

### Screen 1: Shop Landing Page (/shop)

```
┌────────────────────────────────────────────────┐
│ [Header with Cart icon (2)]                   │
├────────────────────────────────────────────────┤
│                                                │
│  Book Developmental Sessions                   │
│  ════════════════════════════════             │
│                                                │
│  Structured group sessions for children       │
│  with SEND, delivered through movement         │
│  and sport.                                    │
│                                                │
│  ┌──────────────┐  ┌──────────────┐          │
│  │  FREE TRIAL  │  │ VIEW BLOCKS  │          │
│  └──────────────┘  └──────────────┘          │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│  How It Works                                  │
│  ────────────                                  │
│                                                │
│  1→ Try Free    2→ Join Block   3→ Progress   │
│  [Icon]         [Icon]          [Icon]        │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│  Upcoming Session Blocks                       │
│  ───────────────────────                      │
│                                                │
│  ┌────────────────────────────────┐           │
│  │ January - February Block        │           │
│  │ 11 Jan - 22 Feb                │           │
│  │                                 │           │
│  │ 📅 7 sessions                  │           │
│  │ ⏰ Sundays 10:00-10:45 AM     │           │
│  │ 👥 4 of 6 spots remaining     │           │
│  │                                 │           │
│  │ £135 (£30 reg + £105 sessions) │           │
│  │                                 │           │
│  │ [Book Now]                     │           │
│  └────────────────────────────────┘           │
│                                                │
│  ┌────────────────────────────────┐           │
│  │ March - April Block            │           │
│  │ Coming Soon...                 │           │
│  │                                 │           │
│  │ [Join Waitlist]                │           │
│  └────────────────────────────────┘           │
│                                                │
└────────────────────────────────────────────────┘
```

### Screen 2: Checkout Page (/booking/checkout)

```
┌────────────────────────────────────────────────┐
│ Checkout                    [Cart icon]        │
├────────────────────────────────────────────────┤
│                                                │
│ ┌─ Your Booking ───────────────────────────┐  │
│ │                                           │  │
│ │ Developmental Sessions - Jan-Feb Block    │  │
│ │ 11 January - 22 February 2025             │  │
│ │                                           │  │
│ │ Sundays 10:00 - 10:45 AM                 │  │
│ │                                           │  │
│ │ 📅 Sessions (7):                         │  │
│ │   • 11 Jan • 18 Jan • 25 Jan             │  │
│ │   • 1 Feb  • 8 Feb  • 15 Feb • 22 Feb    │  │
│ │                                           │  │
│ │ Child: Oliver Smith (Age 7)               │  │
│ │ [Change]                                  │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                │
│ ┌─ Pricing ─────────────────────────────────┐  │
│ │                                           │  │
│ │ Registration Fee ............. £30.00    │  │
│ │ 7 Sessions @ £15 ............. £105.00   │  │
│ │                                           │  │
│ │ ┌─────────────────────────────────────┐  │  │
│ │ │ Have a discount code?               │  │  │
│ │ │ [________________] [Apply]          │  │  │
│ │ └─────────────────────────────────────┘  │  │
│ │                                           │  │
│ │ ──────────────────────────────────────   │  │
│ │ Total ........................ £135.00   │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                │
│ ┌─ Payment Method ──────────────────────────┐  │
│ │                                           │  │
│ │ ⦿ Pay Online with Card                   │  │
│ │   ┌─────────────────────────────────┐    │  │
│ │   │ Card Number                      │    │  │
│ │   │ [____________________________]   │    │  │
│ │   │                                  │    │  │
│ │   │ Expiry    CVV                    │    │  │
│ │   │ [____]    [___]                  │    │  │
│ │   └─────────────────────────────────┘    │  │
│ │                                           │  │
│ │ ○ Bank Transfer (Pay Later)              │  │
│ │   Payment instructions sent via email     │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                │
│ [ ✓ I agree to terms and conditions ]         │
│                                                │
│ [Complete Booking - £135.00]                   │
│                                                │
└────────────────────────────────────────────────┘
```

### Screen 3: Parent Dashboard (/account/dashboard)

```
┌────────────────────────────────────────────────┐
│ Welcome back, Sarah!                           │
├────────────────────────────────────────────────┤
│                                                │
│ ┌─ Upcoming Sessions ───────────────────────┐  │
│ │                                           │  │
│ │ Next session: Sunday 18 January           │  │
│ │ 10:00 - 10:45 AM                          │  │
│ │                                           │  │
│ │ Child: Oliver Smith                       │  │
│ │ Location: Sports Hall, Bolton             │  │
│ │                                           │  │
│ │ [View Details] [Add to Calendar]          │  │
│ │                                           │  │
│ │ Remaining this block: 6 of 7 sessions     │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                │
│ ┌─ Quick Actions ───────────────────────────┐  │
│ │ [Book Next Block] [Manage Children]       │  │
│ └───────────────────────────────────────────┘  │
│                                                │
│ ┌─ Your Children ───────────────────────────┐  │
│ │                                           │  │
│ │ 👦 Oliver Smith (Age 7)                  │  │
│ │    Active: Jan-Feb Block                  │  │
│ │    [View Profile]                         │  │
│ │                                           │  │
│ │ [+ Add Another Child]                     │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                │
│ ┌─ Booking History ─────────────────────────┐  │
│ │                                           │  │
│ │ Jan-Feb 2025 Block ........... Paid £135  │  │
│ │ Free Trial (11 Dec) .......... Completed  │  │
│ │                                           │  │
│ │ [View All Bookings]                       │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

### Screen 4: Admin Session Management (/admin/sessions)

```
┌────────────────────────────────────────────────┐
│ Session Management                             │
├────────────────────────────────────────────────┤
│                                                │
│ [+ Create New Block]                           │
│                                                │
│ Filter: [All] [Upcoming] [Past] [Full]        │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │ Jan-Feb Block | 11 Jan - 22 Feb            │ │
│ │ ───────────────────────────────────────────│ │
│ │ Status: Active | Capacity: 6/6 FULL        │ │
│ │ Revenue: £810 (6 × £135)                   │ │
│ │ Payment Status: 5 Paid, 1 Pending          │ │
│ │                                            │ │
│ │ Enrolled Children:                         │ │
│ │ • Oliver Smith (Paid) ..... £135           │ │
│ │ • Emma Johnson (Paid) ..... £120 (code)    │ │
│ │ • Jack Williams (Paid) .... £135           │ │
│ │ • Sophie Brown (Paid) ..... £135           │ │
│ │ • Noah Davis (Paid) ....... £135           │ │
│ │ • Mia Wilson (Pending) .... £135           │ │
│ │                                            │ │
│ │ [View Details] [Export] [Send Reminder]    │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ┌────────────────────────────────────────────┐ │
│ │ Mar-Apr Block | 1 Mar - 12 Apr (Draft)     │ │
│ │ ───────────────────────────────────────────│ │
│ │ Status: Not Published | Capacity: 0/6      │ │
│ │                                            │ │
│ │ [Edit] [Publish] [Delete]                  │ │
│ └────────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 8. Database Schema

### Core Tables

```typescript
// Users (Parents/Guardians)
type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
};

// Children Profiles
type Child = {
  id: string;
  user_id: string; // Foreign key to User
  name: string;
  date_of_birth: Date;
  age: number;
  notes?: string; // Special needs, preferences
  emergency_contact_name: string;
  emergency_contact_phone: string;
  created_at: Date;
  updated_at: Date;
};

// Session Blocks (7-week programmes)
type SessionBlock = {
  id: string;
  name: string; // "Jan-Feb 2025 Block"
  start_date: Date;
  end_date: Date;
  day_of_week: number; // 0 = Sunday
  time_start: string; // "10:00"
  time_end: string; // "10:45"
  capacity: number; // Default 6
  location: string;
  status: 'draft' | 'published' | 'full' | 'cancelled';
  registration_fee: number; // £30
  session_fee: number; // £15
  total_sessions: number; // 7
  created_at: Date;
  updated_at: Date;
};

// Individual Session Dates
type Session = {
  id: string;
  block_id: string; // Foreign key to SessionBlock
  date: Date;
  time_start: string;
  time_end: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: Date;
};

// Bookings
type Booking = {
  id: string;
  user_id: string;
  child_id: string;
  block_id: string;
  booking_reference: string; // Unique ref like "LTM-2025-001"
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'unpaid' | 'partial' | 'paid' | 'refunded';
  payment_method: 'online' | 'bank_transfer';
  subtotal: number;
  discount_amount: number;
  total_paid: number;
  discount_code_used?: string;
  is_trial: boolean;
  trial_date?: Date;
  created_at: Date;
  updated_at: Date;
};

// Payments
type Payment = {
  id: string;
  booking_id: string;
  amount: number;
  payment_method: 'stripe' | 'bank_transfer';
  transaction_id?: string; // Stripe payment ID
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paid_at?: Date;
  created_at: Date;
};

// Discount Codes
type DiscountCode = {
  id: string;
  code: string; // "TRIAL20"
  type: 'percentage' | 'fixed_amount';
  value: number; // 20 or 15
  description: string;
  valid_from: Date;
  valid_until: Date;
  usage_limit?: number; // null = unlimited
  times_used: number;
  applicable_to: 'all' | 'specific_blocks';
  block_ids?: string[]; // If specific
  status: 'active' | 'expired' | 'disabled';
  created_at: Date;
};

// Attendance Tracking
type Attendance = {
  id: string;
  session_id: string;
  child_id: string;
  status: 'present' | 'absent' | 'late' | 'cancelled';
  notes?: string;
  marked_at: Date;
  marked_by: string; // Admin user ID
};
```

---

## 9. API Endpoints

### Public Endpoints

```typescript
// Sessions & Blocks
GET  /api/blocks                    // List published blocks
GET  /api/blocks/[id]               // Block details
GET  /api/blocks/[id]/availability  // Check capacity

// Discount Codes
POST /api/discount-codes/validate   // Validate code
```

### Authenticated Endpoints (Parent)

```typescript
// Authentication
POST /api/auth/register              // Create account
POST /api/auth/login                 // Sign in
POST /api/auth/logout                // Sign out
GET  /api/auth/me                    // Current user

// Children
GET  /api/children                   // List user's children
POST /api/children                   // Add child
GET  /api/children/[id]              // Child details
PUT  /api/children/[id]              // Update child
DEL  /api/children/[id]              // Remove child

// Bookings
GET  /api/bookings                   // List user's bookings
POST /api/bookings                   // Create booking
GET  /api/bookings/[id]              // Booking details
PUT  /api/bookings/[id]              // Update booking
DEL  /api/bookings/[id]              // Cancel booking

// Payments
POST /api/payments/create-intent     // Stripe payment
POST /api/payments/confirm           // Confirm payment
GET  /api/payments/[id]              // Payment details

// Trial Sessions
POST /api/trial/book                 // Book free trial
GET  /api/trial/availability         // Available trial dates
```

### Admin Endpoints

```typescript
// Session Management
GET  /api/admin/blocks               // All blocks
POST /api/admin/blocks               // Create block
PUT  /api/admin/blocks/[id]          // Update block
DEL  /api/admin/blocks/[id]          // Delete block
POST /api/admin/blocks/[id]/publish  // Publish block

// Booking Management
GET  /api/admin/bookings             // All bookings
GET  /api/admin/bookings/[id]        // Booking details
PUT  /api/admin/bookings/[id]        // Update status
POST /api/admin/bookings/[id]/refund // Process refund

// Payment Management
GET  /api/admin/payments             // All payments
PUT  /api/admin/payments/[id]        // Mark as paid
GET  /api/admin/payments/pending     // Pending payments

// Discount Codes
GET  /api/admin/discount-codes       // All codes
POST /api/admin/discount-codes       // Create code
PUT  /api/admin/discount-codes/[id]  // Update code
DEL  /api/admin/discount-codes/[id]  // Delete code

// Attendance
POST /api/admin/attendance           // Mark attendance
GET  /api/admin/attendance/session/[id] // Session attendance

// Reports
GET  /api/admin/reports/revenue      // Revenue report
GET  /api/admin/reports/attendance   // Attendance report
GET  /api/admin/reports/bookings     // Booking stats
```

---

## 10. State Management Strategy

### Cart State (Client-side)

```typescript
type CartItem = {
  type: 'block' | 'trial' | 'consultation';
  blockId?: string;
  childId?: string;
  price: number;
  discountCode?: string;
  discountAmount?: number;
};

type CartState = {
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  total: number;
};

// Using Zustand or Context
const useCart = () => {
  const [cart, setCart] = useState<CartState>(initialState);

  const addItem = (item: CartItem) => { /* ... */ };
  const removeItem = (index: number) => { /* ... */ };
  const applyDiscount = (code: string) => { /* ... */ };
  const clearCart = () => { /* ... */ };

  return { cart, addItem, removeItem, applyDiscount, clearCart };
};
```

### Booking Flow State

```typescript
type BookingFlowState = {
  step: 'select-block' | 'child-profile' | 'review' | 'payment' | 'confirmation';
  selectedBlock?: SessionBlock;
  selectedChild?: Child;
  discountCode?: string;
  paymentMethod?: 'online' | 'bank_transfer';
};
```

---

## 11. Email Notifications

### Automated Emails

```typescript
// Email Templates
const emailTemplates = {
  // After trial booking
  'trial-confirmation': {
    subject: 'Your free trial session is confirmed',
    content: `Session details, what to bring, directions`,
  },

  // After trial completion
  'post-trial-followup': {
    subject: 'How was your session? Special offer inside',
    content: `Feedback request, discount code, book full block CTA`,
  },

  // After block booking (online payment)
  'booking-confirmation-paid': {
    subject: 'Booking confirmed - Jan-Feb Block',
    content: `Receipt, session dates, calendar file, preparation info`,
  },

  // After block booking (bank transfer)
  'booking-confirmation-pending': {
    subject: 'Booking received - Payment pending',
    content: `Bank details, reference number, payment deadline`,
  },

  // When bank transfer received
  'payment-received': {
    subject: 'Payment received - You\'re all set!',
    content: `Receipt, session details, what to expect`,
  },

  // 1 week before block starts
  'block-starting-soon': {
    subject: 'Your sessions start next week!',
    content: `Final details, what to bring, parking info`,
  },

  // 24 hours before each session
  'session-reminder': {
    subject: 'Session tomorrow at 10:00 AM',
    content: `Quick reminder, weather updates, any changes`,
  },

  // After each session
  'post-session-feedback': {
    subject: 'How did today\'s session go?',
    content: `Quick feedback form, highlights`,
  },

  // Before block ends
  'block-ending-soon': {
    subject: 'Book your next block - Early bird discount',
    content: `Next block dates, special offer, easy re-booking link`,
  },

  // Payment reminder (bank transfer)
  'payment-reminder': {
    subject: 'Friendly reminder - Payment pending',
    content: `Outstanding amount, bank details, deadline`,
  },
};
```

---

## 12. Payment Integration

### Stripe Setup

```typescript
// Stripe Payment Flow
const createPaymentIntent = async (amount: number, bookingId: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to pence
    currency: 'gbp',
    metadata: {
      booking_id: bookingId,
    },
    description: 'Learning Through Motion - Session Block',
  });

  return paymentIntent.client_secret;
};

// Frontend: Stripe Elements
<Elements stripe={stripePromise}>
  <CheckoutForm clientSecret={clientSecret} />
</Elements>
```

### Bank Transfer Flow

```typescript
// Generate unique reference
const generatePaymentReference = (bookingId: string) => {
  return `LTM-${bookingId.substring(0, 8).toUpperCase()}`;
};

// Display bank details
const BankTransferInstructions = ({ reference, amount }) => (
  <div className="bank-transfer-details">
    <h3>Bank Transfer Details</h3>
    <dl>
      <dt>Account Name:</dt>
      <dd>Learning Through Motion Ltd</dd>

      <dt>Sort Code:</dt>
      <dd>12-34-56</dd>

      <dt>Account Number:</dt>
      <dd>12345678</dd>

      <dt>Amount:</dt>
      <dd>£{amount.toFixed(2)}</dd>

      <dt>Reference (Important!):</dt>
      <dd><strong>{reference}</strong></dd>
    </dl>
    <p>Please use the reference number so we can match your payment.</p>
  </div>
);
```

---

## 13. Admin Features

### Dashboard Widgets

```typescript
// Key metrics
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <MetricCard
        title="Today's Sessions"
        value="2"
        subtitle="12 children attending"
      />

      <MetricCard
        title="Revenue (This Month)"
        value="£2,430"
        change="+18%"
      />

      <MetricCard
        title="Pending Payments"
        value="3"
        urgent
      />

      <MetricCard
        title="Next Block Capacity"
        value="4/6"
        subtitle="2 spots remaining"
      />

      <RecentBookings />
      <UpcomingSessions />
      <PendingPaymentsList />
    </div>
  );
};
```

### Quick Actions

- Mark payment as received
- Send payment reminder
- View session attendance
- Cancel booking and refund
- Generate reports
- Create discount code
- Publish new block

---

## 14. Future Scalability Considerations

### Extensible Architecture

```typescript
// Service abstraction for future service types
type Service = {
  id: string;
  type: 'group_session' | 'consultation' | 'workshop' | 'camp';
  name: string;
  pricing_model: 'per_session' | 'block' | 'hourly' | 'package';
  // ... flexible fields
};

// Support multiple pricing models
type PricingRule = {
  service_id: string;
  rule_type: 'flat_rate' | 'tiered' | 'subscription' | 'dynamic';
  config: Record<string, any>;
};

// Multi-location support
type Location = {
  id: string;
  name: string;
  address: string;
  capacity: number;
  facilities: string[];
};

// Different session types
type SessionType = {
  id: string;
  name: string;
  duration: number;
  age_range: [number, number];
  max_capacity: number;
  description: string;
};
```

### Subscription Model (Future)

```typescript
// Monthly subscription option
type Subscription = {
  id: string;
  user_id: string;
  child_id: string;
  plan: 'weekly' | 'bi_weekly' | 'monthly';
  price_per_month: number;
  status: 'active' | 'paused' | 'cancelled';
  start_date: Date;
  next_billing_date: Date;
  sessions_per_month: number;
};
```

### Loyalty/Referral Programme

```typescript
type LoyaltyPoints = {
  user_id: string;
  points_balance: number;
  points_earned: number;
  points_redeemed: number;
};

type Referral = {
  referrer_id: string;
  referred_email: string;
  status: 'pending' | 'completed';
  reward_amount: number;
  created_at: Date;
};
```

---

## 15. Security Considerations

### Authentication
- NextAuth.js for authentication
- Email + password with secure hashing (bcrypt)
- Email verification required
- Password reset flow
- Session management with HTTP-only cookies

### Payment Security
- PCI compliance through Stripe
- No card details stored locally
- HTTPS enforced
- CSP headers configured
- Rate limiting on payment endpoints

### Data Privacy
- GDPR compliance
- User data export functionality
- Right to be forgotten (data deletion)
- Cookie consent banner
- Privacy policy and terms

### Admin Access
- Role-based access control (RBAC)
- Two-factor authentication for admins
- Audit logs for sensitive actions
- IP whitelisting option

---

## 16. Testing Strategy

### Unit Tests
- Component rendering
- Form validation
- Price calculations
- Discount code logic
- Date/time utilities

### Integration Tests
- Booking flow end-to-end
- Payment processing
- Email sending
- Calendar generation
- Admin operations

### E2E Tests (Playwright/Cypress)
- Complete booking journey
- Trial session booking
- Discount code application
- Admin session management
- Mobile responsive flows

---

## 17. Performance Optimization

### Frontend
- Code splitting by route
- Image optimization with next/image
- Lazy loading for heavy components
- Debounced search/filter inputs
- Optimistic UI updates

### Backend
- Database indexing on frequently queried fields
- Caching for session availability
- Background jobs for emails
- Webhook handlers for Stripe events
- Query optimization with proper joins

### Monitoring
- Error tracking (Sentry)
- Performance monitoring
- Payment success rate tracking
- User funnel analytics
- Admin dashboard metrics

---

## 18. Deployment & Infrastructure

### Tech Stack
- **Frontend:** Next.js 14+ (App Router)
- **Backend:** Next.js API routes
- **Database:** PostgreSQL (Supabase or Vercel Postgres)
- **Payments:** Stripe
- **Email:** Resend or SendGrid
- **Hosting:** Vercel
- **Auth:** NextAuth.js
- **File Storage:** Vercel Blob or S3

### CI/CD
- GitHub Actions for automated testing
- Preview deployments for PRs
- Automated database migrations
- Environment variable management
- Rollback capability

---

## 19. Launch Checklist

### Pre-Launch
- [ ] Complete booking flow tested
- [ ] Payment integration verified (test mode)
- [ ] Email templates finalized and tested
- [ ] Admin panel fully functional
- [ ] Mobile responsive on all pages
- [ ] Discount code system working
- [ ] Calendar .ics file generation
- [ ] Privacy policy and terms added
- [ ] Analytics installed
- [ ] Error monitoring configured

### Launch Day
- [ ] Switch Stripe to live mode
- [ ] Create first live session block
- [ ] Send announcement email to waitlist
- [ ] Monitor payments and bookings
- [ ] Test first booking end-to-end
- [ ] Have support channel ready

### Post-Launch
- [ ] Gather user feedback
- [ ] Monitor conversion rates
- [ ] Track most common issues
- [ ] Iterate on UX pain points
- [ ] Plan next features based on data

---

## 20. Success Metrics

### Key Performance Indicators

**User Metrics:**
- Trial conversion rate: Target 60%+
- Booking completion rate: Target 80%+
- Time to complete booking: Target <5 minutes
- User satisfaction: Target 4.5/5 stars

**Business Metrics:**
- Session capacity utilization: Target 90%+
- Revenue per block: Target £810 (6 children × £135)
- Payment collection rate: Target 95%+
- Repeat booking rate: Target 70%+

**Technical Metrics:**
- Page load time: Target <2 seconds
- Payment success rate: Target 98%+
- Error rate: Target <1%
- Email delivery rate: Target 99%+

---

## 21. Support & Documentation

### User Documentation
- "How to Book" guide
- Payment methods explained
- What to expect at sessions
- Cancellation policy
- FAQs

### Admin Documentation
- Session management guide
- Handling bookings
- Processing payments
- Generating reports
- Managing discount codes

---

## Appendix: Example User Scenarios

### Scenario A: Sarah Books Trial and Then Full Block

1. Sarah searches for "children's activities Bolton"
2. Finds LTM website, reads about programmes
3. Clicks "Try Free Session" on homepage
4. Signs up with email
5. Adds son Oliver's profile
6. Selects trial session for next Sunday
7. Receives confirmation email with directions
8. Attends trial with Oliver
9. Receives follow-up email with TRIAL20 code
10. Books full block with discount
11. Pays online, receives confirmation
12. Gets reminder emails before each session
13. Completes 7-week block
14. Receives "book next block" email
15. Re-books for next term

### Scenario B: Admin Manages New Block Launch

1. Robbie logs into admin panel
2. Creates new Mar-Apr block
3. Sets dates, times, capacity
4. Publishes block
5. Sends email to previous attendees
6. Monitors bookings coming in
7. Marks bank transfers as received
8. Reviews attendance after first session
9. Sends reminder to parent with unpaid booking
10. Generates revenue report at end of block

---

## Conclusion

This booking system design provides a comprehensive, scalable solution for Learning Through Motion to accept bookings, manage payments, and deliver a professional parent experience. The architecture supports current needs while remaining flexible for future growth including subscription models, multiple locations, and expanded service offerings.

**Next Steps:**
1. Review and approve this design
2. Prioritize features for MVP
3. Create detailed technical specifications
4. Set up development environment
5. Begin implementation in phases
