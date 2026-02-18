"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations";

const BADGES = [
  "Якутск, квартал 65",
  "16 этажей",
  "Тёплая автостоянка",
  "Коммерческие помещения",
] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      aria-labelledby="hero-title"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/hero-build.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl text-left">
          <FadeIn delay={0.1}>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Жилой комплекс
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              id="hero-title"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              ЖК &laquo;Крепость&raquo;
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-4 max-w-xl text-lg text-white/80 sm:text-xl">
              Современный жилой дом с паркингом и коммерческими помещениями в
              Якутске
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <ul
              className="mt-6 flex flex-wrap gap-3"
              aria-label="Характеристики жилого комплекса"
            >
              {BADGES.map((label) => (
                <li key={label}>
                  <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/10">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
              <Link
                href="#choose"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
              >
                Подобрать квартиру
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black"
              >
                О жилом комплексе
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
