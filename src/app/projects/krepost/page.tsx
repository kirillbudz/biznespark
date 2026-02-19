import type { Metadata } from "next";
import { baseUrl } from "@/lib/site-url";
import { AboutSection } from "@/components/AboutSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ChooseApartmentSection } from "@/components/ChooseApartmentSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";
import { KrepostLayoutsSection } from "@/components/KrepostLayoutsSection";
import { LocationSection } from "@/components/LocationSection";
import { ProjectNav } from "@/components/ProjectNav";

const url = `${baseUrl}/projects/krepost`;

export const metadata: Metadata = {
  title: "ЖК «Крепость» — Якутск",
  description:
    "Современный жилой дом с паркингом и коммерческими помещениями в Якутске. Подбор квартир, визуализации, заявка.",
  alternates: { canonical: url },
  openGraph: {
    url,
    title: "ЖК «Крепость» — Якутск | Бизнеспарк",
    description:
      "Современный жилой дом с паркингом и коммерческими помещениями в Якутске. Подбор квартир, визуализации, заявка.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "ЖК Крепость" }],
  },
};

export default function KrepostPage() {
  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "Проекты", href: "/#projects" },
          { name: "ЖК Крепость", href: "/projects/krepost" },
        ]}
      />
      <Hero />
      <ProjectNav />
      <AboutSection />
      <ChooseApartmentSection />
      <KrepostLayoutsSection />
      <GallerySection />
      <LocationSection />
      <ContactSection />
    </main>
  );
}
