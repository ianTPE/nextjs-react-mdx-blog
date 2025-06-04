"use client";

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ScenarioData {
  [key: string]: number[];
}

const ScenarioRadarChart: React.FC = () => {
  const scenarios = [
    '緊急修Bug',
    '學習新技術',
    '架構設計',
    '快速原型',
    '技術選型',
    '流程梳理',
    '安全評估',
    '團隊培訓'
  ];

  const platformData: ScenarioData = {
    'Claude': [9, 8, 8, 10, 7, 8, 8, 8],
    'ChatGPT': [7, 10, 9, 7, 9, 7, 7, 9],
    'Gemini': [6, 8, 10, 5, 8, 6, 10, 7],
    '千問': [6, 6, 6, 8, 6, 9, 5, 7],
  };

  const colors = {
    'Claude': { border: '#8B5CF6', background: 'rgba(139, 92, 246, 0.2)' },
    'ChatGPT': { border: '#06B6D4', background: 'rgba(6, 182, 212, 0.2)' },
    'Gemini': { border: '#F59E0B', background: 'rgba(245, 158, 11, 0.2)' },
    '千問': { border: '#10B981', background: 'rgba(16, 185, 129, 0.2)' },
  };

  const datasets = Object.entries(platformData).map(([platform, scores]) => ({
    label: platform,
    data: scores,
    borderColor: colors[platform as keyof typeof colors].border,
    backgroundColor: colors[platform as keyof typeof colors].background,
    borderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
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
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'AI平台使用場景適配度分析',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.r}/10`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          font: {
            size: 11,
          },
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2,
          display: true,
          backdropColor: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  };

  return (
    <div className="w-full my-8 p-4 bg-white rounded-lg shadow-md min-h-[500px] max-h-[600px]">
      <Radar data={data} options={options} />
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">場景說明：</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div><strong>緊急修Bug：</strong>需要快速可用的解決方案</div>
          <div><strong>學習新技術：</strong>需要深度理解和教學解釋</div>
          <div><strong>架構設計：</strong>需要全面的技術分析和比較</div>
          <div><strong>快速原型：</strong>需要簡潔實用的實現方案</div>
          <div><strong>技術選型：</strong>需要詳細的方案對比分析</div>
          <div><strong>流程梳理：</strong>需要結構化的信息組織</div>
          <div><strong>安全評估：</strong>需要深度的安全風險分析</div>
          <div><strong>團隊培訓：</strong>需要清晰的概念講解能力</div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioRadarChart;