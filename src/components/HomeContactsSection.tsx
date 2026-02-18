"use client";

import { company } from "@/content/company";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/animations";

export function HomeContactsSection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-[oklch(0.15_0.04_250)] to-background"
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
                className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Контакты
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ответим на вопросы о покупке квартир, условиях сотрудничества
                или подберём подходящий вариант.
              </p>

              <dl className="mt-8 space-y-5">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Адрес
                  </dt>
                  <dd className="mt-1 text-white">{company.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Телефон
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${company.phoneHref}`}
                      className="text-white transition-colors hover:text-accent"
                    >
                      {company.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${company.email}`}
                      className="text-white transition-colors hover:text-accent"
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Режим работы
                  </dt>
                  <dd className="mt-1 text-white">{company.workHours}</dd>
                </div>
              </dl>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="right">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white">
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
