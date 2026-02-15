"use client";

import { useState } from "react";
import {
  Button,
  Field,
  FieldGroup,
  Input,
  Label,
  Textarea,
} from "@/components/catalyst";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) ?? "";
    const phone = (formData.get("phone") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Произошла ошибка");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Ошибка сети. Попробуйте позже.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <FieldGroup>
        <Field>
          <Label>Имя</Label>
          <Input name="name" type="text" required autoComplete="name" />
        </Field>
        <Field>
          <Label>Телефон</Label>
          <Input name="phone" type="tel" required autoComplete="tel" />
        </Field>
        <Field>
          <Label>Сообщение (необязательно)</Label>
          <Textarea name="message" rows={4} />
        </Field>
      </FieldGroup>
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
      {status === "success" && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-500">
          Заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </p>
      )}
      <div className="mt-6">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Отправка…" : "Отправить заявку"}
        </Button>
      </div>
    </form>
  );
}
