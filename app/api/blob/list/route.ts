import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

const IMAGE_SECTIONS = ['homepage', 'maths', 'sensory', 'next-chapter', 'programmes', 'coaches'];
const VIDEO_SECTIONS = ['hero-homepage'];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm'];

function getExtension(pathname: string): string {
  const lastDot = pathname.lastIndexOf('.');
  return lastDot !== -1 ? pathname.slice(lastDot).toLowerCase() : '';
}

export async function GET(): Promise<NextResponse> {
  try {
    // List all blobs
    const { blobs } = await list();

    // Organize by section and type
    const imagesBySection: Record<string, { url: string; pathname: string; uploadedAt?: string }[]> = {};
    const videosBySection: Record<string, { url: string; pathname: string; uploadedAt?: string }[]> = {};

    // Initialize all sections
    for (const section of IMAGE_SECTIONS) {
      imagesBySection[section] = [];
    }
    for (const section of VIDEO_SECTIONS) {
      videosBySection[section] = [];
    }

    // Sort blobs into sections based on pathname prefix and file type
    for (const blob of blobs) {
      // pathname format: "section/filename.ext"
      const parts = blob.pathname.split('/');
      if (parts.length >= 2) {
        const section = parts[0];
        const ext = getExtension(blob.pathname);

        const mediaData = {
          url: blob.url,
          pathname: blob.pathname,
          uploadedAt: blob.uploadedAt.toISOString(),
        };

        if (VIDEO_SECTIONS.includes(section) && VIDEO_EXTENSIONS.includes(ext)) {
          videosBySection[section].push(mediaData);
        } else if (IMAGE_SECTIONS.includes(section) && IMAGE_EXTENSIONS.includes(ext)) {
          imagesBySection[section].push(mediaData);
        }
      }
    }

    return NextResponse.json({ images: imagesBySection, videos: videosBySection });
  } catch (error) {
    console.error('Failed to list blobs:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
