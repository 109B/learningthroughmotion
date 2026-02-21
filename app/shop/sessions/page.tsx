// Learning Through Motion - Weekend Sensory Sessions Page

import type { Metadata } from 'next';
import { SessionBlockCard } from '@/components/booking/SessionBlockCard';
import { PROGRAMME_INFO } from '@/content/sessionData';
import { Section } from '@/components/common/Section';
import { FadeIn } from '@/components/common/FadeIn';
import Link from 'next/link';
import { getLiveSessionData } from '@/lib/sessionBlocks';

export const metadata: Metadata = {
  title: 'Weekend Sensory Sessions',
  description: 'Weekend sensory sessions for children aged 4-12 with SEND at Bishop Bridgeman C.E. Primary School. Small group sizes, expert coaching, and a supportive environment.',
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);

export default async function SessionsPage() {
  const { blocks, sessionTimes } = await getLiveSessionData();
  const visibleBlocks = blocks
    .filter((block) => block.status !== "draft" && block.status !== "completed")
    .sort((a, b) => a.start_date.getTime() - b.start_date.getTime());

  const featuredBlock = visibleBlocks.find((block) => block.status === "published") || visibleBlocks[0];

  return (
    <>
      <section className="hero hero--compact hero--sessions">
        <div className="shell">
          <FadeIn>
            <div className="sessions-hero-layout">
              <div className="hero__text-section">
                <p className="eyebrow">For Parents</p>
                <h1 className="hero__title">Weekend Sensory Sessions</h1>
                <p className="hero__description">
                  Weekly sessions for children aged 4-12 with SEND. Small groups of maximum 6 children,
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
                    <span className="trust-badge__text">Parent involvement welcomed</span>
                  </div>
                </div>

                <div className="hero__actions">
                  <a className="btn" href="#available-blocks">
                    View Live Blocks
                  </a>
                  {featuredBlock && (
                    <Link
                      className="btn btn--ghost"
                      href={`/enquire-now?topic=session-booking&block=${encodeURIComponent(featuredBlock.name)}`}
                    >
                      Buy Next Block
                    </Link>
                  )}
                </div>
              </div>

              <aside className="sessions-hero-card">
                <p className="eyebrow">Next Available</p>
                {featuredBlock ? (
                  <>
                    <h3>{featuredBlock.name}</h3>
                    <p className="sessions-hero-card__meta">
                      {formatDate(featuredBlock.start_date)}
                      {featuredBlock.end_date ? ` - ${formatDate(featuredBlock.end_date)}` : ""}
                    </p>
                    <p className="sessions-hero-card__meta">
                      {featuredBlock.time_start} - {featuredBlock.time_end}
                    </p>
                    <p className="sessions-hero-card__meta">
                      {featuredBlock.location || "Bishop Bridgeman C.E. Primary School"}
                    </p>
                    <Link
                      className="btn"
                      href={`/enquire-now?topic=session-booking&block=${encodeURIComponent(featuredBlock.name)}`}
                    >
                      Buy This Block
                    </Link>
                  </>
                ) : (
                  <p>No live block currently available. Check below for updates.</p>
                )}
              </aside>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Section
        tone="default"
        title="Book a Session Block"
        intro="Our upcoming blocks are below. Choose a block now and we will confirm your place quickly."
      >
        <FadeIn>
          <div className="content-boxes content-boxes--2col">
            <div className="content-box">
              <h3>Quick Booking</h3>
              {featuredBlock ? (
                <>
                  <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>
                    Next Available
                  </p>
                  <p style={{ marginBottom: "0.5rem" }}>
                    <strong>{featuredBlock.name}</strong>
                  </p>
                  <p style={{ marginBottom: "0.75rem" }}>
                    {formatDate(featuredBlock.start_date)}{featuredBlock.end_date ? ` - ${formatDate(featuredBlock.end_date)}` : ""}
                  </p>
                  <div className="hero__actions">
                    <a className="btn" href="#available-blocks">View All Blocks</a>
                    <Link className="btn btn--ghost" href={`/enquire-now?topic=session-booking&block=${encodeURIComponent(featuredBlock.name)}`}>
                      Buy This Block
                    </Link>
                  </div>
                </>
              ) : (
                <p>No live blocks are currently available. Please enquire and we will contact you with upcoming dates.</p>
              )}
            </div>

            <div className="content-box">
              <h3>
                <span className="icon" aria-hidden="true">📍</span> Location
              </h3>
              <p><strong>Bishop Bridgeman C.E. Primary School</strong></p>
              <h3>
                <span className="icon" aria-hidden="true">🕐</span> Session Times
              </h3>
              <p>Choose the time slot that works best for your family:</p>
              <ul>
                {sessionTimes.map((time) => (
                  <li key={time}><strong>{time}</strong></li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section
        id="available-blocks"
        title="Available Session Blocks"
        intro="Choose from our upcoming programmes. Sessions run in half-termly blocks."
      >
        {visibleBlocks.length === 0 ? (
          <div className="empty-state">
            <h2>No Sessions Available</h2>
            <p>
              We don&apos;t have any sessions available for booking right now.
              Please check back soon or <Link href="/enquire-now" className="link-arrow">get in touch</Link> to
              express your interest in future sessions.
            </p>
          </div>
        ) : (
          <FadeIn>
            <div className="cards-grid">
              {visibleBlocks.map((block) => (
                <SessionBlockCard key={block.id} block={block} />
              ))}
            </div>
          </FadeIn>
        )}
      </Section>

      <Section
        title="What&apos;s Included"
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
        intro="Simple, transparent pricing for quality SEND support"
      >
        <FadeIn>
          <div className="content-box">
            <div className="pricing-breakdown-large">
              <div className="pricing-item">
                <div className="pricing-label">Registration Fee</div>
                <div className="pricing-amount">£{PROGRAMME_INFO.pricing.registration.toFixed(2)}</div>
                <div className="pricing-note">One-time fee (not charged again)</div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Session Pricing Options</h3>
              <div className="content-boxes content-boxes--2col" style={{ marginTop: '1rem' }}>
                <div className="content-box content-box--beige">
                  <h4>Pay As You Attend</h4>
                  <p className="pricing-amount" style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
                    £{PROGRAMME_INFO.pricing.perSessionPayAsYouGo.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    per session - flexible option with no commitment
                  </p>
                </div>

                <div className="content-box content-box--beige" style={{ borderColor: '#16a34a' }}>
                  <h4>Book the Full Block</h4>
                  <p className="pricing-amount" style={{ fontSize: '1.5rem', margin: '0.5rem 0', color: '#16a34a' }}>
                    £{PROGRAMME_INFO.pricing.perSessionFullBlock.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    per session - save £3 per session when booking the full block
                  </p>
                </div>
              </div>
            </div>

            <div className="programme-details" style={{ marginTop: '2rem' }}>
              <h3>Example Costs</h3>
              <ul>
                <li><strong>7-week block (pay as you go):</strong> £10 registration + (7 × £15) = £115 total</li>
                <li><strong>7-week block (full block):</strong> £10 registration + (7 × £12) = £94 total</li>
                <li><strong>6-week block (full block):</strong> £10 registration + (6 × £12) = £82 total</li>
              </ul>
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
            <h3>Ready to get started?</h3>
            <p>
              Contact us to book your child&apos;s place or arrange a taster session. Our small group sizes fill up quickly,
              so we recommend getting in touch early to secure your preferred time slot.
            </p>
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
