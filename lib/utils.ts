export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Ringkas untuk sumbu chart di layar kecil (jt / rb) */
export function formatCurrencyCompact(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) {
    const m = amount / 1_000_000_000;
    return `Rp ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (abs >= 1_000_000) {
    const jt = amount / 1_000_000;
    return `Rp ${jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(1)}jt`;
  }
  if (abs >= 1_000) {
    return `Rp ${Math.round(amount / 1_000)}rb`;
  }
  return formatCurrency(amount);
}

/** Format Rupiah dengan 2 desimal — untuk tooltip chart */
export function formatCurrencyDecimal(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function generateId(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
