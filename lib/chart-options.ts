import type { ChartOptions, TooltipItem } from "chart.js";
import { formatCurrencyDecimal } from "@/lib/utils";
import { defaultChartOptions } from "@/components/dashboard/charts/chart-setup";

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

function countLabel(ctx: TooltipItem<"line" | "bar">, unit: string) {
  const label = ctx.dataset.label ? `${ctx.dataset.label}: ` : "";
  const y = ctx.parsed.y;
  const value = typeof y === "number" ? y : 0;
  const suffix = unit ? ` ${unit}` : "";
  return `${label}${value}${suffix}`;
}

export function lineCountTooltipCallbacks(unit = "") {
  return {
    title: (items: TooltipItem<"line">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"line">) => countLabel(ctx, unit),
  };
}

export function barCountTooltipCallbacks(unit = "") {
  return {
    title: (items: TooltipItem<"bar">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"bar">) => countLabel(ctx, unit),
  };
}

function pieLabel(
  ctx: TooltipItem<"pie" | "doughnut">,
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
    label: (ctx: TooltipItem<"doughnut">) => pieLabel(ctx, formatValue),
  };
}

export function pieTooltipCallbacks(formatValue?: (n: number) => string) {
  return {
    title: (items: TooltipItem<"pie">[]) => tooltipTitle(items),
    label: (ctx: TooltipItem<"pie">) => pieLabel(ctx, formatValue),
  };
}

const tooltipBase = {
  backgroundColor: "rgba(15, 41, 66, 0.92)",
  titleFont: { size: 13, weight: "bold" as const },
  bodyFont: { size: 12 },
  padding: 12,
  cornerRadius: 8,
};

export function currencyYAxisTicks() {
  return {
    beginAtZero: true,
    ticks: {
      callback: (value: string | number) => formatCurrencyDecimal(Number(value)),
    },
  };
}

export function lineChartOptions(): ChartOptions<"line"> {
  return {
    ...defaultChartOptions,
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
    plugins: {
      legend: defaultChartOptions.plugins?.legend,
      tooltip: {
        ...tooltipBase,
        callbacks: lineCountTooltipCallbacks("pasien"),
      },
    },
  };
}

export function barCurrencyOptions(): ChartOptions<"bar"> {
  return {
    ...defaultChartOptions,
    scales: { y: currencyYAxisTicks() },
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

export function barHorizontalCurrencyOptions(): ChartOptions<"bar"> {
  return {
    ...defaultChartOptions,
    indexAxis: "y",
    scales: { x: currencyYAxisTicks() },
    plugins: {
      legend: defaultChartOptions.plugins?.legend,
      tooltip: {
        ...tooltipBase,
        callbacks: currencyTooltipCallbacks(true),
      },
    },
  };
}

export function barCountOptions(): ChartOptions<"bar"> {
  return {
    ...defaultChartOptions,
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
    plugins: {
      legend: defaultChartOptions.plugins?.legend,
      tooltip: {
        ...tooltipBase,
        callbacks: barCountTooltipCallbacks("pasien"),
      },
    },
  };
}

export function doughnutOptions(formatValue?: (n: number) => string): ChartOptions<"doughnut"> {
  return {
    ...defaultChartOptions,
    cutout: "65%",
    plugins: {
      legend: defaultChartOptions.plugins?.legend,
      tooltip: {
        ...tooltipBase,
        callbacks: doughnutTooltipCallbacks(formatValue),
      },
    },
  };
}

export function pieChartOptions(formatValue?: (n: number) => string): ChartOptions<"pie"> {
  return {
    ...defaultChartOptions,
    plugins: {
      legend: defaultChartOptions.plugins?.legend,
      tooltip: {
        ...tooltipBase,
        callbacks: pieTooltipCallbacks(formatValue),
      },
    },
  };
}
