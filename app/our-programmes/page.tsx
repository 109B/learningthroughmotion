import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { ProgrammeCards } from "@/components/common/ProgrammeCards";
import {
  HOME_GALLERY,
  PROGRAMMES,
  PROGRAMMES_PAGE_COPY,
} from "@/content/siteContent";

export default function OurProgrammesPage() {
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
      />

      <Section>
        <div className="prose">
          {PROGRAMMES_PAGE_COPY.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{PROGRAMMES_PAGE_COPY.closing}</p>
        </div>
      </Section>

      <Section tone="accent">
        <ProgrammeCards programmes={PROGRAMMES} />
      </Section>
    </>
  );
}
