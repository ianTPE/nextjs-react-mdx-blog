"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 註冊必須的 ChartJS 元件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EffectivenessComparisonChart = () => {
  const data = {
    labels: ['建立合作關係', '找到解決方向', '系統協同', '非自願個案', '會談效率'],
    datasets: [
      {
        label: '傳統問題導向方法',
        data: [42, 38, 35, 30, 45],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'SFBT焦點解決取向',
        data: [75, 82, 68, 72, 78],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
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
        text: 'SFBT與傳統方法在各方面效能比較 (%)',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="chart-container p-4 bg-white rounded-lg shadow-md">
      <div style={{ height: '350px', minHeight: '350px' }}>
        <Bar data={data} options={options} />
      </div>
      <div className="text-sm text-gray-500 mt-2 text-center">
        *數據基於SFBT實證研究文獻與實務工作者問卷調查彙整
      </div>
    </div>
  );
};

export default EffectivenessComparisonChart;