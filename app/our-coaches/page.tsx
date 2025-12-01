import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { COACHES, COACHING_APPROACH } from "@/content/siteContent";

import { getCarouselImages } from "@/lib/carousel";

export default async function OurCoachesPage() {
  const carouselImages = await getCarouselImages("coaches");

  return (
    <>
      <PageHero
        eyebrow="The Team"
        title="Expert coaches, dedicated mentors"
        intro="Our two-coach model ensures every child gets the attention they need. We combine sporting expertise with deep SEND experience."
        ctaHref="/enquire-now"
        ctaLabel="Meet the team"
        carouselImages={carouselImages}
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          {COACHES.map((coach, index) => (
            <FadeIn key={coach.name} delay={index * 100}>
              <article className="coach-card">
                <div className="coach-card__content">
                  <h3>{coach.name}</h3>
                  <p className="coach-role">{coach.role}</p>
                  <p>{coach.bio}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section tone="accent" title="Our Approach">
        <FadeIn>
          <div className="prose">
            <ul className="bullet-list">
              {COACHING_APPROACH.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
