"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animations";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Room {
  name: string;
  area: string;
}

interface Layout {
  id: string;
  totalArea: string;
  livingArea: string;
  rooms: number;
  image: string;
  roomList: Room[];
}

const LAYOUTS_48: Layout[] = [
  {
    id: "48-34",
    totalArea: "48.34",
    livingArea: "26.94",
    rooms: 2,
    image: "/krepost/layout-48-34.png",
    roomList: [
      { name: "Общая комната", area: "16.49" },
      { name: "Спальня", area: "10.45" },
      { name: "Кухня-ниша", area: "9.51" },
      { name: "Санузел", area: "3.84" },
      { name: "Балкон", area: "6.39" },
      { name: "Прихожая", area: "1.66" },
    ],
  },
];

const LAYOUTS_65: Layout[] = [
  {
    id: "65-84a",
    totalArea: "65.84",
    livingArea: "36.72",
    rooms: 2,
    image: "/krepost/layout-65-84a.png",
    roomList: [
      { name: "Общая комната", area: "—" },
      { name: "Спальня", area: "14.65" },
      { name: "Кухня-ниша", area: "8.77" },
      { name: "Коридор", area: "14.32" },
      { name: "Санузел", area: "3.10" },
      { name: "Туалет", area: "1.51" },
      { name: "Балкон", area: "1.43" },
    ],
  },
  {
    id: "65-84b",
    totalArea: "65.84",
    livingArea: "35.56",
    rooms: 2,
    image: "/krepost/layout-65-84b.png",
    roomList: [
      { name: "Спальня", area: "17.92" },
      { name: "Общая комната", area: "17.64" },
      { name: "Кухня", area: "11.54" },
      { name: "Коридор", area: "12.57" },
      { name: "Санузел", area: "3.06" },
      { name: "Туалет", area: "1.34" },
      { name: "Балкон", area: "1.77" },
    ],
  },
  {
    id: "65-95",
    totalArea: "65.95",
    livingArea: "35.13",
    rooms: 2,
    image: "/krepost/layout-65-95.png",
    roomList: [
      { name: "Общая комната", area: "20.45" },
      { name: "Спальня", area: "14.68" },
      { name: "Кухня-ниша", area: "12.31" },
      { name: "Санузел", area: "3.45" },
      { name: "Туалет", area: "1.51" },
      { name: "Балкон", area: "1.53" },
    ],
  },
  {
    id: "65-99",
    totalArea: "65.99",
    livingArea: "40.22",
    rooms: 2,
    image: "/krepost/layout-65-99.png",
    roomList: [
      { name: "Общая комната", area: "23.28" },
      { name: "Спальня", area: "16.94" },
      { name: "Кухня", area: "11.00" },
      { name: "Коридор", area: "9.17" },
      { name: "Ванная", area: "2.92" },
      { name: "Туалет", area: "1.43" },
      { name: "Балкон", area: "1.25" },
    ],
  },
  {
    id: "66-13",
    totalArea: "66.13",
    livingArea: "38.93",
    rooms: 2,
    image: "/krepost/layout-66-13.png",
    roomList: [
      { name: "Общая комната", area: "20.57" },
      { name: "Спальня", area: "18.36" },
      { name: "Кухня-ниша", area: "12.26" },
      { name: "Санузел", area: "3.25" },
      { name: "Туалет", area: "1.43" },
      { name: "Балкон", area: "1.53" },
    ],
  },
  {
    id: "66-21",
    totalArea: "66.21",
    livingArea: "33.21",
    rooms: 2,
    image: "/krepost/layout-66-21.png",
    roomList: [
      { name: "Спальня", area: "17.11" },
      { name: "Общая комната", area: "16.10" },
      { name: "Коридор", area: "14.81" },
      { name: "Кухня", area: "11.73" },
      { name: "Санузел", area: "3.26" },
      { name: "Туалет", area: "1.43" },
      { name: "Балкон", area: "1.77" },
    ],
  },
];

const ALL_LAYOUTS: Layout[] = [...LAYOUTS_48, ...LAYOUTS_65];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function KrepostLayoutsSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const layouts = ALL_LAYOUTS;
  const current = layouts[slideIndex];

  function prev() {
    setSlideIndex((i) => (i === 0 ? layouts.length - 1 : i - 1));
  }

  function next() {
    setSlideIndex((i) => (i === layouts.length - 1 ? 0 : i + 1));
  }

  return (
    <section
      id="layouts"
      className="py-16 md:py-24 bg-section-alt-bg"
      aria-labelledby="layouts-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Варианты квартир
            </p>
            <h2
              id="layouts-title"
              className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Планировки квартир
            </h2>
          </div>
        </FadeIn>

        {/* Free layout banner */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-accent/20 bg-accent/5 px-6 py-4 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Все квартиры в ЖК &laquo;Крепость&raquo; сдаются со{" "}
              <span className="font-semibold text-accent">
                свободной планировкой
              </span>{" "}
              — вы сами решаете, как организовать пространство.
              Представленные варианты — лишь один из возможных сценариев,
              а окончательный проект зависит только от вашего вкуса и образа
              жизни.
            </p>
          </div>
        </FadeIn>

        {/* Slider + Description */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12 items-start">
            {/* Image */}
            <div className="relative">
              <div className="glass overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] bg-muted/30">
                  <Image
                    key={current.id}
                    src={current.image}
                    alt={`Планировка ${current.totalArea} м², ${current.rooms}-комнатная`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>

              {/* Navigation */}
              {layouts.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-full bg-secondary p-2.5 text-foreground border border-border transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
                    aria-label="Предыдущая планировка"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="flex gap-2" role="tablist" aria-label="Планировки">
                    {layouts.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === slideIndex}
                        onClick={() => setSlideIndex(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          i === slideIndex
                            ? "bg-accent scale-110"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Планировка ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full bg-secondary p-2.5 text-foreground border border-border transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
                    aria-label="Следующая планировка"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Description card */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-foreground">
                  {current.totalArea}
                </span>
                <span className="text-lg text-muted-foreground">м²</span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{current.rooms}-комнатная</span>
                <span>Жилая: {current.livingArea} м²</span>
              </div>

              <div className="my-5 h-px bg-border" />

              <h3 className="text-sm font-medium uppercase tracking-wider text-accent mb-4">
                Помещения
              </h3>

              <ul className="space-y-2.5">
                {current.roomList.map((room) => (
                  <li
                    key={room.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{room.name}</span>
                    <span className="text-foreground font-medium">
                      {room.area} м²
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-5 h-px bg-border" />

              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-foreground">Общая площадь</span>
                <span className="text-accent">{current.totalArea} м²</span>
              </div>

              {layouts.length > 1 && (
                <p className="mt-4 text-xs text-muted-foreground/60">
                  Вариант {slideIndex + 1} из {layouts.length}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
