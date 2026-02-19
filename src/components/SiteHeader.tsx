"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/#about", label: "О компании" },
  { href: "/#advantages", label: "Преимущества" },
  { href: "/#projects", label: "Проекты" },
  { href: "/#contact", label: "Контакты" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-header-border bg-header-bg backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt={`${company.companyName} логотип`}
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {company.companyName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + Theme toggle + Mobile burger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            Оставить заявку
          </Link>

          {/* Burger button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="md:hidden border-t border-border bg-header-bg backdrop-blur-xl"
          aria-label="Мобильная навигация"
        >
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-accent hover:bg-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="mt-3 block rounded-lg bg-accent px-3 py-2.5 text-center text-base font-semibold text-accent-foreground transition-all hover:brightness-110"
              onClick={() => setMobileOpen(false)}
            >
              Оставить заявку
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
