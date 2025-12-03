// Learning Through Motion - Browse Sessions Page

import type { Metadata } from 'next';
import { SessionBlockCard } from '@/components/booking/SessionBlockCard';
import { SESSION_BLOCKS, PROGRAMME_INFO } from '@/content/sessionData';
import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Book Sessions',
  description: 'Browse and book our 7-week session blocks for children with SEND. Small group sizes, expert coaching, and a supportive environment.',
};

export default function SessionsPage() {
  const blocks = SESSION_BLOCKS;

  return (
    <>
      <section className="hero hero--compact">
        <div className="shell">
          <FadeIn>
            <div className="hero__text-section">
              <p className="eyebrow">For Parents</p>
              <h1 className="hero__title">Community Sessions</h1>
              <p className="hero__description">
                Weekly 7-week programmes for children aged 5-10 with SEND. Small groups of maximum 6 children,
                expert coaching, and a supportive environment where every child can thrive.
              </p>

              <div className="hero__trust">
                <div className="trust-badge">
                  <span className="trust-badge__icon">✓</span>
                  <span className="trust-badge__text">Maximum 6 children per session</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-badge__icon">✓</span>
                  <span className="trust-badge__text">SEND-trained coaches</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-badge__icon">✓</span>
                  <span className="trust-badge__text">7 weeks of progressive development</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section
        title="Available Session Blocks"
        intro="Choose from our upcoming 7-week programmes running on Sunday mornings at Bolton Arena."
      >
        {blocks.length === 0 ? (
          <div className="empty-state">
            <h2>No Sessions Available</h2>
            <p>
              We don't have any sessions available for booking right now.
              Please check back soon or <Link href="/enquire-now" className="link-arrow">get in touch</Link> to
              express your interest in future sessions.
            </p>
          </div>
        ) : (
          <FadeIn>
            <div className="cards-grid">
              {blocks.map((block) => (
                <SessionBlockCard key={block.id} block={block} />
              ))}
            </div>
          </FadeIn>
        )}
      </Section>

      <Section
        title="What's Included"
        tone="muted"
      >
        <FadeIn>
          <div className="split">
            {PROGRAMME_INFO.whatsIncluded.map((item) => (
              <div key={item.title} className="split__content">
                <h3>
                  <span className="icon" aria-hidden="true">{item.icon}</span> {item.title}
                </h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="programme-details" style={{ marginTop: '3rem' }}>
            <h3>Programme Details</h3>
            <ul className="feature-list">
              {PROGRAMME_INFO.includes.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Section>

      <Section
        title="Pricing"
        intro="Transparent, affordable pricing for quality SEND support"
      >
        <FadeIn>
          <div className="pricing-breakdown-large">
            <div className="pricing-item">
              <div className="pricing-label">Registration Fee</div>
              <div className="pricing-amount">£{PROGRAMME_INFO.pricing.registration.toFixed(2)}</div>
              <div className="pricing-note">One-time fee per programme</div>
            </div>
            <div className="pricing-plus">+</div>
            <div className="pricing-item">
              <div className="pricing-label">7 Weekly Sessions</div>
              <div className="pricing-amount">£{(PROGRAMME_INFO.pricing.perSession * 7).toFixed(2)}</div>
              <div className="pricing-note">£{PROGRAMME_INFO.pricing.perSession.toFixed(2)} per session</div>
            </div>
            <div className="pricing-equals">=</div>
            <div className="pricing-item pricing-total">
              <div className="pricing-label">Total Programme Cost</div>
              <div className="pricing-amount">£{PROGRAMME_INFO.pricing.total.toFixed(2)}</div>
              <div className="pricing-note">For 7 weeks of coaching</div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section
        title="Frequently Asked Questions"
        tone="muted"
      >
        <FadeIn>
          <div className="accordion">
            {PROGRAMME_INFO.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section tone="default">
        <FadeIn>
          <div className="hero-card">
            <h3>Ready to book?</h3>
            <p>
              Choose a session block above and reserve your child's place. Our small group sizes fill up quickly,
              so we recommend booking early to secure your preferred dates.
            </p>
            <div className="hero__actions">
              <Link className="btn" href="/enquire-now">
                Have questions? Contact us
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
