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

interface DimensionData {
  [key: string]: number[];
}

const DimensionRadarChart: React.FC = () => {
  const dimensions = [
    '技術深度',
    '實用性', 
    '結構性',
    '完整性',
    '安全性考量',
    '創新性'
  ];

  const platformData: DimensionData = {
    'Claude': [9, 10, 10, 9, 9, 9],
    'ChatGPT': [9, 8, 8, 8, 8, 8],
    'Gemini': [10, 6, 8, 10, 10, 3],
    '千問': [6, 7, 8, 6, 5, 6],
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
    labels: dimensions,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: '頂級 AI 平台各維度能力雷達圖對比',
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
        <p className="font-medium mb-2">維度說明：</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div><strong>技術深度：</strong>對問題的理解程度和技術細節</div>
          <div><strong>實用性：</strong>代碼可用性和解決方案可行性</div>
          <div><strong>結構性：</strong>回答組織和邏輯連貫性</div>
          <div><strong>完整性：</strong>是否涵蓋問題各個方面</div>
          <div><strong>安全性考量：</strong>對安全風險的認知和防護</div>
          <div><strong>創新性：</strong>獨特見解和替代方案</div>
        </div>
      </div>
    </div>
  );
};

export default DimensionRadarChart;