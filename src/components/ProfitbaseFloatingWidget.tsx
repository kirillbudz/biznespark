"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ProfitbaseWidget?: () => {
      init: (cfg: {
        params: Record<string, string>;
        button: { create: boolean };
      }) => void;
    };
    widget?: ReturnType<NonNullable<Window["ProfitbaseWidget"]>>;
  }
}

const PB_HOST = process.env.NEXT_PUBLIC_PB_HOST ?? "";
const PB_DOMAIN = process.env.NEXT_PUBLIC_PB_DOMAIN ?? "";
const PB_ACCOUNT_ID = process.env.NEXT_PUBLIC_PB_ACCOUNT_ID ?? "";
const PB_REFERRER = process.env.NEXT_PUBLIC_PB_REFERRER ?? "";
const PB_API_KEY = process.env.NEXT_PUBLIC_PB_API_KEY ?? "";

const PROD_HOSTNAMES = [
  "xn--14-6kcdulgtyvmj.xn--p1ai",
  "www.xn--14-6kcdulgtyvmj.xn--p1ai",
  "dev.xn--14-6kcdulgtyvmj.xn--p1ai",
];

export function ProfitbaseFloatingWidget() {
  const hasConfig = PB_HOST && PB_DOMAIN && PB_ACCOUNT_ID && PB_API_KEY;

  useEffect(() => {
    if (!hasConfig) return;
    if (!PROD_HOSTNAMES.includes(window.location.hostname)) return;

    const script = document.createElement("script");
    script.src = "https://cdn.profitbase.ru/smart/sw.js";
    script.async = true;
    script.onload = () => {
      if (!window.ProfitbaseWidget) return;
      const w = window.ProfitbaseWidget();
      w.init({
        params: {
          host: PB_HOST,
          pbDomain: PB_DOMAIN,
          accountId: PB_ACCOUNT_ID,
          referrer: PB_REFERRER,
          pbApiKey: PB_API_KEY,
        },
        button: { create: true },
      });
    };
    script.onerror = () => {
      console.warn("Profitbase widget script failed to load");
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [hasConfig]);

  return null;
}
