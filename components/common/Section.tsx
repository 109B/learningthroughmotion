import { FadeIn } from "./FadeIn";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  intro?: string;
  tone?: "default" | "accent" | "muted";
  animate?: boolean;
  children?: React.ReactNode;
};

export function Section({
  id,
  title,
  eyebrow,
  intro,
  tone = "default",
  animate = true,
  children,
}: SectionProps) {
  const content = (
    <section id={id} className={`section section--${tone}`}>
      <div className="shell">
        {(title || eyebrow) && (
          <header className="section__header">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {intro && <p className="lead">{intro}</p>}
          </header>
        )}
        <div className="section__body">{children}</div>
      </div>
    </section>
  );

  if (animate) {
    return <FadeIn>{content}</FadeIn>;
  }

  return content;
}
