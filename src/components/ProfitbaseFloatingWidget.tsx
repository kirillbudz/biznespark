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

const PROD_HOSTNAMES = [
  "xn--14-6kcdulgtyvmj.xn--p1ai",
  "www.xn--14-6kcdulgtyvmj.xn--p1ai",
  "dev.xn--14-6kcdulgtyvmj.xn--p1ai",
];

export function ProfitbaseFloatingWidget() {
  useEffect(() => {
    if (!PROD_HOSTNAMES.includes(window.location.hostname)) return;

    const script = document.createElement("script");
    script.src = "https://cdn.profitbase.ru/smart/sw.js";
    script.async = true;
    script.onload = () => {
      if (!window.ProfitbaseWidget) return;
      const w = window.ProfitbaseWidget();
      w.init({
        params: {
          host: "https://smart-catalog.profitbase.ru/eco",
          pbDomain: "profitbase.ru",
          accountId: "20470",
          referrer: "http://xn--14-6kcdulgtyvmj.xn--p1ai",
          pbApiKey: "e7e211fe783cf1c64b5788316cc29ab5",
        },
        button: { create: true },
      });
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
