// Learning Through Motion - Individual Child Profile API

import { NextResponse } from 'next/server';
import {
  getChildById,
  updateChild,
  deleteChild,
  checkChildOwnership,
} from '@/lib/db/queries/children';
import { getCurrentUser } from '@/lib/auth/session';
import { validateData, childSchema } from '@/lib/utils/validation';
import type { ChildInput } from '@/lib/types/booking';

/**
 * GET /api/children/[id]
 * Returns a specific child profile
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

    const child = await getChildById(params.id);

    if (!child) {
      return NextResponse.json(
        {
          success: false,
          error: 'Child not found',
        },
        { status: 404 }
      );
    }

    // Verify ownership
    const ownsChild = await checkChildOwnership(params.id, user.id);
    if (!ownsChild) {
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
      data: child,
    });
  } catch (error: any) {
    console.error('Error fetching child:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch child profile',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/children/[id]
 * Updates a child profile
 */
export async function PUT(
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

    // Verify ownership
    const ownsChild = await checkChildOwnership(params.id, user.id);
    if (!ownsChild) {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Allow partial updates - only validate provided fields
    const partialSchema = childSchema.partial();
    const validation = validateData(partialSchema, body);

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

    const input = validation.data as Partial<ChildInput>;
    const child = await updateChild(params.id, input);

    return NextResponse.json({
      success: true,
      data: child,
      message: 'Child profile updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating child:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update child profile',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/children/[id]
 * Deletes a child profile
 */
export async function DELETE(
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

    // Verify ownership
    const ownsChild = await checkChildOwnership(params.id, user.id);
    if (!ownsChild) {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      );
    }

    await deleteChild(params.id);

    return NextResponse.json({
      success: true,
      message: 'Child profile deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting child:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete child profile',
      },
      { status: 500 }
    );
  }
}
