import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Activities",
  description:
    "Try our fun, educational games that support maths and sensory development. Designed for SEND learners.",
};

const ACTIVITIES = [
  {
    id: "jigsaw",
    title: "Jigsaw Puzzle",
    description: "Build visual-spatial reasoning and fine motor skills through drag-and-drop puzzles.",
    icon: "🧩",
    category: "Sensory Development",
    difficulty: "Easy",
  },
  {
    id: "word-search",
    title: "Word Search",
    description: "Find hidden words related to sports and movement. Great for pattern recognition.",
    icon: "🔍",
    category: "Literacy & Focus",
    difficulty: "Medium",
  },
  {
    id: "number-match",
    title: "Number Matching",
    description: "Count objects and match them to the correct number. Practice core maths skills.",
    icon: "🔢",
    category: "Maths Through Sport",
    difficulty: "Easy",
  },
  {
    id: "memory-cards",
    title: "Memory Match",
    description: "Flip cards to find matching pairs. Strengthen working memory and concentration.",
    icon: "🃏",
    category: "Cognitive Skills",
    difficulty: "Easy",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive Activities"
        title="Learn Through Play"
        intro="Try our fun, accessible games that support maths learning and sensory development. Each activity is designed with SEND learners in mind."
        ctaHref="#activities"
        ctaLabel="Start playing"
      />

      <Section tone="default" title="Try Our Activities">
        <FadeIn>
          <p className="section-intro">
            These interactive activities demonstrate our approach to learning through play.
            Each game is designed to be accessible, engaging, and educational - supporting
            the same skills we develop in our programmes.
          </p>
        </FadeIn>
      </Section>

      <Section tone="muted">
        <div className="activities-grid">
          {ACTIVITIES.map((activity, index) => (
            <FadeIn key={activity.id} delay={index * 100}>
              <div className="activity-card">
                <div className="activity-card__icon">{activity.icon}</div>
                <div className="activity-card__content">
                  <h3 className="activity-card__title">{activity.title}</h3>
                  <div className="activity-card__meta">
                    <span className="activity-badge">{activity.category}</span>
                    <span className="activity-badge activity-badge--difficulty">
                      {activity.difficulty}
                    </span>
                  </div>
                  <p className="activity-card__description">{activity.description}</p>
                  <a
                    href={`/activities/${activity.id}`}
                    className="btn btn--small"
                  >
                    Play Now
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section tone="accent">
        <FadeIn>
          <div className="cta-block">
            <h2>Bring These Activities to Your School</h2>
            <p>
              Our programmes use similar engaging, hands-on activities to support SEND pupils
              in developing core skills through movement and play.
            </p>
            <div className="cta-block__actions">
              <a href="/enquire-now" className="btn btn--large">
                Get in touch
              </a>
              <a href="/our-programmes" className="btn btn--ghost btn--large">
                View our programmes
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
