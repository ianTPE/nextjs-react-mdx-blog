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

const EmploymentGrowthForecastChart = () => {
  const data = {
    labels: ['網絡安全', '視頻內容', 'AI/ML', '數據分析', '全棧開發', '前端開發'],
    datasets: [
      {
        label: '預期增長率',
        data: [32, 29, 26, 22, 17, 16],
        backgroundColor: [
          'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
          'linear-gradient(135deg, #45b7d1 0%, #096bde 100%)',
          'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)',
          'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
          'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)',
        ],
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
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
        text: '2025年各技術領域就業增長預測',
        font: {
          size: 18,
          weight: 'bold',
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
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `預期增長: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
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
          callback: function(value) {
            return value + '%';
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
            weight: '500',
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
          maxRotation: 45,
        },
      },
    },
    animation: {
      duration: 2500,
      easing: 'easeOutCubic',
      delay: (context) => {
        return context.dataIndex * 200;
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const growthData = [
    { field: '網絡安全', growth: 32, color: 'from-red-400 to-red-600' },
    { field: '視頻內容', growth: 29, color: 'from-teal-400 to-teal-600' },
    { field: 'AI/ML', growth: 26, color: 'from-blue-400 to-blue-600' },
    { field: '數據分析', growth: 22, color: 'from-yellow-400 to-orange-500' },
    { field: '全棧開發', growth: 17, color: 'from-purple-500 to-purple-700' },
    { field: '前端開發', growth: 16, color: 'from-cyan-400 to-blue-500' },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="h-96 p-6">
        <Bar data={data} options={options} />
      </div>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {growthData.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className={`w-3 h-8 rounded-full bg-gradient-to-b ${item.color}`}></div>
              <div>
                <p className="text-xs font-medium text-gray-600">{item.field}</p>
                <p className="text-lg font-bold text-gray-800">{item.growth}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmploymentGrowthForecastChart;