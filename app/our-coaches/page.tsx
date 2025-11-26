import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { COACHES, HOME_GALLERY, TWO_COACHES_POINTS } from "@/content/siteContent";

export default function OurCoachesPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Meet the coaches"
        intro="Relationships come first. Our coaching team blends teaching experience, mentoring, and a passion for sport that keeps every child engaged."
        imageSrc={HOME_GALLERY[1]?.src}
        imageAlt={HOME_GALLERY[1]?.alt}
        ctaHref="/enquire-now"
        ctaLabel="Book a taster session"
      />

      <Section>
        <div className="split">
          {COACHES.map((coach) => (
            <article key={coach.name} className="hero-card">
              <p className="eyebrow">Coach</p>
              <h3>{coach.name}</h3>
              <p>{coach.bio}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="accent">
        <div className="hero-card">
          <h3>Why two coaches?</h3>
          <p className="small-text">
            Having two adults in each session means we can personalise support,
            offer consistent reassurance, and adapt quickly to each learner.
          </p>
          <ul className="bullet-list">
            {TWO_COACHES_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
