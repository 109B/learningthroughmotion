import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { PROGRAMMES } from "@/content/siteContent";

import { getCarouselImages } from "@/lib/carousel";

export default async function SensoryRedevelopmentPage() {
  const programme = PROGRAMMES.find(
    (item) => item.slug === "sensory-redevelopment"
  );
  const carouselImages = await getCarouselImages("sensory");

  if (!programme) {
    return null;
  }

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={programme.title}
        intro={programme.excerpt}
        ctaHref="/enquire-now"
        ctaLabel="Book a discovery call"
        imageSrc={programme.heroImage}
        carouselImages={carouselImages}
      />

      <Section>
        <FadeIn>
          <div className="prose prose--columns">
            {programme.bulletHeading && programme.bullets && (
              <>
                <h3>{programme.bulletHeading}</h3>
                <ul>
                  {programme.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </>
            )}
            {programme.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
