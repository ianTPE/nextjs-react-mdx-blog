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

const IncomePotentialComparisonChart: React.FC = () => {
  const data = {
    labels: ['AI/ML', '網絡安全', '後端自動化', '數據分析', '全棧開發', '前端開發'],
    datasets: [
      {
        label: '最低時薪',
        data: [50, 40, 35, 30, 30, 25],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 0,
        borderRadius: {
          topLeft: 6,
          topRight: 6,
        },
        borderSkipped: false,
      },
      {
        label: '最高時薪',
        data: [150, 90, 85, 80, 80, 70],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 0,
        borderRadius: {
          topLeft: 6,
          topRight: 6,
        },
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle' as const,
          padding: 25,
          font: {
            size: 13,
            weight: '600' as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: '各技術方向時薪收入潛力對比',
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 12,
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: $${value}/小時`;
          },
          afterBody: function(context: any) {
            const index = context[0].dataIndex;
            const minValue = data.datasets[0].data[index];
            const maxValue = data.datasets[1].data[index];
            const range = maxValue - minValue;
            return [`收入範圍: $${range}/小時`];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 160,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#6b7280',
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: '500' as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
          maxRotation: 45,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart' as const,
      delay: (context: any) => {
        return context.datasetIndex * 300 + context.dataIndex * 100;
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const incomeData = [
    { field: 'AI/ML', min: 50, max: 150, avg: 100 },
    { field: '網絡安全', min: 40, max: 90, avg: 65 },
    { field: '後端自動化', min: 35, max: 85, avg: 60 },
    { field: '數據分析', min: 30, max: 80, avg: 55 },
    { field: '全棧開發', min: 30, max: 80, avg: 55 },
    { field: '前端開發', min: 25, max: 70, avg: 47.5 },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-green-50 rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
      <div className="h-[500px] p-6">
        <Bar data={data} options={options} />
      </div>
      
      <div className="px-6 pb-6">
        <div className="bg-white rounded-xl p-4 shadow-inner border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">💰 收入潛力分析</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {incomeData.map((item, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-600 mb-1">{item.field}</p>
                <div className="flex items-center justify-center space-x-1 text-xs">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded font-medium">
                    ${item.min}
                  </span>
                  <span className="text-gray-400">-</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
                    ${item.max}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">平均: ${item.avg}/小時</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomePotentialComparisonChart;