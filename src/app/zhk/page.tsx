import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";

export const metadata: Metadata = {
  title: "О жилом комплексе «Крепость»",
  description:
    "Подробнее о ЖК «Крепость» в Якутске: характеристики, планировки, визуализации.",
};

export default function ZhkPage() {
  return (
    <main>
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
