"use client";

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 註冊 Chart.js 組件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 定義數據類型
interface TechStackItem {
  category: string;
  adoption: number;
  tools: string;
}

const VictoryTechStackChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 技術棧數據
  const techStackData: TechStackItem[] = [
    { category: 'AI 需求分析', tools: 'GPT-4, BERT, AWS Comprehend', adoption: 85 },
    { category: '智能編碼', tools: 'GitHub Copilot, CodeWhisperer', adoption: 75 },
    { category: '自適應流水線', tools: 'Harness AI, Azure ML', adoption: 60 },
    { category: '智能運維', tools: 'Moogsoft, Google AIOps', adoption: 70 },
    { category: '數據閉環', tools: 'MLflow, Elasticsearch', adoption: 65 },
  ];

  // 顏色配置
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (!isMounted) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
        <div className="w-full h-[350px] flex items-center justify-center bg-gray-50">
          <p>載入技術棧圖表...</p>
        </div>
      </div>
    );
  }

  // Chart.js 配置
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const value = context.parsed.x || 0;
            const index = context.dataIndex;
            const toolTip = techStackData[index]?.tools || '';
            return [`${value}% 採用率`, `工具: ${toolTip}`];
          }
        }
      },
    },
    scales: {
      x: {
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
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      y: {
        ticks: {
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        grid: {
          display: false
        }
      }
    },
  };

  const data: ChartData<'bar'> = {
    labels: techStackData.map(item => item.category),
    datasets: [
      {
        data: techStackData.map(item => item.adoption),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 25,
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg -ml-2 sm:ml-0">
      <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
      <div className="h-[350px] w-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default VictoryTechStackChart;
