import { NextRequest, NextResponse } from "next/server";

const MAX_NAME = 200;
const MAX_PHONE = 30;
const MAX_MESSAGE = 2000;

const PHONE_RE = /^[+\d][\d\s()./-]{4,}$/;

/* ---------- Rate limiter (in-memory, per IP) ---------- */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_MAX) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

// Periodic cleanup so the Map doesn't grow indefinitely
if (typeof globalThis !== "undefined") {
  const CLEANUP_INTERVAL = 5 * 60_000;
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of hits) {
      const fresh = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
      if (fresh.length === 0) hits.delete(ip);
      else hits.set(ip, fresh);
    }
  }, CLEANUP_INTERVAL);
  timer.unref?.();
}

/* ---------- Telegram text escaping ---------- */
function escapeTelegram(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- Handler ---------- */
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Подождите минуту." },
      { status: 429 }
    );
  }

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

  if (!PHONE_RE.test(p)) {
    return NextResponse.json(
      { error: "Введите корректный номер телефона" },
      { status: 400 }
    );
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (secretKey) {
    if (!token) {
      return NextResponse.json(
        { error: "Пройдите проверку безопасности." },
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
      `Имя: ${escapeTelegram(n)}`,
      `Телефон: ${escapeTelegram(p)}`,
      m ? `Сообщение: ${escapeTelegram(m)}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const chatIds = chatId.split(",").map((id) => id.trim()).filter(Boolean);

    try {
      const results = await Promise.allSettled(
        chatIds.map((cid) =>
          fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: cid, text }),
          })
        )
      );

      const allFailed = results.every(
        (r) => r.status === "rejected" || !r.value.ok
      );
      if (allFailed) {
        return NextResponse.json(
          { error: "Ошибка отправки. Попробуйте позже." },
          { status: 500 }
        );
      }

      for (const r of results) {
        if (r.status === "rejected") {
          console.error("Telegram send error:", r.reason);
        } else if (!r.value.ok) {
          console.error("Telegram API error:", await r.value.text());
        }
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
