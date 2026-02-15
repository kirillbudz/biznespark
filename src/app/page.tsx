import { AboutSection } from "@/components/AboutSection";
import { ChooseApartmentSection } from "@/components/ChooseApartmentSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";
import { Divider } from "@/components/catalyst";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Divider soft />
      </div>
      <AboutSection />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Divider soft />
      </div>
      <ChooseApartmentSection />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Divider soft />
      </div>
      <GallerySection />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Divider soft />
      </div>
      <ContactSection />
    </>
  );
}
