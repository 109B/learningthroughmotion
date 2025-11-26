import Link from "next/link";
import { ImageMosaic } from "@/components/common/ImageMosaic";
import { Section } from "@/components/common/Section";
import { ProgrammeCards } from "@/components/common/ProgrammeCards";
import {
  CONTACT_DETAILS,
  HOME_ABOUT_PARAGRAPHS,
  HOME_GALLERY,
  HOME_HERO,
  PROGRAMMES,
} from "@/content/siteContent";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero__grid">
          <div>
            <p className="eyebrow">SEND focused active learning</p>
            <h1>{HOME_HERO.title}</h1>
            <p className="lead">{HOME_HERO.tagline}</p>
            <p>{HOME_HERO.description}</p>
            <div className="hero__actions">
              <Link className="btn" href="/enquire-now">
                Enquire now
              </Link>
              <Link className="link-arrow" href="/our-programmes">
                Explore programmes
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <p className="eyebrow">What we deliver</p>
            <ul className="bullet-list">
              <li>Cross curricular maths delivered through movement.</li>
              <li>Sensory redevelopment journeys that rebuild regulation.</li>
              <li>Year 7 mentoring that makes secondary transitions safe.</li>
            </ul>
            <p className="small-text">
              Working with schools across Greater Manchester and Lancashire with
              bespoke support for each EHCP.
            </p>
          </div>
        </div>
      </section>

      <Section title="About us" eyebrow="Why Learning Through Motion?">
        <div className="split">
          <div className="prose">
            {HOME_ABOUT_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ImageMosaic images={HOME_GALLERY} />
        </div>
      </Section>

      <Section
        title="Our Programmes"
        intro="Every strand is built around movement, play, and purposeful mentoring so SEND pupils can access the curriculum in ways that feel exciting and achievable."
        tone="accent"
      >
        <ProgrammeCards programmes={PROGRAMMES} />
      </Section>

      <Section tone="muted">
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
