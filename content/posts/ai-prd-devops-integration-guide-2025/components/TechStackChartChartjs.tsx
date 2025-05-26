"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

// Register Chart.js elements once
ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, ChartLegend);

const techStackData = [
  { category: "AI 需求分析", adoption: 85, color: "#3b82f6" },
  { category: "智能編碼", adoption: 75, color: "#10b981" },
  { category: "自適應流水線", adoption: 60, color: "#f59e0b" },
  { category: "智能運維", adoption: 70, color: "#ef4444" },
  { category: "數據閉環", adoption: 65, color: "#8b5cf6" },
];

const TechStackChartChartjs = () => {
  // Prepare data for Chart.js
  const data = {
    labels: techStackData.map((d) => d.category),
    datasets: [
      {
        label: "採用率",
        data: techStackData.map((d) => d.adoption),
        backgroundColor: techStackData.map((d) => d.color),
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const, // horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        max: 100,
        ticks: {
          callback: (value: number | string) => `${value}%`,
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = ctx.parsed.x;
            return `採用率: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-3 sm:p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2 sm:mb-4 text-center">AI 技術棧採用率分析</h3>
      <div className="relative w-full h-[380px] -ml-2 sm:ml-0">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TechStackChartChartjs;
