import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import { CursorGlow } from "@/components/CursorGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "CALDEL — Fashion, delivered in 60 minutes.",
  description:
    "Curated luxury, dropped at your door in under 60 minutes. CALDEL launches soon — join the waitlist for early access.",
  openGraph: {
    title: "CALDEL — Fashion, delivered in 60 minutes.",
    description: "Curated luxury, dropped at your door in under 60 minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans bg-dark1 text-white overflow-x-hidden">
        <CursorGlow />
        <TopNav />
        <PageFade>
          <main>{children}</main>
        </PageFade>
        <Footer />
      </body>
    </html>
  );
}
