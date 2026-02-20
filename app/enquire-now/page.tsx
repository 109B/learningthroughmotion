import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/common/FadeIn";
import { CONTACT_DETAILS, ENQUIRY_CONTENT } from "@/content/siteContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire Now",
  description:
    "Get in touch with Learning Through Motion to discuss how our SEND programmes can support your school.",
};

type EnquireNowPageProps = {
  searchParams?: {
    topic?: string;
    block?: string;
  };
};

function getPrefillContent(searchParams?: EnquireNowPageProps["searchParams"]) {
  const topic = searchParams?.topic || "";
  const block = searchParams?.block || "";

  if (topic === "session-booking" && block) {
    return {
      subject: `Weekend Session Block Booking - ${block}`,
      message: `I would like to book the "${block}" weekend session block.\n\nChild age:\nPreferred session time:\nAny additional support needs:\n`,
    };
  }

  return {
    subject: "",
    message: "",
  };
}

export default function EnquireNowPage({ searchParams }: EnquireNowPageProps) {
  const prefill = getPrefillContent(searchParams);

  return (
    <>
      <section className="hero hero--compact">
        <div className="shell">
          <FadeIn>
            <div className="hero__text-section">
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
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section section--muted section--compact-top">
        <div className="shell">
          <div className="enquire-layout">
          <div className="enquire-layout__form">
            <FadeIn>
              <div className="form-wrapper">
                <div className="form-header">
                  <h2>Send us a message</h2>
                  <p>Fill out the form and we'll get back to you within 24 hours.</p>
                </div>
                <ContactForm
                  showNextSteps={true}
                  initialMessage={prefill.message}
                  initialSubject={prefill.subject}
                />
              </div>
            </FadeIn>
          </div>

          <div className="enquire-layout__sidebar">
            <FadeIn delay={200}>
              <div className="contact-card contact-card--blue">
                <h3>Contact Details</h3>
                <div className="contact-card__item">
                  <strong>Phone</strong>
                  <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}>
                    {CONTACT_DETAILS.phone}
                  </a>
                </div>
                <div className="contact-card__item">
                  <strong>Email</strong>
                  <a href={`mailto:${CONTACT_DETAILS.email}`}>
                    {CONTACT_DETAILS.email}
                  </a>
                </div>
                <div className="contact-card__item">
                  <strong>Location</strong>
                  <span>{CONTACT_DETAILS.location}</span>
                </div>
              </div>

              <div className="contact-card contact-card--green">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a
                    className="social-link"
                    href={CONTACT_DETAILS.socials.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="social-link__icon">in</span>
                    LinkedIn
                  </a>
                  <a
                    className="social-link"
                    href={CONTACT_DETAILS.socials.facebook}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="social-link__icon">f</span>
                    Facebook
                  </a>
                </div>
              </div>

              <div className="contact-card contact-card--orange">
                <h3>Parents: Book Sessions</h3>
                <p style={{ marginBottom: '1rem' }}>
                  Weekly community sessions for children aged 5-10 with SEND. Small groups, expert coaching.
                </p>
                <a href="/shop/sessions" className="btn btn--small">
                  View Sessions & Pricing
                </a>
              </div>
            </FadeIn>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
