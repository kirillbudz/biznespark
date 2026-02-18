"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const STYLOBATE_IMAGES = [
  { src: "/gastello/tild3362-3139-4431-b431-643238303865__1.jpg", alt: "Стилобат ЖК Гастелло" },
  { src: "/gastello/tild3036-3465-4337-b963-336635643535__2.jpg", alt: "Зона отдыха" },
  { src: "/gastello/tild3534-3264-4265-a364-393234343238__9.jpg", alt: "Тренажёрная и детская зона" },
];

export function GastelloStylobate() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="gastello-stylobate">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p
            id="gastello-stylobate"
            className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Стилобат на 660 квадратных метров: тренажёрная зона, детская
            игровая и зона отдыха.
          </p>
        </FadeIn>

        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STYLOBATE_IMAGES.map(({ src, alt }) => (
            <StaggerItem key={src}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${src})` }}
                  role="img"
                  aria-label={alt}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
