'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MarketGrowthComparisonChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['傳統就業市場', 'Gig經濟'],
    datasets: [
      {
        label: '2010-2020年增長率 (%)',
        data: [1.1, 15],
        backgroundColor: ['#667eea', '#f093fb'],
        borderColor: ['#667eea', '#f5576c'],
        borderWidth: 0,
        borderRadius: 12,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '市場增長率對比：Gig經濟 vs 傳統就業',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Inter, system-ui, sans-serif',
        },
        color: '#1f2937',
        padding: { top: 10, bottom: 30 },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          title: ctx => ctx[0].label,
          label: ctx => `增長率: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
        grid: {
          color: '#f3f4f6',
          drawOnChartArea: true,
          drawTicks: false,
        },
        border: {
          display: false,  // 隐藏 y 轴那条边框线
        },
        ticks: {
          font: { size: 12, family: 'Inter, system-ui, sans-serif' },
          color: '#6b7280',
          callback: v => `${v}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,  // 隐藏 x 轴那条边框线
        },
        ticks: {
          font: {
            size: 13,
            weight: '600',
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
          maxRotation: 0,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="w-full h-96 p-6 flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100">
      {/* 把图表放在 flex-1 区域 */}
      <div className="flex-1">
        <Bar data={data} options={options} />
      </div>

      {/* 自定义 Legend */}
      <div className="mt-4 flex justify-center space-x-6 overflow-x-auto">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
          <span className="text-xs font-medium text-gray-600">傳統就業: 1.1%</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-red-500"></div>
          <span className="text-xs font-medium text-gray-600">Gig經濟: 15%</span>
        </div>
      </div>
    </div>
  );
};

export default MarketGrowthComparisonChart;
