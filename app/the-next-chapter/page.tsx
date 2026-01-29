import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { PROGRAMMES } from "@/content/siteContent";
import { getCarouselImages } from "@/lib/carousel";

export default async function TheNextChapterPage() {
  const programme = PROGRAMMES.find((p) => p.slug === "the-next-chapter");
  const carouselImages = await getCarouselImages("next-chapter");

  if (!programme) {
    return null;
  }

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={programme.title}
        intro={programme.excerpt}
        ctaHref="/enquire-now"
        ctaLabel="Book a free trial"
        imageSrc={programme.heroImage}
        carouselImages={carouselImages}
      />

      {/* Main content sections */}
      {programme.sections && programme.sections.length > 0 && (
        <>
          {programme.sections.map((section, index) => (
            <Section key={index} tone={index % 2 === 0 ? "default" : "muted"}>
              <FadeIn>
                <div className="content-box">
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.content && <p className="lead">{section.content}</p>}
                  {section.bullets && (
                    <ul className="feature-list">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>✓ {bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.subsections && (
                    <div className="content-boxes content-boxes--2col" style={{ marginTop: '1.5rem' }}>
                      {section.subsections.map((subsection) => (
                        <div key={subsection.heading} className="content-box content-box--beige">
                          <h3>
                            <span className="icon" aria-hidden="true">
                              {subsection.heading.includes("Mentor") ? "🤝" :
                               subsection.heading.includes("Activities") ? "⚽" :
                               subsection.heading.includes("Reflection") ? "💭" : ""}
                            </span> {subsection.heading}
                          </h3>
                          {subsection.content && <p>{subsection.content}</p>}
                          {subsection.bullets && (
                            <ul>
                              {subsection.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            </Section>
          ))}
        </>
      )}

      {/* Book a Free Trial CTA */}
      <Section tone="default">
        <FadeIn>
          <div className="hero-card">
            <h3>Book a Free Trial</h3>
            {programme.trialInfo && <p>{programme.trialInfo}</p>}
            <div className="hero__actions">
              <Link className="btn" href="/enquire-now">
                Contact us to book a trial
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
