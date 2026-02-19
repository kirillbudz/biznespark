"use client";

import Image from "next/image";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const ADVANTAGES = [
  { title: "Перспективная локация", icon: "/gastello/tild3861-3265-4238-b865-623565386165__vector.svg" },
  { title: "Хорошая инфраструктура", icon: "/gastello/tild3861-3265-4238-b865-623565386165__vector.svg" },
  { title: "Вид на зелёный луг", icon: "/gastello/tild3330-3931-4434-b463-656665393966__vector.svg" },
  { title: "Теплый паркинг", icon: "/gastello/tild6134-3732-4262-b731-643861376230__vector.svg" },
  { title: "Экологичные материалы", icon: "/gastello/tild3931-3134-4663-a136-346638396439__vector.svg" },
  { title: "Автономное отопление", icon: "/gastello/tild3931-3134-4663-a136-346638396439__vector.svg" },
  { title: "Колясочная", icon: "/gastello/tild3330-3931-4434-b463-656665393966__vector.svg" },
  { title: "Детская площадка в доме", icon: "/gastello/tild6134-3732-4262-b731-643861376230__vector.svg" },
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
                <div className="relative h-[70px] w-[70px] shrink-0">
                  <Image
                    src={item.icon}
                    alt=""
                    width={70}
                    height={70}
                    className="object-contain dark:brightness-0 dark:invert opacity-70"
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
