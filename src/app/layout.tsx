import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wrap Memories — Your story. Creatively wrapped.",
  description:
    "Wrap Memories turns the people, pets and moments you love into personalized creative gifts — photos and memories reimagined as art you can hold.",
  openGraph: {
    title: "Wrap Memories — Your story. Creatively wrapped.",
    description:
      "Turn the people, pets and moments you love into something made just for them.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-full bg-cream text-charcoal antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
