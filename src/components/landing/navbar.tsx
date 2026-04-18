"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Ventures" },
  { href: "#projects", label: "Projects" },
  { href: "#writings", label: "Writings" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a
            href="mailto:dicksonkagujje@gmail.com"
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--bg-primary)] transition-all hover:opacity-90"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-tertiary)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="text-[var(--text-secondary)]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
          <a
            href="mailto:dicksonkagujje@gmail.com"
            className="block px-6 py-3 text-sm font-semibold text-[var(--accent)]"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
