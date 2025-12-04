// Learning Through Motion - Carousel Image Helper

export async function getCarouselImages(context: string) {
  // Return programme-specific placeholder images based on context
  const placeholders: Record<string, { src: string; alt: string }[]> = {
    maths: [
      {
        src: "/images/carousel/maths/comingsoon.png",
        alt: "Maths Through Sport - Coming Soon"
      },
    ],
    sensory: [
      {
        src: "/images/carousel/sensory/comingsoon.png",
        alt: "Sensory Redevelopment Programme - Coming Soon"
      },
    ],
    "next-chapter": [
      {
        src: "/images/carousel/next-chapter/comingsoon.png",
        alt: "The Next Chapter - Coming Soon"
      },
    ],
  };

  return placeholders[context] || [];
}
