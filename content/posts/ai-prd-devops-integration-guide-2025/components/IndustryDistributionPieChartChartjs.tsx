"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem
} from "chart.js";

// Register Chart.js elements once
ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for our data
interface IndustryDataItem {
  name: string;
  value: number;
  color: string;
}

const IndustryDistributionPieChartChartjs = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const industryData: IndustryDataItem[] = [
    { name: "智能製造", value: 25, color: "#3b82f6" },
    { name: "金融科技", value: 20, color: "#10b981" },
    { name: "醫療健康", value: 15, color: "#f59e0b" },
    { name: "零售電商", value: 15, color: "#ef4444" },
    { name: "汽車工業", value: 10, color: "#8b5cf6" },
    { name: "其他產業", value: 15, color: "#6b7280" },
  ];

  if (!isMounted) {
    // Return a simple placeholder when not mounted (during SSR)
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">AI+PRD+DevOps 產業應用分布</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入產業分布圖...</p>
        </div>
      </div>
    );
  }

  // Prepare data for Chart.js
  const data = {
    labels: industryData.map((d) => d.name),
    datasets: [
      {
        data: industryData.map((d) => d.value),
        backgroundColor: industryData.map((d) => d.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'pie'>) => {
            const label = ctx.label || "";
            const value = ctx.parsed;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">AI+PRD+DevOps 產業應用分布</h3>
      <div className="relative w-full h-[400px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default IndustryDistributionPieChartChartjs;
