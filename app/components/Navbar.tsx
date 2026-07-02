"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projectCategories } from "@/app/lib/projects";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setProjectsOpen(false);
  }, [pathname]);

  const isProjectsActive = pathname.startsWith("/projects");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled
          ? "bg-paper/95 backdrop-blur-md border-b border-line shadow-sm"
          : "bg-paper"
      }`}
    >
      {/* Masthead rule */}
      <div className="h-1 bg-accent" />

      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-ink font-semibold text-lg tracking-tight"
        >
          Byron Delaney<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href="/"
              className={`text-sm transition-colors duration-200 tracking-wide ${
                pathname === "/"
                  ? "text-accent font-medium"
                  : "text-muted hover:text-ink"
              }`}
            >
              Home
            </Link>
          </li>

          {/* Projects dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProjectsOpen((o) => !o)}
              className={`flex items-center gap-1 text-sm transition-colors duration-200 tracking-wide ${
                isProjectsActive
                  ? "text-accent font-medium"
                  : "text-muted hover:text-ink"
              }`}
            >
              Projects
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className={`transition-transform duration-200 ${projectsOpen ? "rotate-180" : ""}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {projectsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-surface border border-line rounded-sm shadow-lg overflow-hidden">
                <Link
                  href="/projects"
                  onClick={() => setProjectsOpen(false)}
                  className="block px-4 py-3 text-sm text-body hover:text-accent hover:bg-paper transition-colors"
                >
                  All Projects
                </Link>
                <div className="border-t border-line mx-3" />
                {projectCategories
                  .filter((c) => c.id !== "all")
                  .map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/projects?category=${cat.id}`}
                      onClick={() => setProjectsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-body hover:text-accent hover:bg-paper transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
              </div>
            )}
          </li>

          <li>
            <Link
              href="/writing"
              className={`text-sm transition-colors duration-200 tracking-wide ${
                pathname.startsWith("/writing")
                  ? "text-accent font-medium"
                  : "text-muted hover:text-ink"
              }`}
            >
              Writing
            </Link>
          </li>

          <li>
            <a
              href="mailto:byrondelaney.jr@outlook.com"
              className="text-sm px-4 py-2 bg-accent text-paper rounded-sm hover:bg-accent-deep transition-colors duration-200 tracking-wide font-medium"
            >
              Get in Touch
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-ink transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-line px-6 py-4 flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-body hover:text-accent transition-colors py-2"
          >
            Home
          </Link>

          {/* Mobile projects accordion */}
          <button
            onClick={() => setMobileProjectsOpen((o) => !o)}
            className="flex items-center justify-between text-sm text-body hover:text-accent transition-colors py-2 w-full text-left"
          >
            Projects
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className={`transition-transform duration-200 ${mobileProjectsOpen ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileProjectsOpen && (
            <div className="pl-4 flex flex-col gap-1 border-l border-line ml-1 mb-1">
              <Link
                href="/projects"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-body hover:text-accent transition-colors py-1.5"
              >
                All Projects
              </Link>
              {projectCategories
                .filter((c) => c.id !== "all")
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/projects?category=${cat.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-body hover:text-accent transition-colors py-1.5"
                  >
                    {cat.label}
                  </Link>
                ))}
            </div>
          )}

          <Link
            href="/writing"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-body hover:text-accent transition-colors py-2"
          >
            Writing
          </Link>

          <a
            href="mailto:byrondelaney.jr@outlook.com"
            className="text-sm bg-accent text-paper px-4 py-2 rounded-sm text-center hover:bg-accent-deep transition-colors mt-2 font-medium"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
