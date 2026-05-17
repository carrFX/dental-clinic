"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export function Contact() {
  const { t } = useLocale();

  const contactItems = [
    { icon: MapPin, text: "Jl. Arcade No. 88, Jakarta Selatan 12345" },
    { icon: Phone, text: "(021) 5550-8888" },
    { icon: Mail, text: "info@arcadedental.com" },
    { icon: Clock, text: t("landing.contact.hours") },
  ];

  return (
    <section id="kontak" className="py-20 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              {t("landing.contact.label")}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
              {t("landing.contact.title")}
            </h2>
            <p className="mt-4 text-[var(--muted)]">{t("landing.contact.desc")}</p>

            <ul className="mt-8 space-y-4">
              {contactItems.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[var(--muted)]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <form
            className="rounded-2xl surface-card p-8 shadow-lg ring-1 ring-[var(--border)]"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="mb-6 text-xl font-semibold">{t("landing.contact.formTitle")}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t("landing.contact.namePlaceholder")}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              <input
                type="email"
                placeholder={t("auth.email")}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              <textarea
                rows={4}
                placeholder={t("landing.contact.messagePlaceholder")}
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              <button
                type="submit"
                className="w-full rounded-xl gradient-primary py-3 font-semibold text-white shadow-md transition hover:shadow-lg hover:scale-[1.02]"
              >
                {t("landing.contact.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
