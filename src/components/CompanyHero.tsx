"use client";

import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";
import { FadeIn, CountUp, StaggerChildren, StaggerItem } from "@/components/animations";

export function CompanyHero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] w-full overflow-hidden bg-gradient-to-br from-background via-card to-background"
      aria-labelledby="company-hero-title"
    >
      {/* Grid pattern overlay */}
      <div className="hero-grid absolute inset-0" aria-hidden />

      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <Image
          src="/logo.png"
          alt=""
          width={500}
          height={500}
          className="opacity-[0.03] scale-150 select-none pointer-events-none"
          priority
        />
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,oklch(0.35_0.12_250_/_0.15),transparent)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[85vh] flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          <FadeIn delay={0.2}>
            <h1
              id="company-hero-title"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl"
            >
              Строим{" "}
              <span className="text-accent">будущее</span>{" "}
              Якутска
            </h1>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Современные жилые комплексы с продуманной инфраструктурой,
              адаптированные к климату Якутии
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                Подобрать квартиру
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-7 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              >
                Наши проекты
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Stats row */}
        <StaggerChildren
          staggerDelay={0.12}
          className="mx-auto mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {company.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="glass rounded-xl px-4 py-5 text-center">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
