"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SLIDES = [
  { src: "/gastello/tild3366-3164-4531-a334-303065373063__22.jpg", alt: "Новостройки в Якутске" },
  { src: "/gastello/tild3739-6261-4361-b661-323231313962__111.jpg", alt: "ЖК Гастелло" },
  { src: "/gastello/tild3264-6131-4265-b662-306161666637__1.jpg", alt: "Якутск" },
];

export function GastelloGallery() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  return (
    <section
      id="gallery"
      className="relative min-h-[60vh] w-full overflow-hidden"
      aria-labelledby="gastello-gallery-title"
    >
      <div className="absolute inset-0">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          className="object-cover transition-all duration-700"
          priority={index === 0}
        />
      </div>
      <div className="absolute inset-0 bg-[var(--overlay-mid)]" aria-hidden />

      <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
        <h2 id="gastello-gallery-title" className="sr-only">
          Галерея ЖК Гастелло
        </h2>

        <Link
          href="#contacts"
          className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Купить квартиру
        </Link>

        <div className="mt-10 flex gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => (i === 0 ? SLIDES.length - 1 : i - 1))}
            className="rounded-full bg-secondary p-2.5 text-foreground backdrop-blur-sm border border-border transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Предыдущий слайд"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i === SLIDES.length - 1 ? 0 : i + 1))}
            className="rounded-full bg-secondary p-2.5 text-foreground backdrop-blur-sm border border-border transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Следующий слайд"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex gap-2" role="tablist" aria-label="Слайды">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index
                  ? "bg-accent"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
