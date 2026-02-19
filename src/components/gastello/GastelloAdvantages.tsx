"use client";

import Image from "next/image";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const ADVANTAGES = [
  { title: "Перспективная локация", icon: "/gastello/location.webp", isSvg: false },
  { title: "Хорошая инфраструктура", icon: "/gastello/infrosructura.svg", isSvg: true },
  { title: "Вид на зелёный луг", icon: "/gastello/vid.svg", isSvg: true },
  { title: "Теплый паркинг", icon: "/gastello/parking.svg", isSvg: true },
  { title: "Экологичные материалы", icon: "/gastello/materiali.svg", isSvg: true },
  { title: "Автономное отопление", icon: "/gastello/otoplenie.jpg", isSvg: false },
  { title: "Колясочная", icon: "/gastello/kolaski.jpg", isSvg: false },
  { title: "Детская площадка в доме", icon: "/gastello/dp.jpg", isSvg: false },
] as const;

export function GastelloAdvantages() {
  return (
    <section
      id="advantages"
      className="py-16 md:py-24 bg-section-alt-bg"
      aria-labelledby="gastello-advantages-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Всё для комфорта
            </p>
            <h2
              id="gastello-advantages-title"
              className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Преимущества проекта
            </h2>
          </div>
        </FadeIn>

        <StaggerChildren
          staggerDelay={0.08}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ADVANTAGES.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group relative flex flex-col items-center overflow-hidden rounded-xl glass p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 hover:border-border">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/80 via-accent to-accent/80" aria-hidden />
                <div className="relative h-[70px] w-[70px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.icon}
                    alt=""
                    width={70}
                    height={70}
                    unoptimized={item.isSvg}
                    className="h-[70px] w-[70px] object-contain"
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium text-foreground">
                  {item.title}
                </h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
