"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-nav-theme="dark"]');
    const triggers = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top top+=64",
        end: "bottom top+=64",
        onToggle: (self) => setOnDark(self.isActive),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const inverted = onDark && !menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || inverted ? "backdrop-blur-md" : "",
        inverted ? "bg-charcoal/70" : scrolled ? "bg-cream/80" : "bg-transparent",
        scrolled && !inverted ? "border-b border-charcoal/10" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16 transition-colors duration-500",
          inverted ? "text-cream" : "text-charcoal",
        )}
      >
        <Link
          href="#top"
          className="flex items-center gap-2 font-display text-xl tracking-tight"
        >
          <span>Wrap Memories</span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-coral" />
        </Link>

        <ul className="hidden items-center gap-10 text-[0.95rem] font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative py-1 transition-opacity hover:opacity-70",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden rounded-full p-2 transition-opacity hover:opacity-70 sm:inline-flex"
          >
            <HeartIcon />
          </button>
          <button
            type="button"
            aria-label="Shopping bag, 0 items"
            className="hidden rounded-full p-2 transition-opacity hover:opacity-70 sm:inline-flex"
          >
            <BagIcon />
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex rounded-full p-2 transition-opacity hover:opacity-70 md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 flex flex-col bg-cream px-6 pt-10 text-charcoal md:hidden">
          <ul className="flex flex-col gap-6 text-2xl font-display">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-6 border-t border-charcoal/10 pt-6">
            <button type="button" aria-label="Wishlist" className="inline-flex items-center gap-2 text-sm">
              <HeartIcon /> Wishlist
            </button>
            <button type="button" aria-label="Shopping bag, 0 items" className="inline-flex items-center gap-2 text-sm">
              <BagIcon /> Bag
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 20.5s-7.5-4.6-10-9.3C0.3 7.7 2 4 5.6 4c2 0 3.6 1.1 4.4 2.7C10.8 5.1 12.4 4 14.4 4 18 4 19.7 7.7 18 11.2c-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 8h12l-1 12.5a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
    </svg>
  );
}
