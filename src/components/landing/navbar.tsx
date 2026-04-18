"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Ventures" },
  { href: "#projects", label: "Projects" },
  { href: "#writings", label: "Writings" },
  { href: "#contact", label: "Contact" },
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
    <nav 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`font-['Playfair_Display'] text-2xl font-bold tracking-wider transition-all duration-300 ${
            scrolled ? "text-[var(--accent)]" : "text-[var(--accent)]"
          }`}
        >
          KAGUJJE
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)]"
        >
          Hire Me
        </a>

        {/* Mobile Toggle */}
        <button
          className="text-[var(--text-secondary)] md:hidden transition-colors hover:text-[var(--accent)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent)] hover:pl-8"
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 py-4">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--accent)]"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
