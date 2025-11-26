import Image from "next/image";

type MosaicProps = {
  images: { src: string; alt: string }[];
};

export function ImageMosaic({ images }: MosaicProps) {
  return (
    <div className="image-mosaic">
      {images.map((image) => (
        <div key={image.src} className="image-mosaic__item">
          <Image
            src={image.src}
            alt={image.alt}
            width={640}
            height={800}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
