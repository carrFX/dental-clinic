import type { ChartOptions, TooltipItem } from "chart.js";
import { formatCurrencyDecimal } from "@/lib/utils";
import { defaultChartOptions } from "@/components/dashboard/charts/chart-setup";

type AnyTooltip = TooltipItem<"bar" | "line" | "doughnut" | "pie">;

function tooltipTitle(items: AnyTooltip[]) {
  return items[0]?.label ?? "";
}

export function currencyTooltipCallbacks(isHorizontal = false) {
  return {
    title: tooltipTitle,
    label: (ctx: AnyTooltip) => {
      const label = ctx.dataset.label ? `${ctx.dataset.label}: ` : "";
      const raw = isHorizontal ? ctx.parsed.x : ctx.parsed.y;
      const value = typeof raw === "number" ? raw : 0;
      return `${label}${formatCurrencyDecimal(value)}`;
    },
  };
}

export function countTooltipCallbacks(unit = "") {
  return {
    title: tooltipTitle,
    label: (ctx: AnyTooltip) => {
      const label = ctx.dataset.label ? `${ctx.dataset.label}: ` : "";
      const parsed = ctx.parsed as number | { y?: number };
      const value =
        typeof parsed === "number"
          ? parsed
          : typeof parsed.y === "number"
            ? parsed.y
            : 0;
      const suffix = unit ? ` ${unit}` : "";
      return `${label}${value}${suffix}`;
    },
  };
}

export function pieTooltipCallbacks(formatValue?: (n: number) => string) {
  return {
    title: tooltipTitle,
    label: (ctx: AnyTooltip) => {
      const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
      const value = typeof ctx.parsed === "number" ? ctx.parsed : 0;
      const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
      const formatted = formatValue ? formatValue(value) : String(value);
      return `${ctx.label}: ${formatted} (${pct}%)`;
    },
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
        callbacks: countTooltipCallbacks("pasien"),
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
          title: tooltipTitle,
          label: (ctx: AnyTooltip) => {
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
        callbacks: countTooltipCallbacks("pasien"),
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
        callbacks: pieTooltipCallbacks(formatValue),
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
