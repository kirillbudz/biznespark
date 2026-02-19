import { NextRequest, NextResponse } from "next/server";

/* ---------- Profitbase payload types ---------- */
interface ProfitbaseProperty {
  id?: number;
  number?: number;
  rooms_amount?: number;
  price?: number;
  area?: number;
  house?: string;
  house_id?: number;
}

interface ProfitbaseCustomer {
  name?: string;
  phone?: string;
  email?: string;
}

interface ProfitbasePayload {
  source?: string;
  property?: ProfitbaseProperty;
  customer?: ProfitbaseCustomer;
  comment?: string;
  tracking?: Record<string, string>;
}

/* ---------- Telegram helpers ---------- */
function escapeTelegram(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU");
}

function buildTelegramMessage(data: ProfitbasePayload): string {
  const lines: string[] = [
    "<b>Новая заявка из Profitbase</b>",
    "",
  ];

  const c = data.customer;
  if (c) {
    if (c.name) lines.push(`Клиент: ${escapeTelegram(c.name)}`);
    if (c.phone) lines.push(`Телефон: ${escapeTelegram(c.phone)}`);
    if (c.email) lines.push(`Email: ${escapeTelegram(c.email)}`);
  }

  if (data.comment) {
    lines.push(`Комментарий: ${escapeTelegram(data.comment)}`);
  }

  const p = data.property;
  if (p) {
    lines.push("");
    if (p.house) lines.push(`Объект: ${escapeTelegram(p.house)}`);

    const details: string[] = [];
    if (p.number != null) details.push(`кв. №${p.number}`);
    if (p.rooms_amount != null) details.push(`${p.rooms_amount}-комн.`);
    if (p.area != null) details.push(`${p.area} м²`);
    if (details.length) lines.push(details.join(", "));

    if (p.price != null) lines.push(`Цена: ${formatPrice(p.price)} ₽`);
  }

  if (data.source) {
    lines.push("");
    lines.push(`Источник: ${escapeTelegram(data.source)}`);
  }

  return lines.join("\n");
}

async function sendToTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const chatIds = chatId.split(",").map((id) => id.trim()).filter(Boolean);

  const results = await Promise.allSettled(
    chatIds.map((cid) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: cid, text, parse_mode: "HTML" }),
      })
    )
  );

  for (const r of results) {
    if (r.status === "rejected") {
      console.error("Telegram send error:", r.reason);
    } else if (!r.value.ok) {
      console.error("Telegram API error:", r.value.status, await r.value.text());
    }
  }

  return results.some((r) => r.status === "fulfilled" && r.value.ok);
}

/* ---------- Handler ---------- */
export async function POST(request: NextRequest) {
  const secret = process.env.PROFITBASE_WEBHOOK_SECRET;
  if (secret) {
    const provided = request.nextUrl.searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: ProfitbasePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const text = buildTelegramMessage(body);
  const sent = await sendToTelegram(text);

  if (!sent) {
    console.error("Profitbase webhook: failed to send Telegram message");
    return NextResponse.json(
      { error: "Delivery failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
