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

interface AIScoreData {
  platform: string;
  score: number;
  tier: string;
  color: string;
}

const AIScoreComparison: React.FC = () => {
  const scoreData: AIScoreData[] = [
    { platform: 'Claude', score: 56, tier: '第一梯隊', color: '#8B5CF6' },
    { platform: 'ChatGPT', score: 49, tier: '第二梯隊', color: '#06B6D4' },
    { platform: 'Gemini', score: 47, tier: '第二梯隊', color: '#F59E0B' },
    { platform: 'DeepSeek', score: 42, tier: '第二梯隊', color: '#6366F1' },
    { platform: 'Grok', score: 32, tier: '中等表現', color: '#EF4444' },
    { platform: '豆包', score: 33, tier: '中等表現', color: '#EC4899' },
    { platform: 'metaso.cn', score: 30, tier: '表現較差', color: '#84CC16' },
    { platform: 'Perplexity', score: 28, tier: '表現較差', color: '#F97316' },
    { platform: 'Felo', score: 25, tier: '表現較差', color: '#64748B' },
  ];

  const data = {
    labels: scoreData.map(item => item.platform),
    datasets: [
      {
        label: '總體評分 (滿分60)',
        data: scoreData.map(item => item.score),
        backgroundColor: scoreData.map(item => item.color),
        borderColor: scoreData.map(item => item.color),
        borderWidth: 1,
      },
    ],
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
        text: 'AI 平台技術回答能力總體評分對比',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex;
            const tier = scoreData[dataIndex].tier;
            return `分類：${tier}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        title: {
          display: true,
          text: '評分 (分)',
        },
        ticks: {
          stepSize: 10,
        },
      },
      x: {
        title: {
          display: true,
          text: 'AI 平台',
        },
      },
    },
  };

  return (
    <div className="w-full my-8 p-4 bg-white rounded-lg shadow-md min-h-[400px] max-h-[500px]">
      <Bar data={data} options={options} />
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">評分說明：</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
            <span>第一梯隊 (50+)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-cyan-500 rounded mr-2"></div>
            <span>第二梯隊 (40-49)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>中等表現 (30-39)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIScoreComparison;