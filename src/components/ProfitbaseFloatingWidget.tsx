"use client";

import Script from "next/script";

declare global {
  interface Window {
    ProfitbaseWidget?: () => {
      init: (cfg: any) => void;
    };
    widget?: { init: (cfg: any) => void };
  }
}

function initProfitbase() {
  const host = process.env.NEXT_PUBLIC_PB_HOST;
  const pbDomain = process.env.NEXT_PUBLIC_PB_DOMAIN;
  const accountId = process.env.NEXT_PUBLIC_PB_ACCOUNT_ID;
  const referrer = process.env.NEXT_PUBLIC_PB_REFERRER;
  const pbApiKey = process.env.NEXT_PUBLIC_PB_API_KEY;

  if (!accountId || !pbApiKey) {
    console.warn(
      "[Profitbase] Не заданы NEXT_PUBLIC_PB_ACCOUNT_ID или NEXT_PUBLIC_PB_API_KEY. Проверьте .env.local и перезапустите dev-сервер (npm run dev)."
    );
    return;
  }

  if (!window.ProfitbaseWidget) {
    return;
  }

  try {
    if (!window.widget) window.widget = window.ProfitbaseWidget();
    // Передаём только строки — скрипт Profitbase вызывает .replace() и падает на undefined
    window.widget.init({
      params: {
        host: host ?? "",
        pbDomain: pbDomain ?? "",
        accountId: String(accountId),
        referrer: referrer ?? "",
        pbApiKey: String(pbApiKey),
      },
      button: {
        create: true,
      },
    });
  } catch (e) {
    console.error("Profitbase init error:", e);
  }
}

export function ProfitbaseFloatingWidget() {
  return (
    <Script
      src="https://cdn.profitbase.ru/smart/sw.js"
      strategy="afterInteractive"
      onLoad={() => {
        // Скрипт может выставить window.ProfitbaseWidget с небольшой задержкой
        let attempts = 0;
        const maxAttempts = 20;
        const tryInit = () => {
          if (window.ProfitbaseWidget) {
            initProfitbase();
            return;
          }
          attempts += 1;
          if (attempts < maxAttempts) setTimeout(tryInit, 100);
          else console.warn("[Profitbase] Глобальный ProfitbaseWidget не найден после загрузки скрипта.");
        };
        setTimeout(tryInit, 0);
      }}
    />
  );
}
