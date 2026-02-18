import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminSession';

export async function POST(request: Request): Promise<NextResponse> {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  console.log("Blob upload API called");
  console.log("BLOB_READ_WRITE_TOKEN exists:", !!process.env.BLOB_READ_WRITE_TOKEN);

  const body = (await request.json()) as HandleUploadBody;
  console.log("Request body type:", body.type);

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Validate file type before generating upload token
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/heic',
          'image/heif',
          'video/quicktime', // .mov
          'video/mp4',
        ];

        return {
          allowedContentTypes: allowedTypes,
          addRandomSuffix: true,
          // Optional: organize uploads by folder
          // tokenPayload: JSON.stringify({ folder: 'uploads' }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Called after upload completes
        // This is where you'd persist to database
        console.log('Upload completed:', blob.url);

        // TODO: Save to database
        // await db.media.create({
        //   url: blob.url,
        //   pathname: blob.pathname,
        //   contentType: blob.contentType,
        //   size: blob.size,
        // });
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
