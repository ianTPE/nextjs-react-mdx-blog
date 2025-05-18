"use client";

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// 註冊必須的 ChartJS 元件
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SfbtCompetencyRadarChart = () => {
  const data = {
    labels: [
      '例外探索能力',
      '提問技巧',
      '系統合作',
      '目標設定',
      '資源放大',
      '小步驟設計',
      '積極態度維持',
    ],
    datasets: [
      {
        label: '初學者階段',
        data: [2, 2, 1, 3, 2, 2, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '完成初階課程',
        data: [4, 5, 3, 6, 4, 5, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: '完成進階課程',
        data: [7, 8, 6, 8, 7, 8, 9],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;
  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        position: isDesktop ? 'bottom' : 'right',
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
          display: false,
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'SFBT不同學習階段能力雷達圖（0-10分）',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="chart-container p-4 bg-white rounded-lg shadow-md h-[250px] sm:h-[350px] lg:h-[400px] max-h-[500px] flex flex-col items-center">
      <Radar data={data} options={options} />
      <div className="text-sm text-gray-500 mt-2 text-center">
        *數據基於研習課程參與者自評與講師評量
      </div>
    </div>
  );
};

export default SfbtCompetencyRadarChart;