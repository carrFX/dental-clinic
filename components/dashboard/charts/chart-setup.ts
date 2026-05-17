import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const chartColors = {
  primary: "#2196F3",
  primaryLight: "#64B5F6",
  primaryDark: "#1565C0",
  success: "#4CAF50",
  warning: "#FF9800",
  danger: "#F44336",
  purple: "#9C27B0",
  teal: "#009688",
};

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { font: { family: "system-ui" }, padding: 16 },
    },
  },
};
