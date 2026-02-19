"use client";

import { FadeIn } from "@/components/animations";

const HERO_IMAGE = "/gastello/tild3037-6135-4435-b266-633635373737__3.jpg";

export function GastelloHero() {
  return (
    <section
      className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-background to-card"
      aria-labelledby="gastello-hero-title"
    >
      <div
        className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[var(--overlay-start)] via-[var(--overlay-mid)] to-[var(--overlay-end)]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[90vh] flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <FadeIn delay={0.1}>
            <h1
              id="gastello-hero-title"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              ЖК Гастелло — Ваш новый дом
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 text-lg text-white sm:text-xl">
              Качественные многоквартирные дома для комфортной жизни в
              перспективном районе Якутска
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
