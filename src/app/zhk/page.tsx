import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";
import { Button, Divider } from "@/components/catalyst";

export const metadata: Metadata = {
  title: "О жилом комплексе «Крепость»",
  description:
    "Подробнее о ЖК «Крепость» в Якутске: характеристики, планировки, визуализации.",
};

export default function ZhkPage() {
  return (
    <main>
      <AboutSection />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Divider soft />
      </div>
      <GallerySection />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Button href="/#choose" outline>
          Подобрать квартиру на главной
        </Button>
      </div>
    </main>
  );
}
