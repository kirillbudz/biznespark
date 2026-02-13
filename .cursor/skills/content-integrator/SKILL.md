---
name: content-integrator
description: Embeds Profitbase widget (iframe/script via next/script) and implements contact form with email/Telegram, env vars, and security. Use when the user mentions Profitbase, widget, form, contact form, submission, email, or telegram.
triggers:
  - profitbase
  - виджет
  - форма
  - заявка
  - telegram
  - email
---

# Content Integrator (Profitbase + Forms)

Базовые правила — [.cursor/rules.md](../../rules.md). Ниже — как правильно подключать виджет и формы. Полные примеры кода — [examples.md](examples.md).

## Profitbase: только встраивание

- Логику квартир/доступности **не реализовывать** — только встроить виджет (iframe или скрипт от Profitbase).
- Подключать через **next/script** для скриптов; iframe — в отдельном компоненте.

### Вариант: скрипт через next/script

```tsx
// src/components/ProfitbaseWidget.tsx — при необходимости "use client" только если скрипт что-то инициализирует по клику
import Script from "next/script";

const PROFITBASE_SCRIPT_URL = process.env.NEXT_PUBLIC_PROFITBASE_SCRIPT_URL ?? "";

export function ProfitbaseWidget() {
  if (!PROFITBASE_SCRIPT_URL) return null;
  return (
    <>
      <Script
        src={PROFITBASE_SCRIPT_URL}
        strategy="lazyOnload"
      />
      <div id="profitbase-container" className="min-h-[400px]" />
    </>
  );
}
```

- URL скрипта — из **env**: `NEXT_PUBLIC_PROFITBASE_SCRIPT_URL` в `.env.local`. В коде не хардкодить.

### Вариант: iframe

- URL iframe тоже из env (например `NEXT_PUBLIC_PROFITBASE_IFRAME_URL`).
- Обёртка с `next/script` не нужна; задать разумные `width`/`height` или стили (например, `min-height`), по возможности `title` для a11y.

## Контактная форма

- Отправка в **email** и/или **Telegram**. Данные не хранить.
- Секреты только в **переменных окружения** (`.env.local`), не в коде.

### Маршрут API (route handler)

- POST-обработчик в `src/app/api/contact/route.ts` (или `.../form/route.ts`).
- Читать ключи из `process.env` (например `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `CONTACT_EMAIL`).
- Валидировать тело запроса (поля, лимит длины). Отвечать 400 при невалидных данных, 200/201 при успехе.

Пример скелета:

```ts
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramToken && chatId) {
    const text = `Новая заявка\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`;
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  }

  return NextResponse.json({ success: true });
}
```

- Для email — использовать сервис (Resend, Nodemailer и т.д.) и ключи из env. Никогда не хардкодить токены и пароли.

### Форма на клиенте

- Форма может быть в Client Component (отправка через `fetch("/api/contact", { method: "POST", body: JSON.stringify(...) })`).
- Остальную страницу оставить Server Component; форму вынести в один клиентский компонент (например `ContactForm.tsx`).

## Переменные окружения

- В репозитории — только пример: `.env.example` с ключами без значений (например `TELEGRAM_BOT_TOKEN=`, `NEXT_PUBLIC_PROFITBASE_SCRIPT_URL=`).
- В коде обращаться к `process.env.*`; для доступа в браузере — только переменные с префиксом `NEXT_PUBLIC_`.

## Безопасность

- Секреты (токены, ключи API) — только в env, не в коде и не в клиентском бандле.
- В route handler не доверять данным без проверки: санитизация/ограничение длины, при необходимости rate limit по заданию.
