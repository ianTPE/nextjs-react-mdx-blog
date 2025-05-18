"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 註冊必須的 ChartJS 元件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CaseProgressChart = () => {
  const data = {
    labels: ['初次會談', '第二週', '第三週', '第四週', '第五週', '第六週'],
    datasets: [
      {
        label: '小偉（曠課案例）',
        data: [2, 3, 5, 6, 7, 8],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: '小華（上台焦慮）',
        data: [1, 2, 4, 5, 7, 7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: '小美（家庭衝突）',
        data: [3, 3, 5, 6, 7, 8],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '三個案例使用SFBT後的進步軌跡（0-10分量表）',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}/10分`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: '改善程度（0-10分）'
        }
      }
    }
  };

  return (
    <div className="chart-container p-4 bg-white rounded-lg shadow-md">
      <Line data={data} options={options} />
      <div className="text-sm text-gray-500 mt-2 text-center">
        *數據基於案主自評與輔導者觀察記錄
      </div>
    </div>
  );
};

export default CaseProgressChart;