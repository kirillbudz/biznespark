"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { company } from "@/content/company";
import { FadeIn } from "@/components/animations";

const MAP_IFRAME_SRC =
  "https://yandex.ru/map-widget/v1/?ll=129.69205%2C62.006037&z=16&pt=129.69205%2C62.006037%2Cpm2rdm";

export function LocationSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <section
      id="location"
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] bg-section-alt-bg"
      aria-labelledby="krepost-location-title"
    >
      <FadeIn direction="left" className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16 order-2 lg:order-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-1 rounded-full bg-accent" aria-hidden />
          <h2
            id="krepost-location-title"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Расположение
          </h2>
        </div>

        <p className="mb-6 text-muted-foreground">
          Проспект Михаила Николаева, 2/1
        </p>

        <dl className="space-y-4 text-foreground">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Телефон
            </dt>
            <dd className="mt-0.5">
              <a
                href={`tel:${company.phoneHref}`}
                className="transition-colors hover:text-accent"
              >
                {company.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Email
            </dt>
            <dd className="mt-0.5">
              <a
                href={`mailto:${company.email}`}
                className="transition-colors hover:text-accent"
              >
                {company.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Режим работы
            </dt>
            <dd className="mt-0.5">{company.workHours}</dd>
          </div>
        </dl>
      </FadeIn>

      <div className="relative min-h-[400px] lg:min-h-full order-1 lg:order-2">
        <iframe
          title="Карта — Проспект Михаила Николаева, 2/1"
          src={MAP_IFRAME_SRC}
          className="absolute inset-0 h-full w-full border-0 transition-[filter] duration-300"
          style={isDark ? { filter: "invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)" } : undefined}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
