'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROGRAMME_SHORTCUTS } from "@/content/siteContent";

type ProgrammeStripProps = {
  contextLinks: { label: string; href: string }[] | undefined;
};

export function ProgrammeStrip({ contextLinks }: ProgrammeStripProps) {
  const pathname = usePathname();

  // Don't show on homepage
  if (pathname === '/') {
    return null;
  }

  const links = contextLinks ?? PROGRAMME_SHORTCUTS;

  return (
    <div className="programme-strip" aria-label="Programme quick links">
      <div className="shell programme-strip__inner">
        <nav className="programme-strip__nav">
          {links.map((link, index) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <span key={link.href} className="programme-strip__item">
                <Link
                  href={link.href}
                  className={`programme-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  prefetch={false}
                >
                  {link.label}
                </Link>
                {index < links.length - 1 && (
                  <span className="programme-strip__separator" aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
