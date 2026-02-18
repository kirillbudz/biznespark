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
          className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
        >
          Подобрать квартиру на главной
        </Link>
      </div>
    </main>
  );
}
