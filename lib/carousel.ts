// Learning Through Motion - Carousel Image Helper
import fs from 'fs';
import path from 'path';
import { list } from '@vercel/blob';

// Helper to add timeout to promises
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    )
  ]);
}

// Get images from Vercel Blob storage for a specific section
async function getBlobImages(context: string) {
  try {
    // Only fetch from blob if token is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return [];
    }

    // Add 5 second timeout to prevent hanging when rate limited
    const { blobs } = await withTimeout(list(), 5000);

    // Filter blobs that match this context/section
    const sectionBlobs = blobs.filter(blob => {
      const parts = blob.pathname.split('/');
      return parts[0] === context;
    });

    return sectionBlobs.map(blob => ({
      src: blob.url,
      alt: `${getContextLabel(context)} session in action`
    }));
  } catch (error) {
    // Silently fail and return empty - will use local images instead
    console.warn('Blob storage unavailable, using local images only');
    return [];
  }
}

// Get images from local filesystem
function getLocalImages(context: string) {
  const carouselDir = path.join(process.cwd(), 'public', 'images', 'carousel', context);

  // Check if directory exists
  if (!fs.existsSync(carouselDir)) {
    return [];
  }

  // Read all files from the directory
  const files = fs.readdirSync(carouselDir);

  // Filter for image files (excluding .DS_Store and comingsoon.png placeholder)
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) &&
           !file.includes('comingsoon') &&
           !file.startsWith('.');
  });

  // Sort files alphabetically for consistent order
  imageFiles.sort();

  // Map to carousel image objects
  return imageFiles.map(file => ({
    src: `/images/carousel/${context}/${file}`,
    alt: `${getContextLabel(context)} session in action`
  }));
}

export async function getCarouselImages(context: string) {
  // Get images from both local filesystem and blob storage
  const localImages = getLocalImages(context);
  const blobImages = await getBlobImages(context);

  // Combine both sources (blob images first, then local)
  return [...blobImages, ...localImages];
}

// Get a mixed selection from all programme carousels for homepage
// Includes dedicated homepage images plus images from programme pages
export async function getMixedCarouselImages() {
  const sections = ['homepage', 'maths', 'sensory', 'next-chapter'];
  const allImages: { src: string; alt: string }[] = [];

  for (const section of sections) {
    const images = await getCarouselImages(section);
    allImages.push(...images);
  }

  // Shuffle the array to get a random mix
  const shuffled = allImages.sort(() => Math.random() - 0.5);

  return shuffled;
}

function getContextLabel(context: string): string {
  const labels: Record<string, string> = {
    'homepage': 'Learning Through Motion',
    'maths': 'Maths Through Sport',
    'sensory': 'Sensory Sessions',
    'next-chapter': 'The Next Chapter',
    'coaches': 'Our Coaches',
    'programmes': 'Our Programmes',
  };

  return labels[context] || context;
}

// Get hero video URL for a specific section
export async function getHeroVideo(section: string): Promise<string | null> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return null;
    }

    // Add 5 second timeout to prevent hanging when rate limited
    const { blobs } = await withTimeout(list(), 5000);

    // Find video in the hero section
    const videoExtensions = ['.mp4', '.mov', '.webm'];
    const heroVideo = blobs.find(blob => {
      const parts = blob.pathname.split('/');
      if (parts[0] !== section) return false;
      const ext = blob.pathname.slice(blob.pathname.lastIndexOf('.')).toLowerCase();
      return videoExtensions.includes(ext);
    });

    return heroVideo?.url || null;
  } catch (error) {
    // Silently fail - video section just won't show
    console.warn('Blob storage unavailable for video');
    return null;
  }
}
