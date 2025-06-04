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

interface ModeComparison {
  scenario: string;
  thinkingMode: number;
  normalMode: number;
  recommendation: 'thinking' | 'normal' | 'depends';
  description: string;
}

const AIModeComparison: React.FC = () => {
  const modeData: ModeComparison[] = [
    {
      scenario: '學習新技術',
      thinkingMode: 9,
      normalMode: 6,
      recommendation: 'thinking',
      description: '需要理解思考過程和原理'
    },
    {
      scenario: '快速原型開發',
      thinkingMode: 7,
      normalMode: 9,
      recommendation: 'normal',
      description: '需要直接可用的代碼方案'
    },
    {
      scenario: '複雜架構設計',
      thinkingMode: 9,
      normalMode: 7,
      recommendation: 'thinking',
      description: '需要深度分析和權衡'
    },
    {
      scenario: '緊急修Bug',
      thinkingMode: 6,
      normalMode: 9,
      recommendation: 'normal',
      description: '需要快速定位和解決'
    },
    {
      scenario: '技術方案對比',
      thinkingMode: 8,
      normalMode: 6,
      recommendation: 'thinking',
      description: '需要詳細的利弊分析'
    },
    {
      scenario: '代碼實現',
      thinkingMode: 6,
      normalMode: 8,
      recommendation: 'normal',
      description: '需要簡潔直接的實現'
    },
  ];

  const data = {
    labels: modeData.map(item => item.scenario),
    datasets: [
      {
        label: 'Thinking 模式',
        data: modeData.map(item => item.thinkingMode),
        backgroundColor: '#8B5CF6',
        borderColor: '#8B5CF6',
        borderWidth: 1,
      },
      {
        label: '普通模式',
        data: modeData.map(item => item.normalMode),
        backgroundColor: '#06B6D4',
        borderColor: '#06B6D4',
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
        text: 'AI 模式選擇效果對比：Thinking vs 普通模式',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex;
            const item = modeData[dataIndex];
            const recommendation = item.recommendation === 'thinking' ? '推薦: Thinking模式' : 
                                 item.recommendation === 'normal' ? '推薦: 普通模式' : '推薦: 視情況而定';
            return [`${recommendation}`, `${item.description}`];
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
          text: '適用度評分',
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
    <div className="w-full my-8">
      <div className="p-4 bg-white rounded-lg shadow-md min-h-[450px] max-h-[550px]">
        <Bar data={data} options={options} />
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg">
        <h4 className="font-bold text-lg mb-4 text-gray-800">🎭 AI 模式選擇指南</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <h5 className="font-semibold text-purple-800 mb-2">🧠 Thinking 模式優勢</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• 思考過程透明，可追蹤推理路徑</li>
              <li>• 對複雜問題分析更深入</li>
              <li>• 自我修正能力更強</li>
              <li>• 適合學習和理解場景</li>
            </ul>
          </div>
          
          <div className="p-3 bg-cyan-100 rounded-lg">
            <h5 className="font-semibold text-cyan-800 mb-2">⚡ 普通模式優勢</h5>
            <ul className="text-sm text-cyan-700 space-y-1">
              <li>• 回答簡潔直接，效率更高</li>
              <li>• 適合快速開發和實現</li>
              <li>• 有時反而更符合實際需求</li>
              <li>• 降低信息過載風險</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {modeData.map((item, index) => (
            <div key={index} className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-gray-300">
              <div className="font-medium text-gray-800 mb-1">{item.scenario}</div>
              <div className="text-xs text-gray-600 mb-2">{item.description}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.recommendation === 'thinking' 
                    ? 'bg-purple-200 text-purple-800' 
                    : 'bg-cyan-200 text-cyan-800'
                }`}>
                  推薦: {item.recommendation === 'thinking' ? 'Thinking' : '普通模式'}
                </span>
                <div className="text-xs text-gray-500">
                  {item.recommendation === 'thinking' ? item.thinkingMode : item.normalMode}/10
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-yellow-800">
            <strong>💡 重要發現：</strong>
            同一個AI在不同模式下的表現差異可能很大，選擇合適的模式和選擇合適的AI同樣重要。
            建議根據具體場景靈活切換，而不是固守單一模式。
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIModeComparison;