"use client";

import Link from "next/link";
import { Navbar, NavbarItem, NavbarSection } from "@/components/catalyst";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white"
        >
          ЖК «Крепость»
        </Link>
        <Navbar className="py-0">
          <NavbarSection>
            <NavbarItem href="/#about">О ЖК</NavbarItem>
            <NavbarItem href="/#choose">Подобрать квартиру</NavbarItem>
            <NavbarItem href="/#gallery">Визуализации</NavbarItem>
            <NavbarItem href="/#contact">Оставить заявку</NavbarItem>
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  );
}
