import Link from "next/link";
import { Section } from "@/components/common/Section";
import { ProgrammeCards } from "@/components/common/ProgrammeCards";
import { FadeIn } from "@/components/common/FadeIn";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import { VideoShowcase } from "@/components/common/VideoShowcase";
import {
  CONTACT_DETAILS,
  HERO_HIGHLIGHTS,
  HOME_ABOUT_CLUSTERS,
  HOME_HERO,
  HOME_VISION_STATEMENT,
  HOME_VISION_SUPPORT,
  VISION_PARAGRAPHS,
  PROGRAMMES,
} from "@/content/siteContent";
import { getMixedCarouselImages, getHeroVideo } from "@/lib/carousel";
import { getProgrammeCardImages } from "@/lib/programmeImages";

import { TestimonialsSection } from "@/components/common/TestimonialsSection";

export default async function Home() {
  const carouselImages = await getMixedCarouselImages();
  const heroVideoUrl = await getHeroVideo("hero-homepage");
  const programmeCardImages = await getProgrammeCardImages();

  // Merge dynamic images with programme data
  const programmesWithDynamicImages = PROGRAMMES.map((programme) => {
    const dynamicImage = programmeCardImages.find((img) => img.slug === programme.slug);
    return {
      ...programme,
      heroImage: dynamicImage?.imageUrl || programme.heroImage,
    };
  });

  return (
    <>
      <section className="hero hero--modern">
        <div className="shell">
          <div className="hero__content">
            <div className="hero__text-section">
              <p className="eyebrow">SEND Focused Active Learning</p>
              <h1 className="hero__title">{HOME_HERO.title}</h1>
              <p className="hero__tagline">{HOME_HERO.tagline}</p>
              <p className="hero__description">{HOME_HERO.description}</p>

              <div className="hero__trust">
                <div className="trust-badge">
                  <span className="trust-badge__icon">✓</span>
                  <span className="trust-badge__text">Working with schools across Greater Manchester</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-badge__icon">✓</span>
                  <span className="trust-badge__text">EHCP-aligned programmes</span>
                </div>
              </div>

              <div className="hero__actions">
                <Link className="btn btn--ghost" href="/enquire-now">
                  Book a Free Discovery Call
                </Link>
                <Link className="btn btn--ghost" href="/shop/sessions">
                  Book Sessions
                </Link>
                <Link className="btn btn--ghost" href="/our-programmes">
                  Explore our programmes
                </Link>
              </div>
            </div>

            <div className="hero__visual">
              <ImageCarousel
                images={carouselImages}
                interval={5000}
              />
            </div>
          </div>

          <div className="hero-highlights hero-highlights--inline" aria-label="Key highlights">
            {HERO_HIGHLIGHTS.map((highlight, index) => (
              <FadeIn key={highlight.title} delay={100 * (index + 1)}>
                <article className="hero-highlight-card hero-highlight-card--compact">
                  <h3 className="hero-highlight-title">{highlight.title}</h3>
                  <div className="hero-highlight-panel">
                    {highlight.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Section tone="default" title="Key Highlights">
        <FadeIn>
          <div className="content-box">
            <div className="prose">
              <p className="lead">{HOME_VISION_STATEMENT}</p>
              <p>{HOME_VISION_SUPPORT}</p>
              <p>{VISION_PARAGRAPHS[2]}</p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <TestimonialsSection limit={3} randomize showAllLink />

      <Section
        id="about"
        title="About us"
        eyebrow="Why Learning Through Motion?"
      >
        <div className="programme-grid about-card-grid" role="list">
          {HOME_ABOUT_CLUSTERS.map((cluster) => (
            <article className="programme-card" key={cluster.title} role="listitem">
              <div className="programme-card__content">
                <p className="eyebrow">About Learning Through Motion</p>
                <h3>{cluster.title}</h3>
                {cluster.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="programmes"
        title="Our Programmes"
        intro="Every strand is built around movement, play, and purposeful mentoring so SEND pupils can access the curriculum in ways that feel exciting and achievable."
        tone="accent"
      >
        <ProgrammeCards programmes={programmesWithDynamicImages} />
      </Section>

      <Section tone="default">
        <div className="hero-card">
          <p className="eyebrow">For Parents</p>
          <h3>Book Community Sessions</h3>
          <p>
            We run weekly 7-week programmes for children aged 5-10 with SEND.
            Small groups (max 6 children), expert coaching, and a supportive environment
            where every child can thrive.
          </p>
          <div className="hero__actions">
            <Link className="btn" href="/shop/sessions">
              View Sessions & Pricing
            </Link>
          </div>
        </div>
      </Section>

      {heroVideoUrl && (
        <Section tone="default" title="See Us In Action" eyebrow="Our Sessions">
          <FadeIn>
            <VideoShowcase src={heroVideoUrl} />
          </FadeIn>
        </Section>
      )}

      <Section id="connect" tone="muted">
        <div className="hero-card">
          <h3>Ready to bring Learning Through Motion to your school?</h3>
          <p>
            Tell us about your timetable, class, or inclusion priorities and we
            will design a pathway that aligns with your targets.
          </p>
          <div className="hero__actions">
            <Link className="btn" href="/enquire-now">
              Book a discovery call
            </Link>
            <a
              className="link-arrow"
              href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}
            >
              Call {CONTACT_DETAILS.phone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
