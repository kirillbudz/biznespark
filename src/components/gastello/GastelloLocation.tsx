"use client";

import { company } from "@/content/company";
import { FadeIn } from "@/components/animations";

const DGIS_IFRAME_SRC =
  "https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A62.010965%2C%22lon%22%3A129.716249%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22yakutsk%22%7D%2C%22org%22%3A%2270000001093647232%22%7D";

export function GastelloLocation() {
  return (
    <section
      id="location"
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] bg-section-alt-bg"
      aria-labelledby="gastello-location-title"
    >
      <FadeIn direction="left" className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16 order-2 lg:order-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-10 w-1 rounded-full bg-accent" aria-hidden />
          <h2
            id="gastello-location-title"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Офис продаж
          </h2>
        </div>

        <dl className="space-y-4 text-foreground">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Адрес
            </dt>
            <dd className="mt-0.5">{company.address}</dd>
          </div>
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
          title="Карта 2GIS — офис продаж"
          src={DGIS_IFRAME_SRC}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
