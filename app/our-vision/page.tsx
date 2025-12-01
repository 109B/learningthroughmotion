import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { VISION_PARAGRAPHS } from "@/content/siteContent";

import { getCarouselImages } from "@/lib/carousel";

export default async function OurVisionPage() {
  const carouselImages = await getCarouselImages("vision");

  return (
    <>
      <PageHero
        eyebrow="Our vision"
        title="Learning Through Motion, Growing Toward Independence"
        intro="Sport is the gateway we use to unlock confidence, curiosity, and independence for every child we support."
        ctaHref="/enquire-now"
        ctaLabel="Partner with us"
        carouselImages={carouselImages}
      />
      <Section>
        <FadeIn>
          <div className="prose prose--columns">
            {VISION_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
