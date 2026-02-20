"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { MediaModal } from "./MediaModal";

type CarouselImage = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  interval?: number;
};

export function ImageCarousel({ images, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[currentIndex] : null;

  useEffect(() => {
    // Pause carousel when modal is open
    if (modalOpen || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, modalOpen]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const [modalIndex, setModalIndex] = useState(0);

  const handleImageClick = () => {
    if (!hasImages) return;
    setModalIndex(currentIndex);
    setModalOpen(true);
  };

  const handlePrevious = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setModalIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="carousel">
        <div className="carousel__viewport" onClick={handleImageClick}>
          {activeImage && (
            <div key={activeImage.src} className="carousel__slide carousel__slide--active">
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={currentIndex === 0}
                  className="carousel__image"
                />
              </div>
            </div>
          )}
          <div className="carousel__expand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </div>
        </div>

        <div className="carousel__indicators">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`carousel__indicator ${index === currentIndex ? "carousel__indicator--active" : ""
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <MediaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="image"
        src={images[modalIndex]?.src || ""}
        alt={images[modalIndex]?.alt || ""}
        showNavigation={images.length > 1}
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentIndex={modalIndex}
        totalCount={images.length}
      />
    </>
  );
}
