"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ProfitbaseWidget?: () => {
      init: (cfg: { params: Record<string, string>; button: { create: boolean } }) => void;
    };
    widget?: ReturnType<NonNullable<Window["ProfitbaseWidget"]>>;
  }
}

/** Виджет Profitbase работает только с этого домена (ограничение кабинета). */
const PROD_HOSTNAMES = [
  "xn--14-6kcdulgtyvmj.xn--p1ai",
  "www.xn--14-6kcdulgtyvmj.xn--p1ai",
];

const DEFAULT_PB = {
  host: "https://smart-catalog.profitbase.ru/eco",
  pbDomain: "profitbase.ru",
  accountId: "20470",
  pbApiKey: "e7e211fe783cf1c64b5788316cc29ab5",
} as const;

function initProfitbase() {
  const host = process.env.NEXT_PUBLIC_PB_HOST ?? DEFAULT_PB.host;
  const pbDomain = process.env.NEXT_PUBLIC_PB_DOMAIN ?? DEFAULT_PB.pbDomain;
  const accountId = process.env.NEXT_PUBLIC_PB_ACCOUNT_ID ?? DEFAULT_PB.accountId;
  const pbApiKey = process.env.NEXT_PUBLIC_PB_API_KEY ?? DEFAULT_PB.pbApiKey;
  const referrer =
    typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_PB_REFERRER ?? "";

  if (!accountId || !pbApiKey) return;
  if (!window.ProfitbaseWidget) return;

  try {
    if (!window.widget) window.widget = window.ProfitbaseWidget();
    window.widget.init({
      params: {
        host: String(host),
        pbDomain: String(pbDomain),
        accountId: String(accountId),
        referrer: String(referrer),
        pbApiKey: String(pbApiKey),
      },
      button: { create: true },
    });
  } catch (e) {
    console.error("Profitbase init error:", e);
  }
}

export function ProfitbaseFloatingWidget() {
  const [isProdDomain, setIsProdDomain] = useState(false);

  useEffect(() => {
    const hostname =
      typeof window !== "undefined" ? window.location.hostname : "";
    setIsProdDomain(PROD_HOSTNAMES.includes(hostname));
  }, []);

  if (!isProdDomain) return null;

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
