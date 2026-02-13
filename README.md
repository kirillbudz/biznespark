# Biznespark — сайт ЖК «Крепость»

Маркетинговый сайт застройщика и лендинг жилого комплекса «Крепость» (квартал 65, Якутск). Корпоративная информация, описание ЖК, галерея визуализаций и интерактивный подбор квартир через виджет Profitbase.

## Технологии

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4**
- **shadcn/ui** (компоненты: Button, утилита `cn`)
- Без CMS, без БД, без админки

## Структура проекта

- `src/app/` — страницы и layout (App Router)
- `src/components/` — переиспользуемые компоненты (Hero, AboutSection, ChooseApartmentSection, GallerySection, ProfitbaseFloatingWidget)
- `src/components/ui/` — UI-компоненты (shadcn)
- `src/lib/` — утилиты (`cn`)
- `public/` — статика (изображения, видео, галерея)

## Запуск

```bash
npm install
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

## Переменные окружения

Создай `.env.local` в корне. Для виджета Profitbase нужны ключи с префиксом `NEXT_PUBLIC_PB_*`. Локально виджет может возвращать 401/403, если в кабинете Profitbase не добавлен localhost; на проде укажи домен в настройках доступа.

## Деплой

Проект готов к деплою на Vercel, Netlify или любой хостинг с поддержкой Next.js.

## Лицензия

Private.
