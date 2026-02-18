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

const hasProfitbaseKeys =
  typeof process.env.NEXT_PUBLIC_PB_ACCOUNT_ID === "string" &&
  process.env.NEXT_PUBLIC_PB_ACCOUNT_ID.length > 0 &&
  typeof process.env.NEXT_PUBLIC_PB_API_KEY === "string" &&
  process.env.NEXT_PUBLIC_PB_API_KEY.length > 0;

export function ProfitbaseFloatingWidget() {
  if (!hasProfitbaseKeys) {
    return null;
  }

  return (
    <Script
      src="https://cdn.profitbase.ru/smart/sw.js"
      strategy="afterInteractive"
      onLoad={() => {
        let attempts = 0;
        const maxAttempts = 20;
        const tryInit = () => {
          if (window.ProfitbaseWidget) {
            initProfitbase();
            return;
          }
          attempts += 1;
          if (attempts < maxAttempts) setTimeout(tryInit, 100);
        };
        setTimeout(tryInit, 0);
      }}
    />
  );
}
