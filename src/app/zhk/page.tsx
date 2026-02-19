import type { Metadata } from "next";
import Link from "next/link";
import { baseUrl } from "@/lib/site-url";
import { AboutSection } from "@/components/AboutSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { GallerySection } from "@/components/GallerySection";

const url = `${baseUrl}/zhk`;

export const metadata: Metadata = {
  title: "О жилом комплексе «Крепость»",
  description:
    "Подробнее о ЖК «Крепость» в Якутске: характеристики, планировки, визуализации.",
  alternates: { canonical: url },
  openGraph: {
    url,
    title: "О жилом комплексе «Крепость» — Якутск | Бизнеспарк",
    description:
      "Подробнее о ЖК «Крепость» в Якутске: характеристики, планировки, визуализации.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "ЖК Крепость" }],
  },
};

export default function ZhkPage() {
  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "ЖК Крепость", href: "/zhk" },
        ]}
      />
      <section className="border-b border-border bg-section-alt-bg py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            О жилом комплексе «Крепость»
          </h1>
          <p className="mt-2 text-muted-foreground">
            Подробнее о жилом комплексе: характеристики, планировки, визуализации.
          </p>
        </div>
      </section>
      <AboutSection />
      <GallerySection />
      <div className="py-10 text-center">
        <Link
          href="/projects/krepost#choose"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-base font-semibold text-foreground transition-all hover:bg-muted"
        >
          Подобрать квартиру на главной
        </Link>
      </div>
    </main>
  );
}
