import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { PROGRAMMES } from "@/content/siteContent";

import { getCarouselImages } from "@/lib/carousel";
import { getProgrammeCardImages } from "@/lib/programmeImages";

export default async function MathsThroughSportPage() {
  const programme = PROGRAMMES.find((p) => p.slug === "maths-through-sport");
  const carouselImages = await getCarouselImages("maths");
  const programmeCardImages = await getProgrammeCardImages();

  if (!programme) {
    return null;
  }

  const dynamicImage = programmeCardImages.find((img) => img.slug === programme.slug);
  const heroImage = dynamicImage?.imageUrl || programme.heroImage;

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title={programme.title}
        intro={programme.excerpt}
        ctaHref="/enquire-now"
        ctaLabel="Book a discovery call"
        imageSrc={heroImage}
        carouselImages={carouselImages}
      />

      <Section>
        <FadeIn>
          <div className="content-box">
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
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
