"use client";

import Link from "next/link";
import { advantages } from "@/content/cases";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const cardIcons = [
  <svg key="facade" className="size-6 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>,
  <svg key="area" className="size-6 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>,
  <svg key="layout" className="size-6 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
  </svg>,
];

export function CaseStudiesSection() {
  return (
    <section
      id="cases"
      className="py-16 md:py-24"
      aria-labelledby="cases-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Почему выбирают нас
            </p>
            <h2
              id="cases-title"
              className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Преимущества
            </h2>
          </div>
        </FadeIn>

        <StaggerChildren
          staggerDelay={0.15}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {advantages.map((item, i) => {
            const isCenter = i === 1;
            return (
            <StaggerItem key={item.id} className="flex">
              <div className={`group relative flex w-full flex-col overflow-hidden rounded-xl glass pt-8 pb-7 px-7 transition-all duration-300 hover:-translate-y-1 ${isCenter ? "md:-translate-y-2 shadow-md shadow-accent/8 border-accent/20 hover:shadow-xl hover:shadow-accent/10" : "hover:shadow-lg hover:shadow-accent/5"}`}>
                <div className={`absolute inset-x-0 top-0 bg-gradient-to-r from-accent/60 via-accent to-accent/60 ${isCenter ? "h-[3px]" : "h-[2px]"}`} aria-hidden="true" />

                <div className="absolute -right-6 -top-6 size-28 rounded-full bg-accent/[0.03] blur-2xl pointer-events-none" aria-hidden="true" />

                <span className="mb-4 inline-block self-start rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Преимущество
                </span>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {cardIcons[i]}
                  </div>
                  <h3 className={`text-base font-semibold leading-snug ${i === 0 ? "text-accent" : "text-foreground"}`}>
                    {item.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm font-normal leading-[1.7] text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
            );
          })}
        </StaggerChildren>

        <FadeIn delay={0.3}>
          <div className="mt-[40px] text-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-[0_0_20px_rgba(247,182,64,0.25)] transition-all hover:brightness-110 hover:shadow-[0_0_28px_rgba(247,182,64,0.35)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            >
              Подобрать квартиру
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
