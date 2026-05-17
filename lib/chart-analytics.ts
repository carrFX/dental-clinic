import type { Appointment, ClinicData, Invoice, Patient } from "@/lib/types";

export const CHART_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agt",
  "Sep",
  "Okt",
  "Nov",
  "Des",
] as const;

const MONTH_KEYS = [
  "2025-01",
  "2025-02",
  "2025-03",
  "2025-04",
  "2025-05",
  "2025-06",
  "2025-07",
  "2025-08",
  "2025-09",
  "2025-10",
  "2025-11",
  "2025-12",
];

function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

/** 8 bulan terakhir untuk chart (fluktuatif & terbaca) */
export function getChartMonthRange(): { keys: string[]; labels: string[] } {
  const keys = MONTH_KEYS.slice(0, 8);
  const labels = keys.map((k) => CHART_MONTHS[parseInt(k.split("-")[1], 10) - 1]);
  return { keys, labels };
}

export function aggregateRevenueByMonth(invoices: Invoice[]) {
  const { keys, labels } = getChartMonthRange();
  const totals = keys.map((key) =>
    invoices
      .filter((inv) => monthKey(inv.date) === key)
      .reduce((sum, inv) => sum + inv.paid, 0)
  );
  return { labels, data: totals };
}

export function aggregateNewPatientsByMonth(patients: Patient[]) {
  const { keys, labels } = getChartMonthRange();
  const counts = keys.map((key) =>
    patients.filter((p) => monthKey(p.registeredAt) === key).length
  );
  return { labels, data: counts };
}

export function aggregateAppointmentsByMonth(appointments: Appointment[]) {
  const { keys, labels } = getChartMonthRange();
  const counts = keys.map((key) =>
    appointments.filter((a) => monthKey(a.date) === key).length
  );
  return { labels, data: counts };
}

export function aggregateAppointmentStatus(appointments: Appointment[]) {
  const order = ["Menunggu", "Diproses", "Selesai", "Dibatalkan"] as const;
  const counts = order.map(
    (status) => appointments.filter((a) => a.status === status).length
  );
  return {
    labels: [...order],
    data: counts,
  };
}

export function aggregateTreatmentCategories(data: ClinicData) {
  const catCount: Record<string, number> = {};
  data.appointments.forEach((a) => {
    const treatment = data.treatments.find((t) => t.id === a.treatmentId);
    const cat = treatment?.category ?? "Lainnya";
    catCount[cat] = (catCount[cat] ?? 0) + 1;
  });
  if (Object.keys(catCount).length === 0) {
    data.treatments.forEach((t) => {
      catCount[t.category] = (catCount[t.category] ?? 0) + 1;
    });
  }
  return {
    labels: Object.keys(catCount),
    data: Object.values(catCount),
  };
}

export function aggregateRevenueByTreatment(data: ClinicData) {
  const revenue: Record<string, number> = {};
  data.invoices.forEach((inv) => {
    revenue[inv.treatmentName] = (revenue[inv.treatmentName] ?? 0) + inv.paid;
  });
  const sorted = Object.entries(revenue).sort((a, b) => b[1] - a[1]).slice(0, 8);
  return {
    labels: sorted.map(([name]) => (name.length > 22 ? `${name.slice(0, 22)}…` : name)),
    data: sorted.map(([, amount]) => amount),
    fullLabels: sorted.map(([name]) => name),
  };
}
