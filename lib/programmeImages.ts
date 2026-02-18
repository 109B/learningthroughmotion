// Learning Through Motion - Programme Card Images Helper
// Fetches programme card images from Vercel Blob storage, with fallback to static images

import { list } from "@vercel/blob";
import { PROGRAMMES } from "@/content/siteContent";

type ProgrammeCardImage = {
  slug: string;
  imageUrl: string;
};

// Map programme slugs to their blob storage section IDs
const PROGRAMME_BLOB_MAP: Record<string, string> = {
  "maths-through-sport": "programme-card-maths",
  "sensory-redevelopment": "programme-card-sensory",
  "the-next-chapter": "programme-card-next-chapter",
};

/**
 * Get programme card images, checking blob storage first and falling back to static images
 */
export async function getProgrammeCardImages(): Promise<ProgrammeCardImage[]> {
  const blobImages: Record<string, string> = {};

  // Try to get images from blob storage
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list();

      // Find images for each programme card section
      for (const [slug, sectionId] of Object.entries(PROGRAMME_BLOB_MAP)) {
        const sectionBlobs = blobs.filter(
          (blob) =>
            blob.pathname.startsWith(`${sectionId}/`) &&
            /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(blob.pathname)
        );

        // Use the most recently uploaded image for each section
        if (sectionBlobs.length > 0) {
          // Sort by upload date descending (most recent first)
          sectionBlobs.sort((a, b) => {
            const dateA = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
            const dateB = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
            return dateB - dateA;
          });
          blobImages[slug] = sectionBlobs[0].url;
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch programme card images from blob storage:", error);
    // Continue with fallback to static images
  }

  // Build the result array with blob images or fallback to static
  return PROGRAMMES.map((programme) => ({
    slug: programme.slug,
    imageUrl: blobImages[programme.slug] || programme.heroImage || "",
  }));
}
