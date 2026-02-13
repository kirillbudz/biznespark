import Image from "next/image";

const GALLERY_ITEMS = [
  { src: "/gallery/facade-night.jpg", alt: "ЖК Крепость, фасад в тёмное время суток" },
  { src: "/gallery/facade-day.jpg", alt: "ЖК Крепость, фасад днём" },
  { src: "/gallery/facade-street.jpg", alt: "ЖК Крепость, вид с улицы" },
  { src: "/gallery/yard.jpg", alt: "Благоустроенный двор ЖК Крепость" },
  { src: "/gallery/playground.jpg", alt: "Детская площадка на территории ЖК Крепость" },
] as const;

export function GallerySection() {
  return (
    <section id="gallery" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Визуализации
        </h2>
        <p className="mt-4 text-muted-foreground">
          Фасады и благоустройство ЖК «Крепость»
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6" aria-label="Галерея визуализаций">
          {GALLERY_ITEMS.map(({ src, alt }) => (
            <li key={src}>
              <figure className="overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
