import { Section } from "@/components/common/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/common/FadeIn";
import { CONTACT_DETAILS, ENQUIRY_CONTENT } from "@/content/siteContent";

export default function EnquireNowPage() {
  return (
    <>
      <section className="hero hero--modern">
        <div className="shell">
          <div className="hero__content">
            <div className="hero__text-section">
              <FadeIn>
                <p className="eyebrow">Start here</p>
                <h1 className="hero__title">{ENQUIRY_CONTENT.heading}</h1>
                <p className="hero__description">{ENQUIRY_CONTENT.copy[0]}</p>

                <div className="hero__trust">
                  <div className="trust-badge">
                    <span className="trust-badge__icon">✓</span>
                    <span className="trust-badge__text">Response within 24 hours</span>
                  </div>
                  <div className="trust-badge">
                    <span className="trust-badge__icon">✓</span>
                    <span className="trust-badge__text">Free discovery call</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="hero__visual">
              <FadeIn delay={200}>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <div className="split">
          <div>
            <p className="eyebrow">Get in touch</p>
            {ENQUIRY_CONTENT.copy.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="hero-card">
            <p className="eyebrow">Contact Details</p>
            <p>
              <strong>Phone: </strong>
              <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}>
                {CONTACT_DETAILS.phone}
              </a>
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${CONTACT_DETAILS.email}`}>
                {CONTACT_DETAILS.email}
              </a>
            </p>
            <p className="small-text">{CONTACT_DETAILS.location}</p>
            <div className="hero__actions">
              <a
                className="link-arrow"
                href={CONTACT_DETAILS.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
              <a
                className="link-arrow"
                href={CONTACT_DETAILS.socials.facebook}
                target="_blank"
                rel="noreferrer noopener"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
