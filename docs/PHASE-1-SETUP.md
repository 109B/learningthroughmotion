# Phase 1 Implementation Guide

## Getting Started

This guide will walk you through setting up Phase 1 of the booking system.

---

## Step 1: Environment Setup

### 1.1 Install Dependencies

```bash
npm install @supabase/supabase-js
npm install next-auth
npm install bcryptjs
npm install zod
npm install date-fns
npm install @types/bcryptjs --save-dev
```

### 1.2 Environment Variables

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-random-string-here"

# Email (for Phase 1, optional)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="bookings@learningthroughmotion.co.uk"

# Admin Credentials (temporary, for development)
ADMIN_EMAIL="admin@learningthroughmotion.co.uk"
ADMIN_PASSWORD="change-me-in-production"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Step 2: Database Setup

### Option A: Using Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Run the schema from `/docs/DATABASE-SCHEMA.sql`
5. Copy connection strings to `.env.local`

### Option B: Using Vercel Postgres

1. Go to your Vercel project
2. Navigate to Storage tab
3. Create new Postgres database
4. Copy connection strings to `.env.local`
5. Use Vercel's SQL editor to run schema

### Option C: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database: `createdb ltm_booking`
3. Run schema: `psql ltm_booking < docs/DATABASE-SCHEMA.sql`
4. Update `.env.local` with local connection string

---

## Step 3: File Structure

Your project should now have:

```
/app
  /shop
    /page.tsx               # Shop landing page
    /sessions
      /page.tsx             # Browse sessions
    /blocks
      /page.tsx             # View blocks
      /[id]
        /page.tsx           # Block details
  /booking
    /start
      /page.tsx             # Booking entry
    /child-profile
      /page.tsx             # Add/select child
    /checkout
      /page.tsx             # Review and submit
    /confirmation
      /[id]
        /page.tsx           # Success page
  /account
    /dashboard
      /page.tsx             # Parent dashboard
    /children
      /page.tsx             # Manage children
    /bookings
      /page.tsx             # View bookings
  /admin
    /dashboard
      /page.tsx             # Admin dashboard
    /bookings
      /page.tsx             # Manage bookings
      /[id]
        /page.tsx           # Booking details
  /api
    /auth
      /[...nextauth]
        /route.ts           # NextAuth routes
    /blocks
      /route.ts             # GET blocks
      /[id]
        /route.ts           # GET block by ID
    /bookings
      /route.ts             # GET, POST bookings
      /[id]
        /route.ts           # GET, PUT, DELETE booking
    /children
      /route.ts             # GET, POST children
      /[id]
        /route.ts           # GET, PUT, DELETE child

/lib
  /db
    /client.ts              # Database client
    /queries
      /blocks.ts            # Block queries
      /bookings.ts          # Booking queries
      /children.ts          # Child queries
      /users.ts             # User queries
  /types
    /booking.ts             # TypeScript types
  /utils
    /pricing.ts             # Pricing calculations
    /dates.ts               # Date utilities
    /validation.ts          # Zod schemas

/components
  /booking
    /SessionBlockCard.tsx
    /BlockCalendar.tsx
    /ChildProfileForm.tsx
    /BookingForm.tsx
    /BookingSummary.tsx
    /PricingBreakdown.tsx
  /admin
    /BookingList.tsx
    /BookingDetailsCard.tsx
    /StatusBadge.tsx
  /account
    /DashboardWidget.tsx
    /BookingCard.tsx
    /ChildCard.tsx
```

---

## Step 4: Core Components to Build

### Priority 1: Database Client

**File:** `/lib/db/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper for server-side queries
export async function query<T>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const { data, error } = await supabase.rpc('execute_sql', {
    query: sql,
    params,
  });

  if (error) throw error;
  return data;
}
```

### Priority 2: Authentication Setup

**File:** `/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/db/client';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
```

### Priority 3: Session Block Display

**Component:** `/components/booking/SessionBlockCard.tsx`

