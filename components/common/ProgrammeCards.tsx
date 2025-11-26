import Link from "next/link";
import { ProgrammeDetail } from "@/content/siteContent";

type ProgrammeCardsProps = {
  programmes: ProgrammeDetail[];
};

export function ProgrammeCards({ programmes }: ProgrammeCardsProps) {
  return (
    <div className="programme-grid">
      {programmes.map((programme) => (
        <article key={programme.slug} className="programme-card">
          <p className="eyebrow">Programme</p>
          <h3>{programme.title}</h3>
          <p>{programme.excerpt}</p>
          <Link className="link-arrow" href={`/${programme.slug}`}>
            Read more
          </Link>
        </article>
      ))}
    </div>
  );
}
