"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";

const FOOTER_LINKS = [
  { label: "Shop", href: "#product-reveal" },
  { label: "Create", href: "#personalization-studio" },
  { label: "Occasions", href: "#audiences" },
  { label: "About", href: "#emotional-story" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Pinterest", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream" data-nav-theme="dark">
      <Container className="py-20">
        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-2xl">
              Wrap Memories
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-coral" />
            </p>
            <p className="mt-4 max-w-xs font-display text-lg italic text-cream/70">
              Your story. Creatively wrapped.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-cream/80 md:grid-cols-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-opacity hover:opacity-70">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm text-cream/70">A little inspiration, wrapped occasionally.</p>
            <form
              className="mt-4 flex items-center gap-2 border-b border-cream/30 pb-2 focus-within:border-coral"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="shrink-0 rounded-full p-1.5 text-coral transition-opacity hover:opacity-70"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <ul className="mt-8 flex items-center gap-5 text-sm text-cream/70">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <Link href={social.href} className="transition-opacity hover:opacity-70">
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Wrap Memories. All rights reserved.</p>
          <p>Prototype build — assets and copy are placeholders.</p>
        </div>
      </Container>
    </footer>
  );
}
