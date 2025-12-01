import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/common/FadeIn";
import { ImageCarousel } from "@/components/common/ImageCarousel";

type HeroProps = {
  title: string;
  intro: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  carouselImages?: { src: string; alt: string }[];
};

export function PageHero({
  title,
  intro,
  eyebrow,
  ctaHref,
  ctaLabel,
  imageAlt,
  imageSrc,
  carouselImages,
}: HeroProps) {
  return (
    <section className="hero hero--modern">
      <div className="shell">
        <div className="hero__content">
          <div className="hero__text-section">
            <FadeIn>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h1 className="hero__title">{title}</h1>
              <p className="hero__description">{intro}</p>
              {ctaHref && ctaLabel && (
                <div className="hero__actions">
                  <Link className="btn btn--large" href={ctaHref}>
                    {ctaLabel}
                  </Link>
                </div>
              )}
            </FadeIn>
          </div>

          <div className="hero__visual">
            <FadeIn delay={200}>
              {carouselImages && carouselImages.length > 0 ? (
                <ImageCarousel images={carouselImages} interval={5000} />
              ) : imageSrc ? (
                <div className="hero-media">
                  <Image
                    src={imageSrc}
                    alt={imageAlt ?? title}
                    width={720}
                    height={480}
                    sizes="(max-width: 900px) 100vw, 40vw"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              ) : null}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
