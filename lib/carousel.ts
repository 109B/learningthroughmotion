// Learning Through Motion - Carousel Image Helper
import fs from 'fs';
import path from 'path';

export async function getCarouselImages(context: string) {
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
  const images = imageFiles.map(file => ({
    src: `/images/carousel/${context}/${file}`,
    alt: `${getContextLabel(context)} session in action`
  }));

  return images;
}

// Get a mixed selection from all programme carousels for homepage
export async function getMixedCarouselImages() {
  const programmes = ['maths', 'sensory', 'next-chapter'];
  const allImages: { src: string; alt: string }[] = [];

  for (const programme of programmes) {
    const images = await getCarouselImages(programme);
    allImages.push(...images);
  }

  // Shuffle the array to get a random mix
  const shuffled = allImages.sort(() => Math.random() - 0.5);

  return shuffled;
}

function getContextLabel(context: string): string {
  const labels: Record<string, string> = {
    'maths': 'Maths Through Sport',
    'sensory': 'Sensory Sessions',
    'next-chapter': 'The Next Chapter',
    'coaches': 'Our Coaches',
    'programmes': 'Our Programmes',
    'vision': 'Our Vision'
  };

  return labels[context] || context;
}
