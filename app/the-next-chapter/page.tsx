import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { PROGRAMMES } from "@/content/siteContent";
import { getCarouselImages } from "@/lib/carousel";
import { getProgrammeCardImages } from "@/lib/programmeImages";

export default async function TheNextChapterPage() {
  const programme = PROGRAMMES.find((p) => p.slug === "the-next-chapter");
  const carouselImages = await getCarouselImages("next-chapter");
  const programmeCardImages = await getProgrammeCardImages();

  if (!programme) {
    return null;
  }

  const dynamicImage = programmeCardImages.find((img) => img.slug === programme.slug);
  const heroImage = dynamicImage?.imageUrl || programme.heroImage;

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={programme.title}
        intro={programme.excerpt}
        ctaHref="/enquire-now"
        ctaLabel="Book a discovery call"
        imageSrc={heroImage}
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

      {/* Book a Discovery Call CTA */}
      <Section tone="default">
        <FadeIn>
          <div className="hero-card">
            <h3>Book a Discovery Call</h3>
            <p>Ready to support your Year 7 students? Book a discovery call and we&apos;ll discuss how The Next Chapter can help with their transition to secondary school.</p>
            <div className="hero__actions">
              <Link className="btn" href="/enquire-now">
                Book a discovery call
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
