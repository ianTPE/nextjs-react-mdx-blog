"use client";

import { useMemo } from 'react';
import type {
  ChartOptions,
  TooltipItem,
  ChartTypeRegistry
} from 'chart.js';
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

// 註冊ChartJS組件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const PlatformComparisonChart: React.FC = () => {
  // 設定圖表是否在桌面版
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;
  
  // 圖表數據
  const data: ChartData = useMemo(() => ({
    labels: ['Bubble', 'Adalo', 'FlutterFlow', 'Glide', 'Thunkable', 'AppMaster'],
    datasets: [
      {
        label: '初級開發者時薪 (USD)',
        data: [50, 40, 40, 40, 30, 50],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '高級開發者時薪 (USD)',
        data: [150, 120, 120, 100, 90, 150],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }), []);

  // 圖表選項
  const options: ChartOptions<'bar'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: isDesktop,
    plugins: {
      legend: {
        position: (isDesktop ? 'top' : 'bottom') as 'top' | 'bottom',
      },
      title: {
        display: true,
        text: '各無程式碼平台自由職業者時薪比較 (2025)',
        font: {
          size: 16,
        }
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<keyof ChartTypeRegistry>) => 
            `${context.dataset.label}: $${context.parsed.y}/hr`
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
          text: '時薪 (USD)'
        },
        ticks: {
          callback: (value: string | number) => `$${value}`
        }
      }
    }
  }), [isDesktop]);

  return (
    <div className="w-full my-8 p-4 pb-8 bg-white rounded-lg shadow-md min-h-[300px] max-h-[350px] sm:min-h-[350px] sm:max-h-[400px] lg:min-h-[400px] lg:max-h-[500px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PlatformComparisonChart;
