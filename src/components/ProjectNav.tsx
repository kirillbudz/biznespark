import Link from "next/link";

const LINKS = [
  { href: "#about", label: "О ЖК" },
  { href: "#choose", label: "Подобрать квартиру" },
  { href: "#layouts", label: "Планировки" },
  { href: "#gallery", label: "Визуализации" },
  { href: "#location", label: "Локация" },
  { href: "#contact", label: "Оставить заявку" },
] as const;

export function ProjectNav() {
  return (
    <nav
      className="sticky top-16 z-40 border-b border-header-border bg-header-bg backdrop-blur-xl"
      aria-label="Навигация по разделам проекта"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto py-3 sm:flex-wrap sm:overflow-visible sm:gap-2">
          {LINKS.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className="inline-block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
