import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SECTIONS = ['homepage', 'maths', 'sensory', 'next-chapter', 'programmes', 'coaches'];

export async function POST(): Promise<NextResponse> {
  try {
    const results: { section: string; file: string; url: string }[] = [];
    const errors: { section: string; file: string; error: string }[] = [];

    for (const section of SECTIONS) {
      const carouselDir = path.join(process.cwd(), 'public', 'images', 'carousel', section);

      // Skip if directory doesn't exist
      if (!fs.existsSync(carouselDir)) {
        continue;
      }

      const files = fs.readdirSync(carouselDir);

      // Filter for image files
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) &&
               !file.includes('comingsoon') &&
               !file.startsWith('.');
      });

      // Upload each file to Blob
      for (const file of imageFiles) {
        try {
          const filePath = path.join(carouselDir, file);
          const fileBuffer = fs.readFileSync(filePath);

          // Determine content type
          const ext = path.extname(file).toLowerCase();
          const contentTypes: Record<string, string> = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
          };

          const blob = await put(`${section}/${file}`, fileBuffer, {
            access: 'public',
            contentType: contentTypes[ext] || 'image/jpeg',
          });

          results.push({
            section,
            file,
            url: blob.url,
          });
        } catch (error) {
          errors.push({
            section,
            file,
            error: (error as Error).message,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      migrated: results.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
