import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { VISION_PARAGRAPHS } from "@/content/siteContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Vision",
  description:
    "Our vision is to create a future where children with SEND are empowered to learn, grow, and thrive through sport and movement.",
};

export default function OurVisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Our vision"
        title="Learning Through Motion, Growing Toward Independence"
        intro="Sport is the gateway we use to unlock confidence, curiosity, and independence for every child we support."
        ctaHref="/enquire-now"
        ctaLabel="Partner with us"
      />

      <Section tone="default" title="Our Vision for SEND Education">
        <FadeIn>
          <div className="content-boxes content-boxes--2col">
            <div className="content-box">
              <h3>Our Commitment</h3>
              <p>
                Our vision is to create a future where children with special educational needs and disabilities are empowered to learn, grow, and thrive through sport. We believe that sport is a powerful tool for development - not just physically, but emotionally, socially, and academically.
              </p>
            </div>
            <div className="content-box">
              <h3>How We Make It Happen</h3>
              <p>
                Through inclusive sports experiences we provide children with opportunities to build confidence, communication, resilience, and key life skills. By integrating cross curricular learning into every session we meet each child where they are and support them in an environment that suits their needs and learning style.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section tone="muted" title="What Sets Us Apart">
        <FadeIn>
          <div className="content-boxes content-boxes--2col">
            <div className="content-box content-box--beige">
              <h3>SEND-First Design</h3>
              <p>
                We don't adapt mainstream programmes - we design everything from the ground up with SEND learners in mind, ensuring every activity is accessible and meaningful. Our approach recognises that every child learns differently and deserves programmes built specifically for their needs.
              </p>
              <p>
                <strong>This means:</strong> activities designed with sensory needs in mind, flexible learning approaches, and celebration of individual progress over standardised outcomes.
              </p>
            </div>
            <div className="content-box content-box--beige">
              <h3>Cross-Curricular Integration</h3>
              <p>
                Sport isn't just exercise - it's a vehicle for learning maths, communication, social skills, and life skills in an engaging, active environment. We seamlessly integrate curriculum objectives into every session, making learning active, fun, and memorable.
              </p>
              <p>
                <strong>The result:</strong> children develop academically while building physical fitness, social connections, and confidence - all through movement and play.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section tone="default" title="Our Impact">
        <FadeIn>
          <div className="content-boxes content-boxes--2col">
            <div className="content-box">
              <h3>Transforming Lives</h3>
              <p>
                When children engage with sport in a supportive, inclusive environment, the transformation is profound. We've seen children who were reluctant to participate become team leaders. We've watched students who struggled with maths concepts grasp them through physical activity.
              </p>
              <p>
                Our goal is to give every SEND child the best possible chance at leading an independent, fulfilling life. We celebrate every small win, nurture every unique ability, and walk alongside every child on their journey to becoming confident, capable, and independent.
              </p>
            </div>
            <div className="content-box">
              <h3>Growing Toward Independence</h3>
              <p>
                We've observed young people develop friendships, confidence, and independence they never thought possible. This is why we do what we do. Every session, every programme, every interaction is designed to move children closer to independence.
              </p>
              <div className="vision-quote-box">
                <p>
                  "Every child deserves the chance to succeed - in their own way, at their own pace, and in an environment that celebrates who they are."
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section tone="accent">
        <FadeIn>
          <div className="cta-block">
            <h2>Ready to bring this vision to your school?</h2>
            <p>
              Partner with Learning Through Motion to provide your SEND students with transformative sports-based learning experiences.
            </p>
            <div className="cta-block__actions">
              <a href="/enquire-now" className="btn btn--large">
                Get in touch
              </a>
              <a href="/our-programmes" className="btn btn--ghost btn--large">
                Explore our programmes
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
