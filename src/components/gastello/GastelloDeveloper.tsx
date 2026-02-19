"use client";

import { company } from "@/content/company";
import { FadeIn } from "@/components/animations";

export function GastelloDeveloper() {
  return (
    <section
      className="py-16 md:py-24 bg-section-alt-bg"
      aria-labelledby="gastello-developer-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-1 rounded-full bg-accent" aria-hidden />
            <h2
              id="gastello-developer-title"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {company.legalName}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="max-w-3xl text-muted-foreground leading-relaxed">
            {company.aboutText}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
