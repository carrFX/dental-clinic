import type { TranslationKey } from "./types";

const appointmentStatusMap: Record<string, TranslationKey> = {
  Menunggu: "status.menunggu",
  Diproses: "status.diproses",
  Selesai: "status.selesai",
  Dibatalkan: "status.dibatalkan",
};

const invoiceStatusMap: Record<string, TranslationKey> = {
  Lunas: "status.lunas",
  "Belum Bayar": "status.belumBayar",
  Sebagian: "status.sebagian",
};

export function appointmentStatusKey(status: string): TranslationKey {
  return appointmentStatusMap[status] ?? "status.menunggu";
}

export function invoiceStatusKey(status: string): TranslationKey {
  return invoiceStatusMap[status] ?? "status.belumBayar";
}
