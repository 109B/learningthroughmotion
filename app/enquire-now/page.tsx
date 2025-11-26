import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT_DETAILS, ENQUIRY_CONTENT } from "@/content/siteContent";

export default function EnquireNowPage() {
  return (
    <>
      <PageHero
        eyebrow="Start here"
        title={ENQUIRY_CONTENT.heading}
        intro={ENQUIRY_CONTENT.copy[0]}
        ctaHref={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}
        ctaLabel={`Call ${CONTACT_DETAILS.phone}`}
      />

      <Section tone="accent">
        <div className="split">
          <div className="hero-card">
            <p className="eyebrow">Contact</p>
            {ENQUIRY_CONTENT.copy.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
