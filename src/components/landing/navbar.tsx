"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#ventures", label: "Ventures" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writings", label: "Writings" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-lg border-b border-zinc-800" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-['Playfair_Display'] text-2xl font-bold tracking-wider text-[var(--accent)]"
        >
          KAGUJJE
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:dicksonkagujje@gmail.com"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-hover)]"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-zinc-400 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-zinc-800 bg-black lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
          <div className="p-4">
            <a
              href="mailto:dicksonkagujje@gmail.com"
              className="block w-full rounded-lg bg-[var(--accent)] py-3 text-center text-sm font-semibold text-black"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
