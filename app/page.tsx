import Link from "next/link";
import { Section } from "@/components/common/Section";
import { ProgrammeCards } from "@/components/common/ProgrammeCards";
import { FadeIn } from "@/components/common/FadeIn";
import { ImageCarousel } from "@/components/common/ImageCarousel";
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

import { TestimonialsSection } from "@/components/common/TestimonialsSection";

export default function Home() {
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
                <Link className="btn btn--large" href="/enquire-now">
                  Book a Free Discovery Call
                </Link>
                <Link className="link-arrow" href="/our-programmes">
                  Explore our programmes
                </Link>
              </div>
            </div>

            <div className="hero__visual">
              <ImageCarousel
                images={[
                  { src: "/images/carousel/coursel.jpg", alt: "Learning Through Motion session" },
                  { src: "/images/carousel/coursel2.jpg", alt: "Active learning in progress" },
                  { src: "/images/carousel/coursel3.jpg", alt: "SEND pupils engaged in sport" },
                  { src: "/images/carousel/coursel4.jpg", alt: "Movement-based learning" },
                  { src: "/images/carousel/coursel5.jpg", alt: "Sport and learning combined" },
                  { src: "/images/carousel/coursel6.jpg", alt: "Pupils in action" },
                  { src: "/images/carousel/coursel7.jpeg", alt: "Team activity session" },
                  { src: "/images/carousel/coursel8.jpg", alt: "Inclusive sport session" },
                  { src: "/images/carousel/coursel9.jpg", alt: "Learning through movement" },
                ]}
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
          <div className="prose">
            <p className="lead">{HOME_VISION_STATEMENT}</p>
            <p>{HOME_VISION_SUPPORT}</p>
            <p>{VISION_PARAGRAPHS[2]}</p>
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
        <ProgrammeCards programmes={PROGRAMMES} />
      </Section>

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
