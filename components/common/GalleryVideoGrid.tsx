"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaModal } from "@/components/common/MediaModal";
import type { CloudinaryGalleryVideo } from "@/lib/cloudinary";

type GalleryVideoGridProps = {
  videos: CloudinaryGalleryVideo[];
};

export function GalleryVideoGrid({ videos }: GalleryVideoGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="gallery-grid" role="list">
        {videos.map((video, index) => (
          <article className="gallery-card" key={video.id} role="listitem">
            <button
              type="button"
              className="gallery-card__button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open video ${index + 1} of ${videos.length}`}
            >
              <Image
                src={video.thumbnailSrc}
                alt={video.alt}
                width={video.width}
                height={video.height}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 20vw"
                className="gallery-card__image"
              />
              <span className="gallery-card__play" aria-hidden="true">
                ▶
              </span>
            </button>
            {video.label && (
              <div className="gallery-card__content">
                <p>{video.label}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      <MediaModal
        isOpen={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
        type="video"
        src={activeIndex !== null ? videos[activeIndex]?.src || "" : ""}
        alt={activeIndex !== null ? videos[activeIndex]?.alt : ""}
      />
    </>
  );
}
