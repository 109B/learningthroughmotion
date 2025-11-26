import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { PROGRAMMES } from "@/content/siteContent";

export default function TheNextChapterPage() {
  const programme = PROGRAMMES.find(
    (item) => item.slug === "the-next-chapter"
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
        ctaLabel="Arrange a visit"
        imageSrc={programme.heroImage}
      />

      <Section>
        <div className="prose">
          {programme.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {programme.bulletHeading && programme.bullets && (
          <div>
            <h3>{programme.bulletHeading}</h3>
            <ul className="bullet-list">
              {programme.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
