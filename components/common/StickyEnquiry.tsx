"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyEnquiry() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px down
      const scrolled = window.scrollY > 400;

      // Hide when near footer (within 300px of bottom)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + windowHeight;
      const nearFooter = scrollPosition > documentHeight - 300;

      setIsVisible(scrolled && !nearFooter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sticky-enquiry" aria-live="polite">
      <Link href="/enquire-now" className="sticky-enquiry__button">
        <span className="sticky-enquiry__icon" aria-hidden="true">
          ✉
        </span>
        <span className="sticky-enquiry__text">Enquire Now</span>
      </Link>
    </div>
  );
}
