"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) return;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const render = () => {
      if (!window.turnstile || !containerRef.current) return;
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current!, {
        sitekey: SITE_KEY,
        theme: "auto",
        size: "normal",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
      });
    };
    if (window.turnstile) {
      render();
    } else {
      intervalId = setInterval(() => {
        if (window.turnstile) {
          if (intervalId) clearInterval(intervalId);
          intervalId = undefined;
          render();
        }
      }, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      setTurnstileToken("");
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) ?? "";
    const phone = (formData.get("phone") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";
    const consent = formData.get("privacy-consent") === "on";

    if (!consent) {
      setStatus("error");
      setErrorMessage("Необходимо дать согласие на обработку персональных данных.");
      return;
    }

    if (SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Пройдите проверку безопасности.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message,
          "cf-turnstile-response": turnstileToken || undefined,
        }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Произошла ошибка");
        return;
      }
      setStatus("success");
      form.reset();
      setTurnstileToken("");
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Ошибка сети. Попробуйте позже.");
    }
  }

  return (
    <>
      {SITE_KEY && (
        <Script src={TURNSTILE_SCRIPT} strategy="afterInteractive" />
      )}
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-muted-foreground mb-1.5"
        >
          Имя
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Ваше имя"
        />
      </div>
      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-muted-foreground mb-1.5"
        >
          Телефон
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          pattern="^[+\d][\d\s()./\-]{4,}$"
          title="Введите номер телефона, например +7 914 271-5005"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="+7 (___) ___-____"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-muted-foreground mb-1.5"
        >
          Сообщение{" "}
          <span className="text-muted-foreground/50">(необязательно)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
          placeholder="Ваш вопрос или комментарий"
        />
      </div>

      {SITE_KEY && (
        <>
          <div ref={containerRef} aria-label="Проверка Cloudflare Turnstile" />
          <input
            type="hidden"
            name="cf-turnstile-response"
            value={turnstileToken}
            readOnly
            aria-hidden
          />
        </>
      )}

      <div className="flex items-start gap-3">
        <input
          id="contact-privacy-consent"
          name="privacy-consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-border bg-secondary text-accent focus:ring-2 focus:ring-accent/50 focus:ring-offset-0"
          aria-describedby="contact-privacy-consent-label"
        />
        <label
          id="contact-privacy-consent-label"
          htmlFor="contact-privacy-consent"
          className="text-sm text-muted-foreground leading-relaxed"
        >
          Даю согласие на{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline hover:no-underline"
          >
            обработку персональных данных
          </Link>
          .
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}
      {status === "success" && (
        <p className="text-sm text-emerald-400">
          Заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Отправка…" : "Отправить заявку"}
      </button>
    </form>
    </>
  );
}
