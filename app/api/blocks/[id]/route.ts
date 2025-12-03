// Learning Through Motion - Individual Block API

import { NextResponse } from 'next/server';
import { getBlockById } from '@/lib/db/queries/blocks';

/**
 * GET /api/blocks/[id]
 * Returns a specific session block with all its sessions
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const block = await getBlockById(params.id);

    if (!block) {
      return NextResponse.json(
        {
          success: false,
          error: 'Session block not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: block,
    });
  } catch (error: any) {
    console.error('Error fetching block:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch session block',
      },
      { status: 500 }
    );
  }
}
