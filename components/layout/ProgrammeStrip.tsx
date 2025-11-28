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

  return (
    <div className="programme-strip" aria-label="Programme quick links">
      <div className="shell programme-strip__inner">
        <p className="programme-strip__label">Explore:</p>
        <div className="programme-strip__links">
          {(contextLinks ?? PROGRAMME_SHORTCUTS).map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`programme-pill ${isActive ? "programme-pill--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                prefetch={false}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
