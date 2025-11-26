"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/content/siteContent";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleNavigate = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="shell header__inner">
        <Link className="brand" href="/" onClick={handleNavigate}>
          <Image
            src="/logo.png"
            alt="Learning Through Motion logo"
            width={56}
            height={56}
            className="brand__mark"
            priority
          />
          <div className="brand__copy">
            <span className="brand__name">Learning Through Motion</span>
            <span className="brand__tagline">Growing Towards Independence</span>
          </div>
        </Link>

        <button
          className="nav-toggle"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${isOpen ? "is-open" : ""}`}
        >
          <ul>
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive ? "is-active" : undefined}
                    onClick={handleNavigate}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
