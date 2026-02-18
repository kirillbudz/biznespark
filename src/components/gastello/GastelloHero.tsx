"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations";

const HERO_IMAGE = "/gastello/tild3037-6135-4435-b266-633635373737__3.jpg";

export function GastelloHero() {
  return (
    <section
      className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-[oklch(0.1_0.03_250)] to-[oklch(0.08_0.02_250)]"
      aria-labelledby="gastello-hero-title"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[70vh] flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <FadeIn delay={0.1}>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Жилой комплекс
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              id="gastello-hero-title"
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              ЖК Гастелло — Ваш новый дом
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 text-lg text-white/80 sm:text-xl">
              Качественные многоквартирные дома для комфортной жизни в
              перспективном районе Якутска
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10">
              <Link
                href="#contacts"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
              >
                Купить квартиру
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
