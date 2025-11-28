import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { PROGRAMMES } from "@/content/siteContent";

export default function MathsThroughSportPage() {
  const programme = PROGRAMMES.find(
    (item) => item.slug === "maths-through-sport"
  );

  if (!programme) {
    notFound();
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
      />

      <Section>
        <div className="prose prose--columns">
          {programme.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
