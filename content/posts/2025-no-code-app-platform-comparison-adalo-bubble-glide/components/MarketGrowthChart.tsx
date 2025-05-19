"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 註冊ChartJS組件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const MarketGrowthChart = () => {
  // 設定圖表是否在桌面版
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;
  
  // 圖表數據
  const data = {
    labels: ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
      {
        label: '無程式碼市場規模（十億美元）',
        data: [14.9, 19.2, 25.3, 32.0, 40.1, 50.3, 63.1, 79.2, 94.6, 102.7],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      }
    ],
  };

  // 圖表選項
  const options = {
    responsive: true,
    maintainAspectRatio: isDesktop,
    plugins: {
      legend: {
        position: (isDesktop ? 'top' : 'bottom') as const,
      },
      title: {
        display: true,
        text: '全球無程式碼開發平台市場增長預測 (2022-2031)',
        font: {
          size: 16,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.parsed.y}B`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: isDesktop ? 0 : 45,
          minRotation: isDesktop ? 0 : 45
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '市場規模（十億美元）'
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value + 'B';
          }
        }
      }
    },
  };

  return (
    <div className="w-full my-8 p-4 pb-8 bg-white rounded-lg shadow-md min-h-[300px] max-h-[350px] sm:min-h-[350px] sm:max-h-[400px] lg:min-h-[400px] lg:max-h-[500px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default MarketGrowthChart;
