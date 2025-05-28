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
                gradient.addColorStop(0, "rgba(99, 102, 241, 0.8)");
                gradient.addColorStop(1, "rgba(99, 102, 241, 0.2)");
                return gradient;
              },
              borderColor: "rgba(99, 102, 241, 1)",
              borderWidth: 1,
              borderRadius: 6,
              barPercentage: 0.7,
              hoverBackgroundColor: "rgba(99, 102, 241, 0.9)",
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
