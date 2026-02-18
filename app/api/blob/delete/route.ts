import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminSession';

export async function POST(request: Request): Promise<NextResponse> {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete blob:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
