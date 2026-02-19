"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations";

export function ChooseApartmentSection() {
  return (
    <section id="choose" className="py-16 md:py-24 bg-section-alt-bg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-1 rounded-full bg-accent" aria-hidden />
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Подобрать квартиру
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Выберите планировку, этаж и стоимость в виджете подбора — кнопка в
            правом нижнем углу экрана. Или оставьте заявку, и мы подберём
            вариант для вас.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Оставить заявку
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