```typescript
import Link from 'next/link';
import { SessionBlock } from '@/lib/types/booking';
import { format } from 'date-fns';

type Props = {
  block: SessionBlock;
};

export function SessionBlockCard({ block }: Props) {
  const spotsRemaining = block.capacity - block.current_bookings;
  const totalCost = block.registration_fee + (block.session_fee * block.total_sessions);

  return (
    <div className="programme-card">
      <div className="programme-card__content">
        <p className="eyebrow">Session Block</p>
        <h3>{block.name}</h3>
        <p>{block.description}</p>

        <div className="block-details">
          <div className="detail-item">
            <span className="detail-label">📅 Sessions</span>
            <span className="detail-value">{block.total_sessions} weeks</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">⏰ Time</span>
            <span className="detail-value">
              {format(new Date(`2000-01-01T${block.time_start}`), 'h:mm a')} -
              {format(new Date(`2000-01-01T${block.time_end}`), 'h:mm a')}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">👥 Capacity</span>
            <span className="detail-value">
              {spotsRemaining} of {block.capacity} spots remaining
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📍 Location</span>
            <span className="detail-value">{block.location}</span>
          </div>
        </div>

        <div className="block-pricing">
          <span className="price-label">Total Cost:</span>
          <span className="price-value">£{totalCost.toFixed(2)}</span>
          <span className="price-breakdown">
            (£{block.registration_fee} registration + £{(block.session_fee * block.total_sessions).toFixed(2)} sessions)
          </span>
        </div>

        <div className="programme-card__footer">
          {block.status === 'full' ? (
            <button className="btn" disabled>
              Fully Booked
            </button>
          ) : (
            <Link href={`/booking/start?block_id=${block.id}`} className="btn">
              Book Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## Step 5: API Routes to Build

### GET /api/blocks

```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';

export async function GET() {
  const { data: blocks, error } = await supabase
    .from('session_blocks')
    .select('*')
    .eq('status', 'published')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: blocks });
}
```

### POST /api/bookings

```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/db/client';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { child_id, block_id, payment_method } = body;

  // Get block details for pricing
  const { data: block } = await supabase
    .from('session_blocks')
    .select('*')
    .eq('id', block_id)
    .single();

  if (!block) {
    return NextResponse.json({ error: 'Block not found' }, { status: 404 });
  }

  const subtotal = block.registration_fee + (block.session_fee * block.total_sessions);

  // Create booking
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      user_id: session.user.id,
      child_id,
      block_id,
      payment_method,
      subtotal,
      total_amount: subtotal,
      status: 'pending',
      payment_status: 'unpaid',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // TODO: Send confirmation email

  return NextResponse.json({ data: booking });
}
```

---

## Step 6: Testing Checklist

### Manual Testing

- [ ] Can view published session blocks
- [ ] Can create user account
- [ ] Can log in
- [ ] Can add child profile
- [ ] Can create booking
- [ ] Booking appears in admin panel
- [ ] Admin can view booking details
- [ ] Admin can change booking status
- [ ] Email notification sent (if configured)

### Database Testing

```sql
-- Check if blocks are visible
SELECT * FROM session_blocks WHERE status = 'published';

-- Check booking creation
SELECT * FROM v_booking_summary;

-- Check capacity updates
SELECT * FROM v_block_capacity;
```

---

## Step 7: Next Steps

Once Phase 1 is complete, you'll have:
✅ Working database with all tables
✅ User authentication
✅ Session block display
✅ Basic booking form
✅ Admin panel to manage bookings

**Ready for Phase 2:** Payment integration with Stripe

---

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT version();"
```

### Auth Not Working

- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Check password hashing is working

### Bookings Not Saving

- Check foreign key constraints
- Verify user is authenticated
- Check API route logs

---

## Support

If you encounter issues:
1. Check server logs: `npm run dev`
2. Check database logs in Supabase dashboard
3. Review API responses in Network tab
4. Check console for errors

---

## Phase 1 Completion Criteria

Before moving to Phase 2, ensure:
- [ ] All database tables created
- [ ] Can create and authenticate users
- [ ] Session blocks display correctly
- [ ] Booking flow works end-to-end
- [ ] Admin can view and manage bookings
- [ ] No critical bugs or errors
- [ ] Basic email notifications working

**Estimated completion:** 4 weeks

**Next phase:** Payment Integration (Phase 2)
