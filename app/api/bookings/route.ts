// Learning Through Motion - Bookings API

import { NextResponse } from 'next/server';
import {
  getUserBookings,
  createBooking,
  getBookingSummaries,
} from '@/lib/db/queries/bookings';
import { getBlockById, checkBlockAvailability } from '@/lib/db/queries/blocks';
import { checkChildOwnership } from '@/lib/db/queries/children';
import { getCurrentUser, isAdmin } from '@/lib/auth/session';
import { validateData, bookingSchema } from '@/lib/utils/validation';
import { calculatePricing } from '@/lib/utils/pricing';
import type { BookingInput } from '@/lib/types/booking';

/**
 * GET /api/bookings
 * Returns bookings for the current user
 * Admin users get all bookings
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const userIsAdmin = await isAdmin();

    const bookings = userIsAdmin
      ? await getBookingSummaries()
      : await getUserBookings(user.id);

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch bookings',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Creates a new booking
 */
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = validateData(bookingSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const input = validation.data as BookingInput;

    // Verify child belongs to user
    const ownsChild = await checkChildOwnership(input.child_id, user.id);
    if (!ownsChild) {
      return NextResponse.json(
        {
          success: false,
          error: 'Child not found or does not belong to you',
        },
        { status: 403 }
      );
    }

    // Get block details
    const block = await getBlockById(input.block_id);
    if (!block) {
      return NextResponse.json(
        {
          success: false,
          error: 'Session block not found',
        },
        { status: 404 }
      );
    }

    // Check availability
    const { available, spotsRemaining } = await checkBlockAvailability(input.block_id);
    if (!available) {
      return NextResponse.json(
        {
          success: false,
          error: `This session block is ${spotsRemaining === 0 ? 'full' : 'not available'}`,
        },
        { status: 400 }
      );
    }

    // Calculate pricing (TODO: Apply discount code if provided)
    const pricing = calculatePricing(block);

    // Create booking
    const booking = await createBooking({
      user_id: user.id,
      child_id: input.child_id,
      block_id: input.block_id,
      payment_method: input.payment_method,
      discount_code: input.discount_code,
      subtotal: pricing.subtotal,
      total_amount: pricing.total,
    });

    // TODO: Send confirmation email

    return NextResponse.json(
      {
        success: true,
        data: booking,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create booking',
      },
      { status: 500 }
    );
  }
}
