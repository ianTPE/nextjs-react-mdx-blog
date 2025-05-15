"use client";

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

// 註冊 Chart.js 組件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 產業應用數據
const industryApplicationData = [
  { industry: '智能製造', prd: 90, devops: 85, aiops: 88, overall: 88 },
  { industry: '金融科技', prd: 95, devops: 90, aiops: 92, overall: 92 },
  { industry: '醫療健康', prd: 85, devops: 75, aiops: 80, overall: 80 },
  { industry: '零售電商', prd: 88, devops: 82, aiops: 85, overall: 85 },
  { industry: '汽車工業', prd: 92, devops: 88, aiops: 90, overall: 90 },
];

const IndustryMaturityMatrix = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Chart.js 配置
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      },
      title: {
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 14
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            size: 14
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
  };

  // 圖表數據
  const data: ChartData<'bar'> = {
    labels: industryApplicationData.map(item => item.industry),
    datasets: [
      {
        label: 'PRD智能化',
        data: industryApplicationData.map(item => item.prd),
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: 'DevOps自動化',
        data: industryApplicationData.map(item => item.devops),
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: 'AIOps運維',
        data: industryApplicationData.map(item => item.aiops),
        backgroundColor: '#f59e0b',
        borderColor: '#f59e0b',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  if (!isMounted) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">各產業 AI 應用成熟度分析</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入產業成熟度矩陣圖...</p>
        </div>
      </div>
    );
  }

  // 渲染圖表
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">各產業 AI 應用成熟度分析</h3>
      <div className="h-[400px] w-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default IndustryMaturityMatrix;