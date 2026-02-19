import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { ChooseApartmentSection } from "@/components/ChooseApartmentSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";
import { KrepostLayoutsSection } from "@/components/KrepostLayoutsSection";
import { LocationSection } from "@/components/LocationSection";
import { ProjectNav } from "@/components/ProjectNav";

export const metadata: Metadata = {
  title: "ЖК «Крепость» — Якутск",
  description:
    "Современный жилой дом с паркингом и коммерческими помещениями в Якутске. Подбор квартир, визуализации, заявка.",
};

export default function KrepostPage() {
  return (
    <main>
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
