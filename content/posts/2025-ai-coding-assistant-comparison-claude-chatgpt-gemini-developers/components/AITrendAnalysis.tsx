"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TrendData {
  platform: string;
  current: number;
  potential: number;
  trend: 'rising' | 'stable' | 'declining';
}

const AITrendAnalysis: React.FC = () => {
  const trendData: TrendData[] = [
    { platform: 'Claude', current: 56, potential: 58, trend: 'rising' },
    { platform: 'ChatGPT', current: 49, potential: 52, trend: 'rising' },
    { platform: 'Gemini', current: 47, potential: 50, trend: 'rising' },
    { platform: 'DeepSeek', current: 42, potential: 48, trend: 'rising' },
    { platform: 'Grok', current: 32, potential: 40, trend: 'rising' },
  ];

  const data = {
    labels: trendData.map(item => item.platform),
    datasets: [
      {
        label: '當前評分',
        data: trendData.map(item => item.current),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: '預期潛力',
        data: trendData.map(item => item.potential),
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
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
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'AI 平台發展趨勢與潛力分析',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex;
            const improvement = trendData[dataIndex].potential - trendData[dataIndex].current;
            return `預期提升：+${improvement} 分`;
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
          text: '評分 (滿分60)',
        },
        ticks: {
          stepSize: 10,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'AI 平台',
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const getRecommendation = (platform: string): string => {
    switch (platform) {
      case 'Claude':
        return '🥇 首選推薦：日常開發、快速原型';
      case 'ChatGPT':
        return '📚 學習首選：技術原理、方案對比';
      case 'Gemini':
        return '🏢 企業級：安全要求高的大型項目';
      case 'DeepSeek':
        return '🤖 Thinking優勢：邏輯分析、結構化思考';
      case 'Grok':
        return '🎯 簡潔派：快速概覽、重點突出';
      default:
        return '';
    }
  };

  return (
    <div className="w-full my-8">
      <div className="p-4 bg-white rounded-lg shadow-md min-h-[450px] max-h-[550px]">
        <Line data={data} options={options} />
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h4 className="font-bold text-lg mb-4 text-gray-800">🚀 2025年AI選擇建議</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {trendData.map((item) => (
            <div key={item.platform} className="flex items-start p-3 bg-white rounded-lg shadow-sm">
              <div className="flex-1">
                <div className="font-medium text-gray-800 mb-1">{item.platform}</div>
                <div className="text-xs text-gray-600 mb-2">
                  當前: {item.current}/60 → 潛力: {item.potential}/60
                </div>
                <div className="text-xs text-blue-600 font-medium">
                  {getRecommendation(item.platform)}
                </div>
              </div>
              <div className="text-green-500 text-xs font-bold">
                📈 +{item.potential - item.current}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-yellow-800">
            <strong>💡 專家建議：</strong>
            選擇AI工具時，不要只看當前評分，更要考慮您的具體使用場景和團隊需求。
            最佳策略是建立多AI協作工作流，讓每個工具在其擅長的領域發揮最大價值。
          </p>
        </div>
      </div>
    </div>
  );
};

export default AITrendAnalysis;