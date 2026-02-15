import { Heading, Text } from "@/components/catalyst";
import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          level={2}
          className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Оставить заявку
        </Heading>
        <Text className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
          Оставьте контакты — мы перезвоним и поможем подобрать квартиру или
          ответим на вопросы.
        </Text>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
