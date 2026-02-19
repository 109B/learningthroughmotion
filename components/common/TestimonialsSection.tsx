"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Section } from "@/components/common/Section";
import { FadeIn } from "@/components/common/FadeIn";
import { TESTIMONIALS, Testimonial } from "@/content/siteContent";

type TestimonialsSectionProps = {
    limit?: number;
    randomize?: boolean;
    title?: string;
    showAllLink?: boolean;
};

function stableHash(value: string) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
        hash ^= value.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

export function TestimonialsSection({
    limit,
    randomize = false,
    title = "What schools say about us",
    showAllLink = false,
}: TestimonialsSectionProps) {
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    const displayTestimonials = useMemo(() => {
        let items = [...TESTIMONIALS];

        if (randomize) {
            // Deterministic ordering avoids hydration mismatch between SSR and client.
            items = items
                .map((item, index) => ({
                    item,
                    order: stableHash(`${item.author}|${item.quote}|${index}`),
                }))
                .sort((a, b) => a.order - b.order)
                .map(({ item }) => item);
        }

        if (limit) {
            items = items.slice(0, limit);
        }

        return items;
    }, [limit, randomize]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedTestimonial(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        if (selectedTestimonial) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedTestimonial]);

    return (
        <Section tone="muted" title={title}>
            <FadeIn>
                <div className="testimonials-grid">
                    {displayTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="testimonial-card"
                            onClick={() => setSelectedTestimonial(testimonial)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedTestimonial(testimonial);
                                }
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <p className="testimonial-card__quote">"{testimonial.quote}"</p>
                            <footer className="testimonial-card__author">
                                <cite className="testimonial-card__name">{testimonial.author}</cite>
                                <span className="testimonial-card__role">
                                    {testimonial.role}
                                    {testimonial.school && `, ${testimonial.school}`}
                                </span>
                            </footer>
                        </div>
                    ))}
                </div>
                {showAllLink && (
                    <div className="text-center mt-8">
                        <a href="/testimonials" className="link-arrow">
                            Read more stories
                        </a>
                    </div>
                )}
            </FadeIn>

            {selectedTestimonial && createPortal(
                <div className="modal-backdrop" onClick={() => setSelectedTestimonial(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={() => setSelectedTestimonial(null)}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        <blockquote className="modal-body">
                            <p className="modal-quote">"{selectedTestimonial.quote}"</p>
                            <footer className="testimonial-card__author">
                                <cite className="testimonial-card__name" style={{ fontSize: '1.2rem' }}>
                                    {selectedTestimonial.author}
                                </cite>
                                <span className="testimonial-card__role" style={{ fontSize: '1rem' }}>
                                    {selectedTestimonial.role}
                                    {selectedTestimonial.school && `, ${selectedTestimonial.school}`}
                                </span>
                            </footer>
                        </blockquote>
                    </div>
                </div>,
                document.body
            )}
        </Section>
    );
}
