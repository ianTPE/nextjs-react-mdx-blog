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

interface UseCaseScores {
  [platform: string]: {
    [scenario: string]: number;
  };
}

const UseCaseChart: React.FC = () => {
  const scenarios = [
    '學習新技術',
    '快速原型開發', 
    '企業級架構',
    '標準化開發',
    '緊急修Bug',
    '技術選型'
  ];

  const useCaseScores: UseCaseScores = {
    'Claude': {
      '學習新技術': 8,
      '快速原型開發': 10,
      '企業級架構': 8,
      '標準化開發': 9,
      '緊急修Bug': 10,
      '技術選型': 8
    },
    'ChatGPT': {
      '學習新技術': 10,
      '快速原型開發': 7,
      '企業級架構': 7,
      '標準化開發': 7,
      '緊急修Bug': 6,
      '技術選型': 9
    },
    'Gemini': {
      '學習新技術': 6,
      '快速原型開發': 5,
      '企業級架構': 10,
      '標準化開發': 6,
      '緊急修Bug': 4,
      '技術選型': 8
    },
    '千問': {
      '學習新技術': 6,
      '快速原型開發': 8,
      '企業級架構': 4,
      '標準化開發': 6,
      '緊急修Bug': 7,
      '技術選型': 5
    }
  };

  const colors = [
    '#8B5CF6', // Claude - Purple
    '#06B6D4', // ChatGPT - Cyan  
    '#F59E0B', // Gemini - Amber
    '#10B981', // 千問 - Emerald
  ];

  const datasets = Object.entries(useCaseScores).map(([platform, scores], index) => ({
    label: platform,
    data: scenarios.map(scenario => scores[scenario]),
    backgroundColor: colors[index],
    borderColor: colors[index],
    borderWidth: 1,
  }));

  const data = {
    labels: scenarios,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'AI 平台使用場景適配度分析',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}/10`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: '適配度評分',
        },
        ticks: {
          stepSize: 2,
        },
      },
      x: {
        title: {
          display: true,
          text: '使用場景',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className="w-full my-8 p-4 bg-white rounded-lg shadow-md min-h-[450px] max-h-[550px]">
      <Bar data={data} options={options} />
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">場景說明：</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
          <div><strong>學習新技術：</strong>理解概念和原理解釋能力</div>
          <div><strong>快速原型開發：</strong>提供可用代碼的效率</div>
          <div><strong>企業級架構：</strong>安全性和規模化考量</div>
          <div><strong>標準化開發：</strong>符合最佳實踐的程度</div>
          <div><strong>緊急修Bug：</strong>快速定位和解決問題</div>
          <div><strong>技術選型：</strong>方案對比和推薦能力</div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseChart;