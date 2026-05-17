"use client";

import Image from "next/image";
import { useLocale } from "@/contexts/LocaleContext";
import { images } from "@/lib/images";
import type { TranslationKey } from "@/lib/i18n/types";

const teamMembers: {
  name: string;
  roleKey: TranslationKey;
  image: string;
}[] = [
  {
    name: "Dr. Sarah Wijaya, Sp.KG",
    roleKey: "landing.team.role1",
    image: images.dentistTeam1,
  },
  {
    name: "Dr. Michael Chen, Sp.BM",
    roleKey: "landing.team.role2",
    image: images.dentistTeam2,
  },
  {
    name: "Dr. Anita Kusuma, Sp.Ort",
    roleKey: "landing.team.role3",
    image: images.dentistTeam3,
  },
];

export function Team() {
  const { t } = useLocale();

  return (
    <section id="tim" className="py-20 bg-[var(--card)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            {t("landing.team.label")}
          </span>
          <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            {t("landing.team.title")}
          </h2>
        </div>

        <div className="mx-auto grid max-w-sm gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group mx-auto w-full max-w-xs overflow-hidden rounded-2xl bg-[var(--accent)] shadow-sm hover-lift sm:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--accent)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-[var(--foreground)]">{member.name}</h3>
                <p className="text-sm text-[var(--primary)]">{t(member.roleKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
