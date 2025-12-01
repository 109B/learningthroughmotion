import { PageHero } from "@/components/common/PageHero";
import { TestimonialsSection } from "@/components/common/TestimonialsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Testimonials",
    description: "Read what schools, teachers, and parents say about Learning Through Motion's impact on SEND pupils.",
};

export default function TestimonialsPage() {
    return (
        <>
            <PageHero
                title="What our partners say"
                intro="We are proud of the impact we have on schools, teachers, and most importantly, the children we support. Here are some of their stories."
                ctaHref="/enquire-now"
                ctaLabel="Start your story"
            />

            <TestimonialsSection title="Client Feedback" />
        </>
    );
}
