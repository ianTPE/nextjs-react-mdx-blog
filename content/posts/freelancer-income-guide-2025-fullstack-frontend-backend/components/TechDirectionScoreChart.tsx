'use client';
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

const TechDirectionScoreChart: React.FC = () => {
  const data = {
    labels: [
      '市場需求度',
      '技術穩定性',
      '收入潛力',
      '發展前景',
      '工作靈活性',
      '入門門檻(低分更易入門)'
    ],
    datasets: [
      {
        label: '後端自動化',
        data: [9, 7, 8, 9, 8, 4], // 入門門檻反轉 (6 -> 4)
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: '前端電商',
        data: [8, 8, 7, 8, 9, 3], // 入門門檻反轉 (7 -> 3)
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: '全棧MVP',
        data: [10, 6, 8, 9, 10, 3], // 入門門檻反轉 (7 -> 3)
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle' as const,
          padding: 25,
          font: {
            size: 13,
            weight: '600' as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: '技術方向綜合評分對比 (滿分10分)',
        font: {
          size: 18,
          weight: 'bold' as const,
          family: 'Inter, system-ui, sans-serif',
        },
        color: '#1f2937',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 12,
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            const label = context.dataset.label;
            const value = context.parsed.r;
            return `${label}: ${value}/10分`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(156, 163, 175, 0.3)',
          lineWidth: 1,
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          circular: true,
        },
        pointLabels: {
          font: {
            size: 12,
            weight: '600' as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
          padding: 20,
        },
        ticks: {
          font: {
            size: 10,
          },
          color: '#9ca3af',
          backdropColor: 'rgba(255, 255, 255, 0.8)',
          backdropPadding: 4,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart' as const,
    },
    interaction: {
      intersect: false,
      mode: 'point' as const,
    },
  };

  const directions = [
    {
      name: '後端自動化',
      color: 'from-red-400 to-red-600',
      highlight: '企業流程自動化需求爆發',
      scores: { market: 9, stability: 7, income: 8, future: 9, flexibility: 8, entry: 6 }
    },
    {
      name: '前端電商',
      color: 'from-blue-400 to-blue-600',
      highlight: 'Headless Commerce 趨勢',
      scores: { market: 8, stability: 8, income: 7, future: 8, flexibility: 9, entry: 7 }
    },
    {
      name: '全棧MVP',
      color: 'from-green-400 to-green-600',
      highlight: '創業公司首選技術棧',
      scores: { market: 10, stability: 6, income: 8, future: 9, flexibility: 10, entry: 7 }
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-slate-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="h-[500px] p-6">
        <Radar data={data} options={options} />
      </div>
      
      <div className="px-6 pb-6">
        <div className="bg-white rounded-xl p-5 shadow-inner border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">📊 技術方向特色分析</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {directions.map((direction, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${direction.color}`}></div>
                  <h5 className="font-semibold text-gray-800">{direction.name}</h5>
                </div>
                <p className="text-xs text-gray-600 mb-3">{direction.highlight}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">市場需求</span>
                    <span className="font-medium">{direction.scores.market}/10</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">收入潛力</span>
                    <span className="font-medium">{direction.scores.income}/10</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">工作靈活性</span>
                    <span className="font-medium">{direction.scores.flexibility}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-center text-amber-800">
              <span className="font-semibold">💡 提示：</span>
              入門門檻分數越低表示越容易入門，其他指標分數越高越好
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechDirectionScoreChart;