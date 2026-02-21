"use client";

import { useEffect, useState } from "react";

type LogoBadgeProps = {
  iconSrc?: string;
};

export function LogoBadge({ iconSrc = "/images/109-logo-circle1.png" }: LogoBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show badge only when near bottom (within 400px of bottom)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + windowHeight;
      const nearBottom = scrollPosition > documentHeight - 400;

      setIsVisible(nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="logo-badge">
      <a
        href="https://1zero9.com"
        target="_blank"
        rel="noopener noreferrer"
        className="logo-badge__link"
      >
        <span className="logo-badge__text">Built by 1Zero9</span>
        <img
          src={iconSrc}
          alt="1zero9 logo"
          width="24"
          height="24"
          className="logo-badge__icon"
        />
      </a>
    </div>
  );
}
