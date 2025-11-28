import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { VISION_PARAGRAPHS } from "@/content/siteContent";

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
      <Section>
        <div className="prose prose--columns">
          {VISION_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
