"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const ADVANTAGES = [
  {
    title: "Опыт",
    description:
      "Многолетняя экспертиза в жилищном строительстве Якутска. Знаем особенности местного рынка и требования жителей.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Качество",
    description:
      "Строгий контроль на каждом этапе: от фундамента до отделки. Надёжные материалы и проверенные технологии.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Комплексный подход",
    description:
      "Развиваем территории целиком: жильё, благоустройство, коммерция и социальная инфраструктура в единой среде.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Комфорт",
    description:
      "Энергоэффективные конструкции и продуманные планировки, адаптированные к суровому климату Якутии.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    ),
  },
] as const;

export function AdvantagesSection() {
  return (
    <section
      id="advantages"
      className="py-16 md:py-24 bg-[oklch(0.11_0.025_250)]"
      aria-labelledby="advantages-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Почему мы
            </p>
            <h2
              id="advantages-title"
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Преимущества застройщика
            </h2>
          </div>
        </FadeIn>

        <StaggerChildren
          staggerDelay={0.1}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ADVANTAGES.map((item) => (
            <StaggerItem key={item.title} className="flex">
              <div className="group relative flex w-full flex-col overflow-hidden rounded-xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 hover:border-white/20">
                {/* Gold accent line at top */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/80 via-accent to-accent/80" aria-hidden />

                <div className="mb-4 inline-flex shrink-0 rounded-lg bg-accent/10 p-2.5 text-accent">
                  {item.icon}
                </div>
                <h3 className="shrink-0 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 min-h-0 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
