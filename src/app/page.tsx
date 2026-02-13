import { AboutSection } from "@/components/AboutSection";
import { ChooseApartmentSection } from "@/components/ChooseApartmentSection";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";

export default function Page() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ChooseApartmentSection />
      <GallerySection />
      {/* дальше секции */}
    </>
  );
}
