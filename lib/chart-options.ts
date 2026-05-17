import type { ChartOptions, TooltipItem } from "chart.js";
import { formatCurrencyCompact, formatCurrencyDecimal } from "@/lib/utils";
import { defaultChartOptions } from "@/components/dashboard/charts/chart-setup";

function tickFont(compact: boolean) {
  return { size: compact ? 10 : 12 };
}

function chartLayout(compact: boolean) {
  return {
    padding: compact
      ? { left: 2, right: 6, top: 4, bottom: 2 }
      : { left: 4, right: 12, top: 8, bottom: 4 },
  };
}

function legendOptions(compact: boolean, position: "top" | "bottom" | "right" = "top") {
  return {
    position: compact ? ("bottom" as const) : position,
    align: "start" as const,
    labels: {
      font: { family: "system-ui", size: compact ? 11 : 12 },
      padding: compact ? 10 : 16,
      boxWidth: compact ? 12 : 16,
    },
  };
}

/** Legend di kanan lingkaran donut/pie — satu kolom vertikal */
function pieLegendOptions(compact: boolean) {
  return {
    position: "right" as const,
    align: "start" as const,
    fullSize: false,
    labels: {
      font: {
        family: "system-ui",
        size: compact ? 13 : 14,
        weight: "bold" as const,
      },
      padding: compact ? 10 : 12,
      boxWidth: compact ? 14 : 16,
    },
  };
}

function tooltipTitle<T extends "bar" | "line" | "doughnut" | "pie">(
  items: TooltipItem<T>[]
) {
  return items[0]?.label ?? "";
}

export function currencyTooltipCallbacks(isHorizontal = false) {
  return {
    title: (items: TooltipItem<"bar">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"bar">) => {
      const label = ctx.dataset.label ? `${ctx.dataset.label}: ` : "";
      const raw = isHorizontal ? ctx.parsed.x : ctx.parsed.y;
      const value = typeof raw === "number" ? raw : 0;
      return `${label}${formatCurrencyDecimal(value)}`;
    },
  };
}

function countLabelLine(ctx: TooltipItem<"line">, unit: string) {
  const label = ctx.dataset.label ? `${ctx.dataset.label}: ` : "";
  const y = ctx.parsed.y;
  const value = typeof y === "number" ? y : 0;
  const suffix = unit ? ` ${unit}` : "";
  return `${label}${value}${suffix}`;
}

function countLabelBar(ctx: TooltipItem<"bar">, unit: string) {
  const label = ctx.dataset.label ? `${ctx.dataset.label}: ` : "";
  const y = ctx.parsed.y;
  const value = typeof y === "number" ? y : 0;
  const suffix = unit ? ` ${unit}` : "";
  return `${label}${value}${suffix}`;
}

export function lineCountTooltipCallbacks(unit = "") {
  return {
    title: (items: TooltipItem<"line">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"line">) => countLabelLine(ctx, unit),
  };
}

export function barCountTooltipCallbacks(unit = "") {
  return {
    title: (items: TooltipItem<"bar">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"bar">) => countLabelBar(ctx, unit),
  };
}

function pieLabelText(
  ctx: TooltipItem<"pie"> | TooltipItem<"doughnut">,
  formatValue?: (n: number) => string
) {
  const data = ctx.dataset.data as number[];
  const total = data.reduce((a, b) => a + b, 0);
  const value = typeof ctx.parsed === "number" ? ctx.parsed : 0;
  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
  const formatted = formatValue ? formatValue(value) : String(value);
  return `${ctx.label}: ${formatted} (${pct}%)`;
}

export function doughnutTooltipCallbacks(formatValue?: (n: number) => string) {
  return {
    title: (items: TooltipItem<"doughnut">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"doughnut">) => pieLabelText(ctx, formatValue),
  };
}

export function pieTooltipCallbacks(formatValue?: (n: number) => string) {
  return {
    title: (items: TooltipItem<"pie">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"pie">) => pieLabelText(ctx, formatValue),
  };
}

const tooltipBase = {
  backgroundColor: "rgba(15, 41, 66, 0.92)",
  titleFont: { size: 13, weight: "bold" as const },
  bodyFont: { size: 12 },
  padding: 12,
  cornerRadius: 8,
};

