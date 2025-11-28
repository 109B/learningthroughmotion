import type { Metadata } from "next";
import { Playfair_Display, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipNav } from "@/components/layout/SkipNav";
import { StickyEnquiry } from "@/components/common/StickyEnquiry";

// Using Atkinson Hyperlegible for headings too for better accessibility
// Serif fonts like Playfair can be challenging for dyslexic readers
const heading = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.learningthroughmotion.co.uk"),
  title: {
    default: "Learning Through Motion",
    template: "%s | Learning Through Motion",
  },
  description:
    "In school active learning programmes for SEND pupils across Greater Manchester. Learning Through Motion blends curriculum targets with sport, movement, and mentoring.",
  keywords: [
    "SEND",
    "active learning",
    "maths through sport",
    "sensory redevelopment",
    "Greater Manchester schools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>
        <SkipNav />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <StickyEnquiry />
      </body>
    </html>
  );
}
