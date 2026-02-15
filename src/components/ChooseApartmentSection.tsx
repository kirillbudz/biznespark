import { Button, Heading, Text } from "@/components/catalyst";

export function ChooseApartmentSection() {
  return (
    <section id="choose" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading level={2} className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Подобрать квартиру
        </Heading>
        <Text className="mt-4 max-w-2xl text-zinc-600">
          Выберите планировку, этаж и стоимость в виджете подбора — кнопка в правом нижнем углу экрана. Или оставьте заявку, и мы подберём вариант для вас.
        </Text>
        <div className="mt-6">
          <Button href="/#contact" color="zinc">
            Оставить заявку
          </Button>
        </div>
      </div>
    </section>
  );
}
