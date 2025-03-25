"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { competencies } from "@/data/competencies";
import { Assessment, User } from "@/types/assessment";
import { useEffect, useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  selfAssessment?: Assessment;
  managerAssessment?: Assessment;
  user: User;
}

export default function RadarChart({
  selfAssessment,
  managerAssessment,
  user,
}: RadarChartProps) {
  const [isDark, setIsDark] = useState(false);
  const [hiddenDatasets, setHiddenDatasets] = useState<string[]>([]);

  useEffect(() => {
    // Check if dark mode is enabled
    setIsDark(document.documentElement.classList.contains("dark"));

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const labels = competencies.map((c) => c.name);
  const idealScores = competencies.map((c) => c.idealScores[user.role]);

  const datasets = [
    {
      label: "Ideal",
      data: idealScores,
      backgroundColor: isDark
        ? "rgba(56, 189, 248, 0.2)"
        : "rgba(14, 165, 233, 0.2)",
      borderColor: isDark ? "rgb(56, 189, 248)" : "rgb(14, 165, 233)",
      borderWidth: 2,
      pointBackgroundColor: isDark ? "rgb(56, 189, 248)" : "rgb(14, 165, 233)",
      pointBorderColor: isDark ? "rgb(56, 189, 248)" : "rgb(14, 165, 233)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: isDark ? "rgb(56, 189, 248)" : "rgb(14, 165, 233)",
      fill: true,
    },
    ...(selfAssessment
      ? [
          {
            label: "Self Assessment",
            data: competencies.map(
              (c) => selfAssessment.competencies[c.id] || 0
            ),
            backgroundColor: isDark
              ? "rgba(74, 222, 128, 0.2)"
              : "rgba(34, 197, 94, 0.2)",
            borderColor: isDark ? "rgb(74, 222, 128)" : "rgb(34, 197, 94)",
            borderWidth: 2,
            pointBackgroundColor: isDark
              ? "rgb(74, 222, 128)"
              : "rgb(34, 197, 94)",
            pointBorderColor: isDark ? "rgb(74, 222, 128)" : "rgb(34, 197, 94)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: isDark
              ? "rgb(74, 222, 128)"
              : "rgb(34, 197, 94)",
            fill: true,
          },
        ]
      : []),
    ...(managerAssessment
      ? [
          {
            label: "Manager Assessment",
            data: competencies.map(
              (c) => managerAssessment.competencies[c.id] || 0
            ),
            backgroundColor: isDark
              ? "rgba(251, 146, 60, 0.2)"
              : "rgba(234, 88, 12, 0.2)",
            borderColor: isDark ? "rgb(251, 146, 60)" : "rgb(234, 88, 12)",
            borderWidth: 2,
            pointBackgroundColor: isDark
              ? "rgb(251, 146, 60)"
              : "rgb(234, 88, 12)",
            pointBorderColor: isDark ? "rgb(251, 146, 60)" : "rgb(234, 88, 12)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: isDark
              ? "rgb(251, 146, 60)"
              : "rgb(234, 88, 12)",
            fill: true,
          },
        ]
      : []),
  ];

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      hidden: hiddenDatasets.includes(dataset.label),
    })),
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          display: false,
          stepSize: 1,
        },
        grid: {
          color: isDark ? "rgba(209, 213, 219, 0.2)" : "rgba(55, 65, 81, 0.2)",
        },
        angleLines: {
          color: isDark ? "rgba(209, 213, 219, 0.2)" : "rgba(55, 65, 81, 0.2)",
        },
        pointLabels: {
          color: isDark ? "rgb(229, 231, 235)" : "rgb(31, 41, 55)",
          font: {
            size: 14,
            weight: "normal" as const,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "rgb(31, 41, 55)" : "rgb(255, 255, 255)",
        titleColor: isDark ? "rgb(229, 231, 235)" : "rgb(31, 41, 55)",
        bodyColor: isDark ? "rgb(229, 231, 235)" : "rgb(31, 41, 55)",
        borderColor: isDark ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)",
        borderWidth: 1,
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const toggleDataset = (label: string) => {
    setHiddenDatasets((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-dark-card rounded-lg p-6">
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {datasets.map((dataset) => (
          <button
            key={dataset.label}
            onClick={() => toggleDataset(dataset.label)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-base font-medium transition-colors ${
              hiddenDatasets.includes(dataset.label)
                ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ring-2"
            }`}
            style={{
              borderColor: dataset.borderColor,
              boxShadow: hiddenDatasets.includes(dataset.label)
                ? "none"
                : `0 0 0 2px ${dataset.borderColor}`,
            }}
          >
            <span
              className="w-4 h-4 rounded-full mr-2"
              style={{
                backgroundColor: dataset.borderColor,
                opacity: hiddenDatasets.includes(dataset.label) ? 0.5 : 1,
              }}
            />
            {dataset.label}
          </button>
        ))}
      </div>
      <div className="h-[400px]">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
