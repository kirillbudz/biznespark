import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";

const FOOTER_LINKS = [
  { href: "/#about", label: "О компании" },
  { href: "/#advantages", label: "Преимущества" },
  { href: "/#projects", label: "Проекты" },
  { href: "/#contact", label: "Контакты" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[oklch(0.08_0.02_250)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={`${company.companyName} логотип`}
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-base font-semibold text-white">
                {company.companyName}
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {company.tagline}
            </p>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-sm font-semibold text-white">Контакты</p>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>{company.address}</p>
              <p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="transition-colors hover:text-accent"
                >
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {company.email}
                </a>
              </p>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-sm font-semibold text-white">Разделы</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold text-white">
              Юридическая информация
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-accent"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              {company.legalName}. Оферта по запросу. Проектная декларация на
              сайте застройщика.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {company.companyName}. Все права
            защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
