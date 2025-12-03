// Learning Through Motion - Session Blocks API

import { NextResponse } from 'next/server';
import { getAvailableBlocks, getAllBlocks } from '@/lib/db/queries/blocks';
import { isAdmin } from '@/lib/auth/session';

/**
 * GET /api/blocks
 * Returns all published session blocks available for booking
 * Admin users can see all blocks regardless of status
 */
export async function GET() {
  try {
    const userIsAdmin = await isAdmin();

    const blocks = userIsAdmin ? await getAllBlocks() : await getAvailableBlocks();

    return NextResponse.json({
      success: true,
      data: blocks,
    });
  } catch (error: any) {
    console.error('Error fetching blocks:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch session blocks',
      },
      { status: 500 }
    );
  }
}
