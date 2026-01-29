import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { ProgrammeCards } from "@/components/common/ProgrammeCards";
import { FadeIn } from "@/components/common/FadeIn";
import {
  HOME_GALLERY,
  PROGRAMMES,
  PROGRAMMES_PAGE_COPY,
} from "@/content/siteContent";

import { getCarouselImages } from "@/lib/carousel";

export default async function OurProgrammesPage() {
  const carouselImages = await getCarouselImages("programmes");

  return (
    <>
      <PageHero
        eyebrow="Overview"
        title="Programmes that grow confidence through movement"
        intro="Every plan is shaped around your timetable, cohort, and EHCP outcomes. We blend maths, mentoring, and sensory redevelopment to keep learners switched on."
        imageSrc={HOME_GALLERY[0]?.src}
        imageAlt={HOME_GALLERY[0]?.alt}
        ctaHref="/enquire-now"
        ctaLabel="Discuss availability"
        carouselImages={carouselImages}
      />

      <Section>
        <FadeIn>
          <div className="content-box">
            <div className="prose prose--columns">
              {PROGRAMMES_PAGE_COPY.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{PROGRAMMES_PAGE_COPY.closing}</p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section tone="accent">
        <FadeIn>
          <ProgrammeCards programmes={PROGRAMMES} />
        </FadeIn>
      </Section>
    </>
  );
}
