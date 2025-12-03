// Learning Through Motion - Children Profiles API

import { NextResponse } from 'next/server';
import { getUserChildren, createChild } from '@/lib/db/queries/children';
import { getCurrentUser } from '@/lib/auth/session';
import { validateData, childSchema } from '@/lib/utils/validation';
import type { ChildInput } from '@/lib/types/booking';

/**
 * GET /api/children
 * Returns all children for the current user
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

    const children = await getUserChildren(user.id);

    return NextResponse.json({
      success: true,
      data: children,
    });
  } catch (error: any) {
    console.error('Error fetching children:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch children',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/children
 * Creates a new child profile
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
    const validation = validateData(childSchema, body);

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

    const input = validation.data as ChildInput;
    const child = await createChild(user.id, input);

    return NextResponse.json(
      {
        success: true,
        data: child,
        message: 'Child profile created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating child:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create child profile',
      },
      { status: 500 }
    );
  }
}
