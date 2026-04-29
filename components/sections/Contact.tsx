"use client";

import { useState } from "react";
import type { FormEvent as ReactFormEvent } from "react";
import { Instagram, Mail, Send } from "lucide-react";
import { getInstagramLabel, getInstagramUrl } from "@/lib/social";

const CONTACT_EMAIL = "marucb03@gmail.com";
const INSTAGRAM_URL = getInstagramUrl();
const INSTAGRAM_LABEL = getInstagramLabel();

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: ReactFormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setErrorMessage("");

    const fd = new FormData(form);
    const s = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" ? v : "";
    };
    const payload = {
      name: s("name").trim(),
      email: s("email").trim(),
      phone: s("phone").trim(),
      subject: s("subject").trim(),
      message: s("message").trim()
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ||
            "No se pudo enviar. Comprueba la configuración de Gmail en el servidor."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("contact form:", err);
      setStatus("error");
      setErrorMessage(
        "Error de red. Comprueba la conexión e inténtalo de nuevo."
      );
    }
  }

  return (
    <section
      id="contacto"
      className="py-24 lg:py-32 bg-[#F4EAD5]/40"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <p className="text-xs tracking-[0.35em] uppercase text-[#5A6658] mb-5">
            Contacto
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2D372B] leading-tight mb-8">
            Dar el<span className="italic text-[#B2845A]"> primer paso</span>
            <br />
            ya es un acto
            <br />
            de cuidado.
          </h2>
          <p className="text-[#5A6658] leading-relaxed font-light text-lg mb-10">
            Escríbeme contándome brevemente qué te trae por aquí. Te responderé
            personalmente para agendar una primera sesión online.
          </p>

          <div className="space-y-4 mt-10">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-[#2D372B] hover:text-[#B2845A] transition-colors group"
              data-testid="contact-email-link"
            >
              <span className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#F4EAD5] flex items-center justify-center group-hover:bg-[#D4A373] group-hover:text-[#FDFBF7] transition-all">
                <Mail className="size-4" aria-hidden />
              </span>
              <span className="font-light">{CONTACT_EMAIL}</span>
            </a>
            {INSTAGRAM_URL ? (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#2D372B] hover:text-[#B2845A] transition-colors group"
                data-testid="contact-instagram-link"
              >
                <span className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#F4EAD5] flex items-center justify-center group-hover:bg-[#D4A373] group-hover:text-[#FDFBF7] transition-all">
                  <Instagram className="size-4" aria-hidden />
                </span>
                <span className="font-light">{INSTAGRAM_LABEL}</span>
              </a>
            ) : null}
            <div className="flex items-center gap-3 text-[#5A6658] font-light">
              <span className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#F4EAD5] flex items-center justify-center text-xs">
                €
              </span>
              <span>Sesiones online · 45€ · 50 minutos</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            className="bg-[#FDFBF7] border border-[#F4EAD5] rounded-3xl p-8 lg:p-10 space-y-5"
            data-testid="contact-form"
            onSubmit={onSubmit}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <label className="block" data-testid="field-name" htmlFor="contact-name">
                <span className="block text-xs tracking-[0.2em] uppercase text-[#5A6658] mb-2">
                  Nombre *
                </span>
                <input
                  id="contact-name"
                  name="name"
                  required
                  className="cu-input"
                  data-testid="contact-name-input"
                  type="text"
                  autoComplete="name"
                />
              </label>
              <label className="block" data-testid="field-email" htmlFor="contact-email">
                <span className="block text-xs tracking-[0.2em] uppercase text-[#5A6658] mb-2">
                  Email *
                </span>
                <input
                  id="contact-email"
                  name="email"
                  required
                  className="cu-input"
                  data-testid="contact-email-input"
                  type="email"
                  autoComplete="email"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <label className="block" data-testid="field-phone" htmlFor="contact-phone">
                <span className="block text-xs tracking-[0.2em] uppercase text-[#5A6658] mb-2">
                  Teléfono (opcional)
                </span>
                <input
                  id="contact-phone"
                  name="phone"
                  className="cu-input"
                  data-testid="contact-phone-input"
                  type="tel"
                  autoComplete="tel"
                />
              </label>
              <label
                className="block"
                data-testid="field-subject"
                htmlFor="contact-subject"
              >
                <span className="block text-xs tracking-[0.2em] uppercase text-[#5A6658] mb-2">
                  Motivo (opcional)
                </span>
                <input
                  id="contact-subject"
                  name="subject"
                  className="cu-input"
                  placeholder="Ansiedad, pareja, autoconocimiento..."
                  data-testid="contact-subject-input"
                  type="text"
                />
              </label>
            </div>

            <label className="block" data-testid="field-message" htmlFor="contact-message">
              <span className="block text-xs tracking-[0.2em] uppercase text-[#5A6658] mb-2">
                Mensaje *
              </span>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                className="cu-input resize-none"
                placeholder="Cuéntame qué te trae por aquí. No hace falta que sea largo."
                data-testid="contact-message-input"
              />
            </label>

            {status === "success" && (
              <p className="rounded-2xl border border-[#CCD5AE] bg-[#E9EDC9]/40 px-4 py-3 text-sm text-[#2D372B]">
                Mensaje enviado. Te responderé lo antes posible.
              </p>
            )}
            {status === "error" && errorMessage && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <button
                type="submit"
                className="cu-btn-primary disabled:opacity-60"
                data-testid="contact-submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  "Enviando…"
                ) : (
                  <>
                    Enviar mensaje <Send className="size-[15px]" aria-hidden />
                  </>
                )}
              </button>
              <p className="text-xs text-[#5A6658] font-light">
                Tus datos se tratan con total confidencialidad.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
