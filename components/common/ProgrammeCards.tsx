import Link from "next/link";
import Image from "next/image";
import { ProgrammeDetail } from "@/content/siteContent";

type ProgrammeCardsProps = {
  programmes: ProgrammeDetail[];
};

export function ProgrammeCards({ programmes }: ProgrammeCardsProps) {
  return (
    <div className="programme-grid">
      {programmes.map((programme) => (
        <article
          key={programme.slug}
          className="programme-card"
          style={
            {
              "--programme-accent": programme.accent,
            } as React.CSSProperties
          }
        >
          {programme.heroImage && (
            <div className="programme-card__image">
              <Image
                src={programme.heroImage}
                alt={`${programme.title} in action`}
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="programme-card__content">
            <p className="eyebrow">Programme</p>
            <h3>{programme.title}</h3>
            <p>{programme.excerpt}</p>
            <div className="programme-card__footer">
              <Link className="link-arrow" href={`/${programme.slug}`}>
                Learn more about this programme
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
