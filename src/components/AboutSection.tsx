"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations";

const FEATURES = [
  "16 этажей",
  "91 квартира",
  "встроенная автостоянка",
  "коммерческие помещения",
  "благоустроенный двор",
  "современный фасад",
] as const;

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14 items-center">
          <div>
            <FadeIn direction="left">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-1 rounded-full bg-accent" aria-hidden />
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  О жилом комплексе
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} direction="left">
              <p className="text-muted-foreground leading-relaxed">
                ЖК &laquo;Крепость&raquo; — современный многоквартирный жилой
                дом в квартале 65 города Якутска на 91 квартиру. Проект сочетает
                выразительную архитектуру, продуманные планировки и
                функциональную инфраструктуру: встроенную автостоянку,
                коммерческие помещения на нижних этажах и благоустроенную
                дворовую территорию.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} direction="left">
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {FEATURES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="right">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
              <Image
                src="/about-house.png"
                alt="ЖК Крепость — визуализация фасада"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
