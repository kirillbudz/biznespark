"use client";

import Image from "next/image";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const GALLERY_ITEMS = [
  {
    src: "/gallery/facade-night.png",
    alt: "ЖК Крепость, фасад в тёмное время суток",
  },
  { src: "/gallery/facade-day.png", alt: "ЖК Крепость, фасад днём" },
  { src: "/gallery/facade-street.png", alt: "ЖК Крепость, вид с улицы" },
  {
    src: "/gallery/playground.png",
    alt: "Детская площадка на территории ЖК Крепость",
  },
] as const;

export function GallerySection() {
  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-10 w-1 rounded-full bg-accent" aria-hidden />
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Визуализации
            </h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Фасады и благоустройство ЖК &laquo;Крепость&raquo;
          </p>
        </FadeIn>

        <StaggerChildren
          staggerDelay={0.1}
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
        >
          {GALLERY_ITEMS.map(({ src, alt }) => (
            <StaggerItem key={src}>
              <figure className="group overflow-hidden rounded-xl border border-border">
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </figure>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
