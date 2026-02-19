"use client";

import { ContactForm } from "@/components/ContactForm";
import { ContactInfoBlock } from "@/components/ContactInfoBlock";
import { FadeIn } from "@/components/animations";

export function HomeContactsSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-card to-background"
      aria-labelledby="contacts-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <FadeIn direction="left">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
                Свяжитесь с нами
              </p>
              <h2
                id="contacts-title"
                className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Контакты
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ответим на вопросы о покупке квартир, условиях сотрудничества
                или подберём подходящий вариант.
              </p>

              <ContactInfoBlock />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="right">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                Оставить заявку
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Оставьте контакты — мы перезвоним и ответим на вопросы.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
