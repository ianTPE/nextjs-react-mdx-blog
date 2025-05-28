"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const JobSatisfactionChart = () => {
  return (
    <div className="w-full max-w-md mx-auto aspect-square">
      <Doughnut
        data={{
          labels: [
            "Digital Nomad高度滿意",
            "Digital Nomad滿意",
            "傳統工作者滿意",
          ],
          datasets: [
            {
              data: [79, 12, 47],
              backgroundColor: [
                "rgba(16, 185, 129, 0.8)", // 绿
                "rgba(99, 102, 241, 0.8)", // 紫
                "rgba(245, 158, 11, 0.8)", // 黄
              ],
              borderColor: [
                "rgba(16, 185, 129, 1)",
                "rgba(99, 102, 241, 1)",
                "rgba(245, 158, 11, 1)",
              ],
              borderWidth: 1,
              borderRadius: 2,
              hoverBorderWidth: 2,
              hoverOffset: 10,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1500,
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                font: {
                  size: 12,
                  weight: "bold" as const,
                },
                usePointStyle: true,
                pointStyle: "circle",
              },
            },
            title: {
              display: true,
              text: "工作滿意度對比 (2025)",
              font: {
                size: 18,
                weight: "bold",
              },
              padding: {
                top: 10,
                bottom: 20,
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "#ffffff",
              bodyColor: "#ffffff",
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = Number(context.raw) || 0;
                  const data = context.dataset.data as number[];
                  const total = data.reduce((sum, current) => sum + current, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
            datalabels: {
              display: true,
              color: "#1f2937",
              font: {
                weight: "bold",
                size: 14,
              },
              formatter: (value, context) => {
                const data = context.dataset.data as number[];
                const total = data.reduce((sum, current) => sum + current, 0);
                const percentage = Math.round((Number(value) / total) * 100);
                return `${percentage}%`;
              },
            },
          },
        }}
      />
    </div>
  );
};

export default JobSatisfactionChart;
