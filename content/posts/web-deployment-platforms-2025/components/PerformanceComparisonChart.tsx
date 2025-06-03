"use client";

import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend);

interface PerformanceData {
  platform: string;
  coldStart: number;
  ttfb: number;
  color: string;
}

const PerformanceComparisonChart: React.FC = () => {
  const performanceData: PerformanceData[] = [
    {
      platform: 'Cloudflare Workers',
      coldStart: 5,
      ttfb: 22,
      color: '#f38020'
    },
    {
      platform: 'Vercel Edge Functions',
      ttfb: 115,
      coldStart: 15,
      color: '#000000'
    },
    {
      platform: 'Vercel Serverless',
      coldStart: 300,
      ttfb: 180,
      color: '#666666'
    },
    {
      platform: 'Netlify Functions',
      coldStart: 500,
      ttfb: 220,
      color: '#00c7b7'
    }
  ];

  const chartData = {
    labels: performanceData.map(d => d.platform),
    datasets: [
      {
        label: '冷啟動時間 (ms)',
        data: performanceData.map(d => d.coldStart),
        backgroundColor: performanceData.map(d => `${d.color}80`),
        borderColor: performanceData.map(d => d.color),
        borderWidth: 2,
        yAxisID: 'y'
      },
      {
        label: 'TTFB 平均延遲 (ms)',
        data: performanceData.map(d => d.ttfb),
        backgroundColor: performanceData.map(d => `${d.color}40`),
        borderColor: performanceData.map(d => d.color),
        borderWidth: 2,
        borderDash: [5, 5],
        yAxisID: 'y'
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: '2025 年平台性能比較：冷啟動時間 vs TTFB',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}ms`;
          },
          footer: function(tooltipItems) {
            const platform = tooltipItems[0].label;
            if (platform === 'Cloudflare Workers') {
              return '🚀 最佳性能，V8 Isolates 技術';
            } else if (platform.includes('Vercel')) {
              return '⚡ AWS Lambda 基礎架構';
            }
            return '📊 傳統 Serverless 架構';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        type: 'logarithmic' as const,
        min: 1,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '延遲時間 (ms) - 對數刻度'
        },
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          callback: function(value) {
            return value + 'ms';
          }
        }
      }
    }
  };

  return (
    <div className="w-full my-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="h-96">
        <Bar data={chartData} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          <strong>關鍵洞察：</strong>Cloudflare Workers 在冷啟動時間方面領先其他平台 <span className="text-orange-600 font-semibold">60-100 倍</span>，
          在 TTFB 方面也有 <span className="text-orange-600 font-semibold">5-10 倍</span> 的優勢。
        </p>
        <p>
          📝 數據來源：2025 年 6 月全球 15 個測試節點的平均值，測試時間：UTC 2025-06-03
        </p>
      </div>
    </div>
  );
};

export default PerformanceComparisonChart;