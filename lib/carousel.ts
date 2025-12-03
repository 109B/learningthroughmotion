// Learning Through Motion - Carousel Image Helper

export async function getCarouselImages(context: string) {
  // Simple helper that returns carousel images based on context
  // Using static images from the homepage carousel
  return [
    { src: "/images/carousel/coursel.jpg", alt: "Learning Through Motion session" },
    { src: "/images/carousel/coursel2.jpg", alt: "Active learning in progress" },
    { src: "/images/carousel/coursel3.jpg", alt: "SEND pupils engaged in sport" },
    { src: "/images/carousel/coursel4.jpg", alt: "Movement-based learning" },
    { src: "/images/carousel/coursel5.jpg", alt: "Sport and learning combined" },
    { src: "/images/carousel/coursel6.jpg", alt: "Pupils in action" },
    { src: "/images/carousel/coursel7.jpeg", alt: "Team activity session" },
    { src: "/images/carousel/coursel8.jpg", alt: "Inclusive sport session" },
    { src: "/images/carousel/coursel9.jpg", alt: "Learning through movement" },
  ];
}
