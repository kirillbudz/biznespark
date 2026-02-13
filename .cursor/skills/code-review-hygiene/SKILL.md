---
name: code-review-hygiene
description: Reviews code for project rules: unnecessary client components, metadata, a11y, links, next/image, folder structure, TypeScript types, and no hardcoded secrets. Use when the user asks to check, review, improve code, or before deploy ("проверь", "ревью", "что улучшить", "перед деплоем").
triggers:
  - ревью
  - проверь
  - что улучшить
  - review
---

# Code Review & Hygiene

Проверка по правилам проекта ([.cursor/rules.md](../../rules.md)). Использовать чек-лист ниже и давать конкретные правки.

## Чек-лист ревью

Пройти по пунктам и отметить нарушения.

### Client components

- [ ] `"use client"` только там, где нужна интерактивность или браузерные API.
- [ ] Нет лишних client-компонентов; тяжёлые части вынесены в client, остальное — server.

### Метаданные и SEO

- [ ] У каждой страницы есть `metadata` или `generateMetadata` (title, description).
- [ ] В корневом layout задан `lang="ru"` в `<html>`.

### Доступность (a11y)

- [ ] Семантические теги: `main`, `section`, заголовки по иерархии.
- [ ] У всех изображений осмысленный `alt` (или `alt=""` для декоративных).
- [ ] У интерактивных элементов видимый фокус (focus state).

### Ссылки и изображения

- [ ] Внутренняя навигация через **next/link**.
- [ ] Внешние ссылки: `target="_blank"` и `rel="noopener noreferrer"`.
- [ ] Все изображения через **next/image** с `width`/`height` (или `fill`) и `alt`.

### Стили и структура

- [ ] Только Tailwind, без inline-стилей (кроме обоснованных исключений).
- [ ] Логичная структура папок: страницы в `src/app/`, компоненты в `src/components/`.

### TypeScript

- [ ] Строгие типы: типы для пропсов и ответов API, без лишних `any`.
- [ ] Импорт типов через `import type` где уместно.

### Секреты и env

- [ ] Нет хардкода токенов, ключей API, паролей.
- [ ] Секреты только в `process.env.*`, примеры — в `.env.example`.

### Формы и внешние виджеты

- [ ] Profitbase подключается через next/script или iframe, URL из env.
- [ ] Отправка формы идёт в route handler; ключи (Telegram, email) из env.

## Формат обратной связи

- **Критично**: нужно исправить перед деплоем (например, секрет в коде, отсутствие metadata).
- **Рекомендация**: желательно исправить (лишний "use client", неверные ссылки/alt).
- **Заметка**: мелкие улучшения (типы, структура папок).

Указывать файл и при необходимости фрагмент кода; предлагать конкретную правку.
