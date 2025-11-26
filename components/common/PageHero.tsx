import Link from "next/link";
import Image from "next/image";

type HeroProps = {
  title: string;
  intro: string;
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PageHero({
  title,
  intro,
  eyebrow,
  ctaHref,
  ctaLabel,
  imageAlt,
  imageSrc,
}: HeroProps) {
  return (
    <section className="section hero-section">
      <div className="shell hero-shell">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
          {ctaHref && ctaLabel && (
            <div className="hero__actions">
              <Link className="btn" href={ctaHref}>
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
        {imageSrc && (
          <div className="hero-media">
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              width={720}
              height={480}
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
