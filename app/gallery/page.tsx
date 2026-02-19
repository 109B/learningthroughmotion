import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/common/Section";
import { getCloudinaryGalleryMedia } from "@/lib/cloudinary";
import { GalleryInteractiveGrid } from "@/components/common/GalleryInteractiveGrid";
import { GalleryVideoGrid } from "@/components/common/GalleryVideoGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A calm visual gallery of Learning Through Motion sessions and activities.",
};

export default async function GalleryPage() {
  const { folderGalleries, folders, error } = await getCloudinaryGalleryMedia();
  const hasAnyMedia = folderGalleries.some(
    (folderGallery) => folderGallery.images.length > 0 || folderGallery.videos.length > 0
  );

  return (
    <div className="gallery-page">
      <Section
        tone="default"
        eyebrow="Gallery"
        title="Moments From Our Sessions"
        intro="A simple photo gallery showing the calm, active, and supportive environment we create for children."
      />

      <Section tone="muted">
        {error && (
          <div className="content-box">
            <p className="small-text">
              {error} Add Cloudinary settings to show the live gallery.
            </p>
            {folders.length > 0 && (
              <p className="small-text">
                Active folder filter: <strong>{folders.join(", ")}</strong>
              </p>
            )}
          </div>
        )}

        {!error && !hasAnyMedia && (
          <div className="content-box">
            <p className="small-text">
              No gallery media found yet. Upload images or videos into your Cloudinary folders and they will appear here.
            </p>
            {folders.length > 0 && (
              <p className="small-text">
                Current folder filter: <strong>{folders.join(", ")}</strong>
              </p>
            )}
          </div>
        )}

        {!error && hasAnyMedia && (
          <div className="gallery-folder-groups">
            {folderGalleries.map((folderGallery) => (
              <div key={folderGallery.folder} className="gallery-folder-section">
                <h3>{folderGallery.folder}</h3>

                <div className="gallery-subsection">
                  <p className="eyebrow">Images</p>
                  {folderGallery.images.length > 0 ? (
                    <GalleryInteractiveGrid images={folderGallery.images} />
                  ) : (
                    <p className="small-text">No images in this folder yet.</p>
                  )}
                </div>

                <div className="gallery-subsection">
                  <p className="eyebrow">Videos</p>
                  {folderGallery.videos.length > 0 ? (
                    <GalleryVideoGrid videos={folderGallery.videos} />
                  ) : (
                    <p className="small-text">No videos in this folder yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section tone="accent">
        <div className="hero-card">
          <h3>Interested in how we run sessions?</h3>
          <p>
            If you would like to explore a programme for your school or child, we can help you choose the right starting point.
          </p>
          <div className="hero__actions">
            <Link className="btn" href="/enquire-now">
              Enquire now
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
