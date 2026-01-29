// Script to migrate local carousel images to Vercel Blob storage
// Run with: node scripts/migrate-images.mjs

import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const SECTIONS = ['maths', 'sensory', 'next-chapter', 'programmes', 'coaches', 'vision'];

async function migrate() {
  console.log('Starting migration...\n');

  let totalMigrated = 0;
  let totalErrors = 0;

  for (const section of SECTIONS) {
    const carouselDir = path.join(projectRoot, 'public', 'images', 'carousel', section);

    // Skip if directory doesn't exist
    if (!fs.existsSync(carouselDir)) {
      console.log(`⏭️  Skipping ${section} - directory not found`);
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

    if (imageFiles.length === 0) {
      console.log(`⏭️  Skipping ${section} - no images found`);
      continue;
    }

    console.log(`\n📁 ${section}: Found ${imageFiles.length} images`);

    // Upload each file to Blob
    for (const file of imageFiles) {
      try {
        const filePath = path.join(carouselDir, file);
        const fileBuffer = fs.readFileSync(filePath);

        // Determine content type
        const ext = path.extname(file).toLowerCase();
        const contentTypes = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.webp': 'image/webp',
        };

        const blob = await put(`${section}/${file}`, fileBuffer, {
          access: 'public',
          contentType: contentTypes[ext] || 'image/jpeg',
        });

        console.log(`   ✅ ${file} → ${blob.url}`);
        totalMigrated++;
      } catch (error) {
        console.log(`   ❌ ${file} - ${error.message}`);
        totalErrors++;
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Migration complete!`);
  console.log(`✅ Migrated: ${totalMigrated} images`);
  if (totalErrors > 0) {
    console.log(`❌ Errors: ${totalErrors}`);
  }
}

// Check for token
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN environment variable not set');
  console.error('Run with: BLOB_READ_WRITE_TOKEN=your_token node scripts/migrate-images.mjs');
  console.error('Or ensure .env.local is loaded');
  process.exit(1);
}

migrate().catch(console.error);
