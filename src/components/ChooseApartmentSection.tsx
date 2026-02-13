import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChooseApartmentSection() {
  return (
    <section id="choose" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Подобрать квартиру
        </h2>
        <p className="mt-4 text-muted-foreground">
          Ниже доступен интерактивный подбор квартир по планировкам и параметрам.
        </p>
        <Link
          href="#gallery"
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-6 inline-block")}
        >
          Смотреть визуализации
        </Link>
        {/* Сюда будет вставлен iframe или скрипт Profitbase */}
        <div
          className="mt-8 flex aspect-[4/3] items-center justify-center rounded-xl border border-border bg-muted/30 md:aspect-[16/10]"
          aria-label="Интерактивный подбор квартир"
        >
          <p className="px-4 text-center text-sm text-muted-foreground">
            Здесь будет интерактивный подбор квартир (виджет Profitbase)
          </p>
        </div>
      </div>
    </section>
  );
}
