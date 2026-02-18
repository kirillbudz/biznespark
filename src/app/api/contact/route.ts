import { NextRequest, NextResponse } from "next/server";

const MAX_NAME = 200;
const MAX_PHONE = 30;
const MAX_MESSAGE = 2000;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректное тело запроса" },
      { status: 400 }
    );
  }

  const {
    name,
    phone,
    message,
    "cf-turnstile-response": turnstileToken,
  } = (body as Record<string, unknown>) ?? {};

  const n = typeof name === "string" ? name.trim() : "";
  const p = typeof phone === "string" ? phone.trim() : "";
  const m = typeof message === "string" ? message.trim() : "";
  const token = typeof turnstileToken === "string" ? turnstileToken.trim() : "";

  if (!n || !p) {
    return NextResponse.json(
      { error: "Заполните имя и телефон" },
      { status: 400 }
    );
  }

  if (n.length > MAX_NAME || p.length > MAX_PHONE || m.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: "Превышена допустимая длина поля" },
      { status: 400 }
    );
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (secretKey) {
    if (!token) {
      return NextResponse.json(
        { error: "Пройдите проверку безопасности" },
        { status: 400 }
      );
    }
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: secretKey, response: token }),
      }
    );
    const verifyData = (await verifyRes.json()) as { success?: boolean };
    if (!verifyRes.ok || !verifyData.success) {
      return NextResponse.json(
        { error: "Проверка не пройдена. Попробуйте ещё раз." },
        { status: 400 }
      );
    }
  }

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramToken && chatId) {
    const text = [
      "Новая заявка с сайта Группа компаний «Бизнеспарк»",
      "",
      `Имя: ${n}`,
      `Телефон: ${p}`,
      m ? `Сообщение: ${m}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        }
      );
      if (!res.ok) {
        console.error("Telegram API error:", await res.text());
        return NextResponse.json(
          { error: "Ошибка отправки. Попробуйте позже." },
          { status: 500 }
        );
      }
    } catch (e) {
      console.error("Telegram send error:", e);
      return NextResponse.json(
        { error: "Ошибка отправки. Попробуйте позже." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
