# Content Integrator — примеры

Готовые фрагменты для копирования и адаптации.

---

## 1. ProfitbaseWidget (скрипт)

```tsx
// src/components/ProfitbaseWidget.tsx
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

## 2. ProfitbaseWidget (iframe)

```tsx
// src/components/ProfitbaseWidget.tsx
const IFRAME_URL = process.env.NEXT_PUBLIC_PROFITBASE_IFRAME_URL ?? "";

export function ProfitbaseWidget() {
  if (!IFRAME_URL) return null;
  return (
    <iframe
      src={IFRAME_URL}
      title="Каталог квартир"
      className="w-full min-h-[500px] border-0"
      loading="lazy"
    />
  );
}
```

---

## 3. Route handler контактной формы (POST → Telegram)

```ts
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

const MAX_MESSAGE_LENGTH = 2000;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат запроса" }, { status: 400 });
  }

  const { name, email, message } = (body as Record<string, unknown>) ?? {};
  const n = String(name ?? "").trim();
  const e = String(email ?? "").trim();
  const m = String(message ?? "").trim();

  if (!n || !e || !m) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }
  if (m.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Сообщение слишком длинное" }, { status: 400 });
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramToken && chatId) {
    const text = `Новая заявка с сайта\nИмя: ${n}\nEmail: ${e}\nСообщение: ${m}`;
    const res = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Ошибка отправки" }, { status: 502 });
    }
  }

  return NextResponse.json({ success: true });
}
```

---

## 4. .env.example

```env
# Profitbase (виджет) — URL скрипта или iframe (доступны в браузере)
NEXT_PUBLIC_PROFITBASE_SCRIPT_URL=
# или
NEXT_PUBLIC_PROFITBASE_IFRAME_URL=

# Telegram (контактная форма) — только на сервере, не в клиенте
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Опционально: email для заявок (если используете Resend/Nodemailer и т.п.)
# CONTACT_EMAIL=
# RESEND_API_KEY=
```

Файл `.env.example` положить в корень репозитория. Реальные значения — только в `.env.local`, не коммитить.
