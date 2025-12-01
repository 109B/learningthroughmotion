"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`carousel__slide ${index === currentIndex ? "carousel__slide--active" : ""
              }`}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority={index === 0}
                className="carousel__image"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="carousel__indicators">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel__indicator ${index === currentIndex ? "carousel__indicator--active" : ""
              }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
