"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyEnquiry() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px down
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
