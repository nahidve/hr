import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";

// Register all standard ChartJS controllers, scales, and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Default font styling matching Space Mono / Geist theme
const defaultFont = {
  family: "'Space Mono', 'Geist Variable', ui-monospace, monospace",
  size: 11,
};

// Global default configuration overrides
const globalOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: defaultFont,
        color: "#75758a", // --color-slate
        boxWidth: 12,
        padding: 15,
      },
    },
    tooltip: {
      backgroundColor: "rgba(23, 23, 28, 0.95)", // --color-primary but dark glass style
      titleFont: {
        family: defaultFont.family,
        size: 12,
        weight: "bold",
      },
      bodyFont: defaultFont,
      padding: 10,
      cornerRadius: 6,
      borderColor: "#d9d9dd", // --color-hairline
      borderWidth: 1,
      displayColors: true,
      usePointStyle: true,
    },
  },
};

export function BeautifulDoughnut({ data, title, options = {} }) {
  const mergedOptions = {
    ...globalOptions,
    cutout: "70%",
    plugins: {
      ...globalOptions.plugins,
      legend: {
        ...globalOptions.plugins.legend,
        position: "bottom",
      },
    },
    ...options,
  };

  return (
    <div className="relative w-full h-full">
      <Doughnut data={data} options={mergedOptions} />
    </div>
  );
}

export function BeautifulBar({ data, options = {} }) {
  const mergedOptions = {
    ...globalOptions,
    plugins: {
      ...globalOptions.plugins,
      legend: {
        display: false, // Usually bar chart in this UI doesn't need legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: defaultFont,
          color: "#75758a",
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(217, 217, 221, 0.4)", // transparent --color-hairline
        },
        ticks: {
          font: defaultFont,
          color: "#75758a",
        },
        border: {
          display: false,
        },
      },
    },
    ...options,
  };

  return (
    <div className="relative w-full h-full">
      <Bar data={data} options={mergedOptions} />
    </div>
  );
}

export function BeautifulLine({ data, options = {} }) {
  const mergedOptions = {
    ...globalOptions,
    plugins: {
      ...globalOptions.plugins,
      legend: {
        ...globalOptions.plugins.legend,
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: defaultFont,
          color: "#75758a",
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(217, 217, 221, 0.4)",
        },
        ticks: {
          font: defaultFont,
          color: "#75758a",
        },
        border: {
          display: false,
        },
      },
    },
    ...options,
  };

  return (
    <div className="relative w-full h-full">
      <Line data={data} options={mergedOptions} />
    </div>
  );
}

export function BeautifulRadar({ data, options = {} }) {
  const mergedOptions = {
    ...globalOptions,
    scales: {
      r: {
        angleLines: {
          color: "rgba(217, 217, 221, 0.6)",
        },
        grid: {
          color: "rgba(217, 217, 221, 0.6)",
        },
        pointLabels: {
          font: {
            family: defaultFont.family,
            size: 10,
          },
          color: "#75758a",
        },
        ticks: {
          display: false, // hide numerical values for clean styling
        },
      },
    },
    ...options,
  };

  return (
    <div className="relative w-full h-full">
      <Radar data={data} options={mergedOptions} />
    </div>
  );
}
