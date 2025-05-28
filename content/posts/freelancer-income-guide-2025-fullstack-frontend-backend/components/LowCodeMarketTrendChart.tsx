'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LowCodeMarketTrendChart: React.FC = () => {
  const data = {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026', '2027'],
    datasets: [
      {
        label: '市場規模',
        data: [76.1, 110, 150, 200, 260, 310, 364.3],
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
          return gradient;
        },
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 4,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointHoverBackgroundColor: 'rgb(37, 99, 235)',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '低代碼開發市場增長趨勢 (2021-2027)',
        font: {
          size: 18,
          weight: 'bold' as const,
          family: 'Inter, system-ui, sans-serif',
        },
        color: '#1f2937',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f9fafb',
        bodyColor: '#f9fafb',
        cornerRadius: 12,
        displayColors: false,
        padding: 16,
        callbacks: {
          title: function(context: any) {
            return `${context[0].label}年`;
          },
          label: function(context: any) {
            return `市場規模: $${context.parsed.y}億美元`;
          },
          afterLabel: function(context: any) {
            const currentIndex = context.dataIndex;
            if (currentIndex > 0) {
              const currentValue = context.parsed.y;
              const previousValue = data.datasets[0].data[currentIndex - 1];
              const growth = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
              return `年增長: +${growth}%`;
            }
            return '';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 400,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#6b7280',
          callback: function(value: any) {
            return '$' + value + '億';
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 500 as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
        },
      },
    },
    animation: {
      duration: 3000,
      easing: 'easeInOutQuart' as const,
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const milestones = [
    { year: '2021', value: 76.1, event: '疫情推動數字化轉型' },
    { year: '2023', value: 150, event: '企業廣泛採用低代碼' },
    { year: '2025', value: 260, event: '公民開發者爆發' },
    { year: '2027', value: 364.3, event: '市場成型期' },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="h-96 p-6">
        <Line data={data} options={options} />
      </div>
      
      <div className="px-6 pb-6">
        <div className="bg-white rounded-xl p-5 shadow-inner border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            關鍵里程碑
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <p className="text-lg font-bold text-blue-600">{milestone.year}</p>
                <p className="text-sm font-semibold text-gray-800">${milestone.value}億</p>
                <p className="text-xs text-gray-600 mt-1">{milestone.event}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="text-sm text-center">
              <span className="font-semibold text-green-700">年複合增長率 (CAGR): </span>
              <span className="text-green-600 font-bold">約30%</span>
              <span className="text-gray-600 ml-2">— 超高速增長市場</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowCodeMarketTrendChart;