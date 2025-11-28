"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { PRIMARY_NAV } from "@/content/siteContent";
import { ProgrammeStrip } from "@/components/layout/ProgrammeStrip";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Preload the smile image for instant swap
  useEffect(() => {
    const img = new window.Image();
    img.src = "/images/smile.png";
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const handleMouseEnter = (label: string) => {
    setOpenSubmenu(label);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  const activeSection = PRIMARY_NAV.find((item) =>
    item.href === "/"
      ? pathname === "/"
      : item.children
      ? item.children.some((child) => pathname.startsWith(child.href))
      : pathname.startsWith(item.href)
  );

  return (
    <header className="site-header" role="banner">
      <nav className="utility-bar" aria-label="Learning Through Motion utility links">
        <div className="utility-bar__inner">
          <ul className="utility-bar__list" role="list">
            <li className="utility-bar__item">
              <span className="utility-bar__placeholder">Secure logon area coming soon</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className="shell header__inner">
        <Link className="brand" href="/" onClick={handleNavigate}>
          <div
            className={`brand__mark-wrapper ${isLogoHovered ? 'is-hovered' : ''}`}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <Image
              src={isLogoHovered ? "/images/smile.png" : "/images/logo.png"}
              alt="Learning Through Motion logo"
              width={isLogoHovered ? 75 : 135}
              height={isLogoHovered ? 75 : 135}
              className="brand__mark"
              priority
            />
          </div>
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
          aria-label="Primary navigation"
        >
          <ul className="nav-list">
            {PRIMARY_NAV.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const hasChildren = item.children && item.children.length > 0;
              const isSubmenuOpen = openSubmenu === item.label;

              return (
                <li
                  key={item.href}
                  className={`nav-item ${hasChildren ? "nav-item--has-dropdown" : ""}`}
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  {hasChildren ? (
                    <>
                      <button
                        className={`nav-link nav-link--dropdown ${isActive ? "is-active" : ""}`}
                        aria-expanded={isSubmenuOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <span className="dropdown-arrow" aria-hidden="true">▾</span>
                      </button>
                      <ul className={`dropdown-menu ${isSubmenuOpen ? "is-open" : ""}`}>
                        {item.children?.map((child) => (
                          <li key={child.href} className="dropdown-item">
                            <Link
                              href={child.href}
                              className={`dropdown-link ${pathname.startsWith(child.href) ? "is-active" : ""}`}
                              onClick={handleNavigate}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`nav-link ${isActive ? "is-active" : ""}`}
                      onClick={handleNavigate}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href="/enquire-now"
            className="btn btn--ghost nav-cta"
            onClick={handleNavigate}
          >
            Enquire now
          </Link>
        </nav>
      </div>
      <ProgrammeStrip contextLinks={activeSection?.children} />
    </header>
  );
}
