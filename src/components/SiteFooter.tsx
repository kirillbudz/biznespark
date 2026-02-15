import Link from "next/link";
import { Divider, Text } from "@/components/catalyst";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              ЖК «Крепость»
            </p>
            <Text className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Якутск, квартал 65
            </Text>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Контакты
            </p>
            <Text className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              <a href="tel:+74112345678" className="hover:underline">
                +7 (4112) 34-56-78
              </a>
            </Text>
            <Text className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              <a href="mailto:info@zk-krepost.ru" className="hover:underline">
                info@zk-krepost.ru
              </a>
            </Text>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Разделы
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/#about" className="hover:underline">
                  О жилом комплексе
                </Link>
              </li>
              <li>
                <Link href="/#choose" className="hover:underline">
                  Подобрать квартиру
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:underline">
                  Визуализации
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:underline">
                  Оставить заявку
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Юридическая информация
            </p>
            <Text className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Оферта и политика конфиденциальности доступны по запросу. Проектная декларация на сайте застройщика.
            </Text>
          </div>
        </div>
        <Divider soft className="my-8" />
        <Text className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} ЖК «Крепость». Все права защищены.
        </Text>
      </div>
    </footer>
  );
}
