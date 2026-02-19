"use client";

import { FadeIn } from "@/components/animations";

export function GastelloAbout() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-section-alt-bg"
      aria-labelledby="gastello-about"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p
            id="gastello-about"
            className="text-center text-xl text-muted-foreground md:text-2xl max-w-4xl mx-auto leading-relaxed"
          >
            ЖК Гастелло — это квартиры комфорт-класса в перспективном районе
            Якутска. Развитая инфраструктура, благоустроенные дворы и
            современные планировки для комфортной жизни.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