export function currencyYAxisTicks(compact = false) {
  return {
    beginAtZero: true,
    ticks: {
      maxTicksLimit: compact ? 5 : 8,
      font: tickFont(compact),
      callback: (value: string | number) =>
        compact
          ? formatCurrencyCompact(Number(value))
          : formatCurrencyDecimal(Number(value)),
    },
  };
}

export function lineChartOptions(compact = false): ChartOptions<"line"> {
  return {
    ...defaultChartOptions,
    layout: chartLayout(compact),
    scales: {
      x: {
        ticks: {
          font: tickFont(compact),
          maxRotation: compact ? 45 : 0,
          minRotation: compact ? 0 : 0,
        },
        grid: { display: !compact },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: tickFont(compact), maxTicksLimit: compact ? 5 : 8 },
      },
    },
    plugins: {
      legend: legendOptions(compact, "top"),
      tooltip: {
        ...tooltipBase,
        callbacks: lineCountTooltipCallbacks("pasien"),
      },
    },
    elements: {
      point: { radius: compact ? 3 : 5, hoverRadius: compact ? 5 : 7 },
      line: { borderWidth: compact ? 2 : 2.5 },
    },
  };
}

export function barCurrencyOptions(compact = false): ChartOptions<"bar"> {
  return {
    ...defaultChartOptions,
    layout: chartLayout(compact),
    scales: {
      x: {
        ticks: {
          font: tickFont(compact),
          maxRotation: compact ? 45 : 0,
          minRotation: compact ? 45 : 0,
          autoSkip: true,
          maxTicksLimit: compact ? 6 : 12,
        },
        grid: { display: false },
      },
      y: currencyYAxisTicks(compact),
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tooltipBase,
        callbacks: {
          title: (items: TooltipItem<"bar">[]) => tooltipTitle(items),
          label: (ctx: TooltipItem<"bar">) => {
            const value =
              typeof ctx.parsed.y === "number" ? ctx.parsed.y : 0;
            return formatCurrencyDecimal(value);
          },
        },
      },
    },
  };
}

export function barHorizontalCurrencyOptions(compact = false): ChartOptions<"bar"> {
  return {
    ...defaultChartOptions,
    layout: chartLayout(compact),
    indexAxis: "y",
    scales: {
      y: {
        ticks: { font: tickFont(compact), autoSkip: false },
        grid: { display: false },
      },
      x: currencyYAxisTicks(compact),
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tooltipBase,
        callbacks: currencyTooltipCallbacks(true),
      },
    },
  };
}

export function barCountOptions(compact = false): ChartOptions<"bar"> {
  return {
    ...defaultChartOptions,
    layout: chartLayout(compact),
    scales: {
      x: {
        ticks: { font: tickFont(compact) },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: tickFont(compact), maxTicksLimit: compact ? 5 : 8 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tooltipBase,
        callbacks: barCountTooltipCallbacks("pasien"),
      },
    },
  };
}

export function doughnutOptions(
  formatValue?: (n: number) => string,
  compact = false
): ChartOptions<"doughnut"> {
  return {
    ...defaultChartOptions,
    layout: chartLayout(compact),
    cutout: compact ? "72%" : "78%",
    plugins: {
      legend: pieLegendOptions(compact),
      tooltip: {
        ...tooltipBase,
        callbacks: doughnutTooltipCallbacks(formatValue),
      },
    },
  };
}

export function pieChartOptions(
  formatValue?: (n: number) => string,
  compact = false
): ChartOptions<"pie"> {
  return {
    ...defaultChartOptions,
    layout: chartLayout(compact),
    plugins: {
      legend: pieLegendOptions(compact),
      tooltip: {
        ...tooltipBase,
        callbacks: pieTooltipCallbacks(formatValue),
      },
    },
  };
}

/** Opsi dataset bar untuk layar sempit */
export function barDatasetLayout(compact: boolean) {
  return compact
    ? { maxBarThickness: 22, barPercentage: 0.65, categoryPercentage: 0.8 }
    : { maxBarThickness: 48, barPercentage: 0.75, categoryPercentage: 0.85 };
}
