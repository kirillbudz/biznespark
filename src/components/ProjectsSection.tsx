"use client";

import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";

const PROJECTS = [
  {
    title: "ЖК Крепость",
    description:
      "Современный 16-этажный жилой дом с тёплой автостоянкой и коммерческими помещениями в квартале 65 Якутска.",
    status: "строится",
    href: "/projects/krepost",
    statusVariant: "active" as const,
    image: "/about-house.png",
  },
  {
    title: "ЖК Гастелло",
    description:
      "Жилой комплекс комфорт-класса с развитой инфраструктурой, детской площадкой и стилобатом.",
    status: "реализован",
    href: "/projects/gastello",
    statusVariant: "completed" as const,
    image: "/gastello/tild3037-6135-4435-b266-633635373737__3.jpg",
  },
] as const;

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-16 md:py-24"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Портфолио
            </p>
            <h2
              id="projects-title"
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Наши проекты
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Текущие и реализованные жилые комплексы компании
              &laquo;{company.companyName}&raquo;
            </p>
          </div>
        </FadeIn>

        <StaggerChildren
          staggerDelay={0.15}
          className="mt-12 grid gap-8 sm:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.href}>
              <Link
                href={project.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-accent/5"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    aria-hidden
                  />
                  {/* Status badge */}
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md ${
                      project.statusVariant === "active"
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                    Подробнее
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
