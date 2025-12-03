// Learning Through Motion - Individual Booking API

import { NextResponse } from 'next/server';
import {
  getBookingById,
  getBookingWithDetails,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking,
} from '@/lib/db/queries/bookings';
import { getCurrentUser, isAdmin } from '@/lib/auth/session';
import { validateData, updateBookingStatusSchema, updatePaymentStatusSchema } from '@/lib/utils/validation';

/**
 * GET /api/bookings/[id]
 * Returns a specific booking with full details
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const booking = await getBookingWithDetails(params.id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    // Check if user owns this booking or is admin
    const userIsAdmin = await isAdmin();
    if (booking.user_id !== user.id && !userIsAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch booking',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/bookings/[id]
 * Updates a booking (admin only)
 * Can update status or payment status
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userIsAdmin = await isAdmin();

    if (!userIsAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Admin access required',
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Check which type of update is being requested
    if ('status' in body) {
      const validation = validateData(updateBookingStatusSchema, body);

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

      const booking = await updateBookingStatus(params.id, body.status);

      return NextResponse.json({
        success: true,
        data: booking,
        message: 'Booking status updated',
      });
    }

    if ('payment_status' in body) {
      const validation = validateData(updatePaymentStatusSchema, body);

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

      const booking = await updatePaymentStatus(
        params.id,
        body.payment_status,
        body.amount_paid
      );

      return NextResponse.json({
        success: true,
        data: booking,
        message: 'Payment status updated',
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid update request',
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update booking',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Deletes a booking (admin only)
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userIsAdmin = await isAdmin();

    if (!userIsAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Admin access required',
        },
        { status: 403 }
      );
    }

    await deleteBooking(params.id);

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete booking',
      },
      { status: 500 }
    );
  }
}
