type SectionProps = {
  title?: string;
  eyebrow?: string;
  intro?: string;
  tone?: "default" | "accent" | "muted";
  children?: React.ReactNode;
};

export function Section({
  title,
  eyebrow,
  intro,
  tone = "default",
  children,
}: SectionProps) {
  return (
    <section className={`section section--${tone}`}>
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
}
