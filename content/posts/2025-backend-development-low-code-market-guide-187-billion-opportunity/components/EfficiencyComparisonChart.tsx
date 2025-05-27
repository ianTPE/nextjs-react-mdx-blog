"use client";

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
  TooltipItem
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

const EfficiencyComparisonChart: React.FC = () => {
  const data = {
    labels: [
      '開發時間\n(週)',
      '學習成本\n(月)',
      '維護複雜度\n(1-10分)',
      '部署速度\n(小時)',
      '迭代週期\n(天)',
      '團隊協作\n效率指數'
    ],
    datasets: [
      {
        label: '傳統後端開發',
        data: [12, 6, 8, 24, 14, 60],
        backgroundColor: 'rgba(156, 163, 175, 0.8)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      },
      {
        label: '低程式碼後端開發',
        data: [2, 1, 3, 1, 2, 90],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: '傳統 vs 低程式碼後端開發效率對比',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(34, 197, 94, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const units = ['週', '月', '分', '小時', '天', '分'];
            const unit = units[context.dataIndex] || '';
            return `${context.dataset.label}: ${context.parsed.y}${unit}`;
          },
          afterLabel: (context: TooltipItem<'bar'>) => {
            if (context.datasetIndex === 1) {
              const improvements = [
                '效率提升 83%',
                '學習時間縮短 83%', 
                '維護複雜度降低 63%',
                '部署速度提升 96%',
                '迭代週期縮短 86%',
                '協作效率提升 50%'
              ];
              return `💡 ${improvements[context.dataIndex]}`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 0,
          minRotation: 0
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">10x</div>
            <div className="text-gray-600">開發速度提升</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">90%</div>
            <div className="text-gray-600">開發時間縮短</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$4.4M</div>
            <div className="text-gray-600">平均3年商業價值增長</div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-700">
          <p className="font-medium">💡 關鍵洞察：低程式碼平台讓企業避免招聘2名IT開發人員，3年內獲得440萬美元業務價值增長</p>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyComparisonChart;