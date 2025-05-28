"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MarketDriversChart = () => {
  return (
    <div
      style={{
        height: "60vh",
        minHeight: "400px",
        maxHeight: "600px",
        width: "100%",
      }}
    >
      <Bar
        data={{
          labels: [
            "企業使用低代碼",
            "員工遠程工作",
            "AI技能需求",
            "訂閱制電商增長",
            "新應用採用低代碼",
          ],
          datasets: [
            {
              label: "百分比 (%)",
              data: [84, 70, 18, 65.2, 70],
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                const colors = [
                  ["rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 0.2)"], // 红
                  ["rgba(59, 130, 246, 0.8)", "rgba(59, 130, 246, 0.2)"], // 蓝
                  ["rgba(139, 92, 246, 0.8)", "rgba(139, 92, 246, 0.2)"], // 紫
                  ["rgba(16, 185, 129, 0.8)", "rgba(16, 185, 129, 0.2)"], // 绿
                  ["rgba(245, 158, 11, 0.8)", "rgba(245, 158, 11, 0.2)"], // 黄
                ];
                const [start, end] = colors[context.dataIndex % colors.length];
                gradient.addColorStop(0, start);
                gradient.addColorStop(1, end);
                return gradient;
              },
              borderColor: (context) => {
                const colors = [
                  "rgba(239, 68, 68, 1)", // 红
                  "rgba(59, 130, 246, 1)", // 蓝
                  "rgba(139, 92, 246, 1)", // 紫
                  "rgba(16, 185, 129, 1)", // 绿
                  "rgba(245, 158, 11, 1)", // 黄
                ];
                return colors[context.dataIndex % colors.length];
              },
              borderWidth: 1,
              borderRadius: 6,
              barPercentage: 0.7,
              hoverBackgroundColor: (context) => {
                const colors = [
                  "rgba(239, 68, 68, 0.9)", // 红
                  "rgba(59, 130, 246, 0.9)", // 蓝
                  "rgba(139, 92, 246, 0.9)", // 紫
                  "rgba(16, 185, 129, 0.9)", // 绿
                  "rgba(245, 158, 11, 0.9)", // 黄
                ];
                return colors[context.dataIndex % colors.length];
              },
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "推動Freelancer需求的關鍵市場因素",
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
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              titleFont: {
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                size: 12,
              },
              padding: 10,
              cornerRadius: 6,
            },
            datalabels: {
              display: true,
              color: "#4b5563",
              anchor: "end",
              align: "top",
              formatter: (value) => `${value}%`,
              font: {
                weight: "bold",
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                display: false,
              },
              ticks: {
                callback: (value: string | number) => `${Number(value)}%`,
                padding: 10,
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            },
          },
        }}
      />
    </div>
  );
};

export default MarketDriversChart;
