"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { MediaModal } from "@/components/common/MediaModal";
import type { CloudinaryGalleryImage } from "@/lib/cloudinary";

type GalleryInteractiveGridProps = {
  images: CloudinaryGalleryImage[];
};

export function GalleryInteractiveGrid({ images }: GalleryInteractiveGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const goPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      if (event.deltaY > 0) {
        goNext();
      } else {
        goPrevious();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex, goNext, goPrevious]);

  return (
    <>
      <div className="gallery-grid" role="list">
        {images.map((image, index) => (
          <article className="gallery-card" key={image.id} role="listitem">
            <button
              type="button"
              className="gallery-card__button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 20vw"
                className="gallery-card__image"
              />
            </button>
            {image.label && (
              <div className="gallery-card__content">
                <p>{image.label}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      <MediaModal
        isOpen={activeIndex !== null}
        onClose={closeModal}
        type="image"
        src={activeIndex !== null ? images[activeIndex]?.src || "" : ""}
        alt={activeIndex !== null ? images[activeIndex]?.alt : ""}
        onPrevious={goPrevious}
        onNext={goNext}
        showNavigation={images.length > 1}
        currentIndex={activeIndex ?? 0}
        totalCount={images.length}
      />
    </>
  );
}
