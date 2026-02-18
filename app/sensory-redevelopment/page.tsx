import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { PROGRAMMES } from "@/content/siteContent";
import { getCarouselImages } from "@/lib/carousel";

export default async function SensoryRedevelopmentPage() {
  const programme = PROGRAMMES.find(
    (item) => item.slug === "sensory-redevelopment"
  );
  const carouselImages = await getCarouselImages("sensory");

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
        ctaLabel="Book a discovery call"
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
                          <h3>{subsection.heading}</h3>
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

      {/* Session Details */}
      {programme.sessionDetails && (
        <Section title="Session Details" tone="default">
          <FadeIn>
            <div className="content-boxes content-boxes--2col">
              <div className="content-box">
                <h3>
                  <span className="icon" aria-hidden="true">📍</span> Location & Times
                </h3>
                <p><strong>{programme.sessionDetails.location}</strong></p>
                {programme.sessionDetails.dates && (
                  <p>{programme.sessionDetails.dates}</p>
                )}
                {programme.sessionDetails.times && (
                  <div style={{ marginTop: '1rem' }}>
                    <p><strong>Session times:</strong></p>
                    <ul>
                      {programme.sessionDetails.times.map((time) => (
                        <li key={time}>{time}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="content-box">
                <h3>
                  <span className="icon" aria-hidden="true">👥</span> What's Included
                </h3>
                <ul className="feature-list">
                  {programme.sessionDetails.groupSize && (
                    <li>✓ {programme.sessionDetails.groupSize}</li>
                  )}
                  {programme.sessionDetails.coaches && (
                    <li>✓ {programme.sessionDetails.coaches}</li>
                  )}
                  {programme.sessionDetails.equipment && (
                    <li>✓ {programme.sessionDetails.equipment}</li>
                  )}
                  {programme.sessionDetails.parentInvolvement && (
                    <li>✓ {programme.sessionDetails.parentInvolvement}</li>
                  )}
                  {programme.sessionDetails.blockStructure && (
                    <li>✓ {programme.sessionDetails.blockStructure}</li>
                  )}
                </ul>
              </div>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* Pricing */}
      {programme.pricing && (
        <Section title="Pricing" tone="muted" intro="Clear, affordable pricing for quality SEND support">
          <FadeIn>
            <div className="content-box">
              <div className="pricing-breakdown-large">
                <div className="pricing-item">
                  <div className="pricing-label">Registration Fee</div>
                  <div className="pricing-amount">£{programme.pricing.registration?.toFixed(2)}</div>
                  <div className="pricing-note">Per block</div>
                </div>
                <div className="pricing-plus">+</div>
                <div className="pricing-item">
                  <div className="pricing-label">Per Session</div>
                  <div className="pricing-amount">£{programme.pricing.perSession?.toFixed(2)}</div>
                  <div className="pricing-note">Paid for full block</div>
                </div>
              </div>

              {programme.pricing.notes && (
                <div className="programme-details" style={{ marginTop: '2rem' }}>
                  <h3>Important Information</h3>
                  <ul>
                    {programme.pricing.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </FadeIn>
        </Section>
      )}

      {/* Book a Discovery Call CTA */}
      <Section tone="default">
        <FadeIn>
          <div className="hero-card">
            <h3>Book a Discovery Call</h3>
            <p>Ready to learn more? Book a discovery call and we&apos;ll discuss how our sensory sessions can support your child&apos;s development.</p>
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
