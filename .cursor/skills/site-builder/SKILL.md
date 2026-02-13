---
name: site-builder
description: Generates and edits Next.js marketing pages, sections, layout, and components with Tailwind, SEO metadata, a11y, and next/image. Use when the user asks to generate or build a page, section, landing, or component (e.g. "сгенерируй страницу", "собери секцию", "лендинг", "компонент").
triggers:
  - страница
  - секция
  - компонент
  - лендинг
  - layout
  - hero
---

# Site Builder (Next Marketing Site)

Базовые правила проекта — см. [.cursor/rules.md](../../rules.md). Ниже — пошаговые рецепты.

## Страницы и структура

- **App Router**: страницы в `src/app/`; маршрут = папка с `page.tsx`.
- **Layout**: общий `layout.tsx` в `src/app/` (шрифты, оболочка). Вложенные layout — при необходимости (например, `src/app/zhk/layout.tsx`).
- **Компоненты**: переиспользуемые в `src/components/` (например, `Section.tsx`, `Hero.tsx`). Именовать по смыслу, не по дизайну.

## Компоненты и Server/Client

- По умолчанию **Server Component** (без `"use client"`).
- Добавлять `"use client"` только если нужны: `useState`, `onClick`, `useEffect`, браузерные API, интерактив.
- Тяжёлые или интерактивные блоки выносить в отдельные client-компоненты, остальную страницу оставлять серверной.

## Стили

- Только **Tailwind**. Классы в `className`; без inline-стилей и глобальных классов вне `globals.css`.
- Отступы и сетка: единая шкала (например, `gap-6`, `py-12`, `max-w-7xl mx-auto`).
- Русский интерфейс: осмысленные тексты, без lorem ipsum.

## Изображения

- Всегда **next/image**: `import Image from "next/image"`.
- Файлы в `public/`, путь вида `src="/hero.jpg"`.
- Указывать `width` и `height` (или `fill` при необходимости). Для важного контента выше сгиба — `priority`.
- **alt** обязателен, осмысленный текст на русском.

## Ссылки

- Внутренняя навигация: **next/link** — `<Link href="/zhk">ЖК</Link>`.
- Внешние ссылки: `target="_blank"` и `rel="noopener noreferrer"`.

## SEO и метаданные

- Для каждой страницы экспортировать **metadata** (или `generateMetadata` при динамике):

```ts
// src/app/zhk/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ЖК Название | Застройщик",
  description: "Краткое описание ЖК для поисковиков.",
  openGraph: {
    title: "ЖК Название",
    description: "…",
  },
};

export default function ZhkPage() { … }
```

- Корневой `layout.tsx`: `lang="ru"` в `<html>`.

## Доступность (a11y)

- Семантика: `main`, `section`, `article`, `nav`, заголовки по иерархии (`h1` → `h2` → …).
- У интерактивных элементов — видимый фокус (Tailwind: `focus:ring-2 focus:ring-offset-2` и т.п.).
- Все изображения — с осмысленным `alt`; декоративные — `alt=""` или `role="presentation"` при необходимости.

## Шаблон секции

```tsx
// Server Component
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-12 md:py-16" aria-labelledby="section-title">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 id="section-title" className="text-2xl font-semibold mb-6">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
```

## Ошибки и 404

- Добавить `src/app/not-found.tsx` для 404. Error boundary — только при явной необходимости.
