import Image from "next/image";
import { Heading, Text } from "@/components/catalyst";

const FEATURES = [
  "16 этажей",
  "91 квартира",
  "встроенная автостоянка",
  "коммерческие помещения",
  "благоустроенный двор",
  "современный фасад",
] as const;

export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div>
            <Heading level={2} className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              О жилом комплексе
            </Heading>
            <Text className="mt-4 text-zinc-600 leading-relaxed">
              ЖК «Крепость» — современный многоквартирный жилой дом в квартале 65
              города Якутска на 91 квартиру. Проект сочетает выразительную
              архитектуру, продуманные планировки и функциональную
              инфраструктуру: встроенную автостоянку, коммерческие помещения на
              нижних этажах и благоустроенную дворовую территорию. Дом ориентирован
              на комфортное проживание и современную городскую среду.
            </Text>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-zinc-600">
              {FEATURES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-xl aspect-[4/3] lg:aspect-auto lg:min-h-[320px]">
            <Image
              src="/about-house.png"
              alt="ЖК Крепость — визуализация фасада"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
