import type { Metadata } from "next";
import { Playfair_Display, Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

const body = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
