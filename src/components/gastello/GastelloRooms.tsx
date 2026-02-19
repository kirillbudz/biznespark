"use client";

import { FadeIn } from "@/components/animations";

export function GastelloRooms() {
  return (
    <section
      id="rooms"
      className="py-16 md:py-24 bg-section-alt-bg"
      aria-labelledby="gastello-rooms-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Планировки
            </p>
            <h2
              id="gastello-rooms-title"
              className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Планировка квартир
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Несколько типов планировок для разных потребностей — максимальный
              комфорт в каждой квартире.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
