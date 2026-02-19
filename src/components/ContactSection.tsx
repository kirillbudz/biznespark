"use client";

import { ContactForm } from "@/components/ContactForm";
import { ContactInfoBlock } from "@/components/ContactInfoBlock";
import { FadeIn } from "@/components/animations";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-[oklch(0.15_0.04_250)] to-background"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <FadeIn direction="left">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-1 rounded-full bg-accent" aria-hidden />
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Оставить заявку
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Оставьте контакты — мы перезвоним и поможем подобрать квартиру
                или ответим на вопросы.
              </p>

              <ContactInfoBlock />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="right">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="mt-0">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
