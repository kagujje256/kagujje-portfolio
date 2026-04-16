"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#writings", label: "Writings" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-['Playfair_Display'] text-2xl font-bold tracking-wider text-[var(--accent)]"
        >
          KAGUJJE
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-[var(--text-secondary)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
