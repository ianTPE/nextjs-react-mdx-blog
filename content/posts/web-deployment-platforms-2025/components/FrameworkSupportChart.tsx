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
  ChartOptions
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface FrameworkSupport {
  framework: string;
  cloudflareWorkers: number;
  vercel: number;
  netlify: number;
}

const FrameworkSupportChart: React.FC = () => {
  const frameworkData: FrameworkSupport[] = [
    { framework: 'Next.js 15', cloudflareWorkers: 95, vercel: 100, netlify: 75 },
    { framework: 'Remix', cloudflareWorkers: 100, vercel: 85, netlify: 70 },
    { framework: 'Nuxt.js', cloudflareWorkers: 90, vercel: 80, netlify: 95 },
    { framework: 'SvelteKit', cloudflareWorkers: 95, vercel: 85, netlify: 80 },
    { framework: 'Astro', cloudflareWorkers: 85, vercel: 90, netlify: 100 },
    { framework: 'Qwik', cloudflareWorkers: 100, vercel: 70, netlify: 60 }
  ];

  const chartData = {
    labels: frameworkData.map(d => d.framework),
    datasets: [
      {
        label: 'Cloudflare Workers',
        data: frameworkData.map(d => d.cloudflareWorkers),
        borderColor: '#f38020',
        backgroundColor: '#f3802040',
        borderWidth: 3,
        pointBackgroundColor: '#f38020',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      },
      {
        label: 'Vercel',
        data: frameworkData.map(d => d.vercel),
        borderColor: '#000000',
        backgroundColor: '#00000040',
        borderWidth: 2,
        pointBackgroundColor: '#000000',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      },
      {
        label: 'Netlify',
        data: frameworkData.map(d => d.netlify),
        borderColor: '#00c7b7',
        backgroundColor: '#00c7b740',
        borderWidth: 2,
        pointBackgroundColor: '#00c7b7',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }
    ]
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '主流框架支援度評分 (0-100)',
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
            const value = context.parsed.r;
            return `${label}: ${value}/100`;
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: '#e5e7eb'
        },
        angleLines: {
          color: '#d1d5db'
        }
      }
    }
  };

  // 計算平均支援度
  const avgSupport = {
    cloudflareWorkers: Math.round(frameworkData.reduce((acc, d) => acc + d.cloudflareWorkers, 0) / frameworkData.length),
    vercel: Math.round(frameworkData.reduce((acc, d) => acc + d.vercel, 0) / frameworkData.length),
    netlify: Math.round(frameworkData.reduce((acc, d) => acc + d.netlify, 0) / frameworkData.length)
  };

  return (
    <div className="w-full my-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="h-96">
        <Radar data={chartData} options={options} />
      </div>
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-500">
            <div className="font-semibold text-orange-800">🚀 Cloudflare Workers</div>
            <div className="text-2xl font-bold text-orange-600 my-1">{avgSupport.cloudflareWorkers}%</div>
            <div className="text-orange-700">平均支援度</div>
            <div className="text-xs text-orange-600 mt-2">
              特別擅長邊緣優先框架（Remix, Qwik）
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded border-l-4 border-gray-500">
            <div className="font-semibold text-gray-800">⚡ Vercel</div>
            <div className="text-2xl font-bold text-gray-600 my-1">{avgSupport.vercel}%</div>
            <div className="text-gray-700">平均支援度</div>
            <div className="text-xs text-gray-600 mt-2">
              Next.js 原生支援最佳
            </div>
          </div>
          <div className="bg-teal-50 p-4 rounded border-l-4 border-teal-500">
            <div className="font-semibold text-teal-800">🌐 Netlify</div>
            <div className="text-2xl font-bold text-teal-600 my-1">{avgSupport.netlify}%</div>
            <div className="text-teal-700">平均支援度</div>
            <div className="text-xs text-teal-600 mt-2">
              靜態生成框架支援優秀
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
            <div className="font-semibold text-blue-800 mb-2">📊 支援度評分標準</div>
            <div className="text-blue-700 text-sm space-y-1">
              <div>• <strong>100%：</strong>完整原生支援，所有功能無限制</div>
              <div>• <strong>90-99%：</strong>優秀支援，少數高級功能有限制</div>
              <div>• <strong>80-89%：</strong>良好支援，部分功能需要適配</div>
              <div>• <strong>70-79%：</strong>基本支援，需要較多配置和調整</div>
              <div>• <strong>60-69%：</strong>有限支援，功能受到明顯限制</div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
            <div className="font-semibold text-green-800 mb-2">🏆 關鍵洞察</div>
            <div className="text-green-700 text-sm space-y-1">
              <div>• <strong>Cloudflare Workers</strong> 在邊緣優先框架上表現最佳，特別是 Remix 和 Qwik</div>
              <div>• <strong>Vercel</strong> 在 Next.js 上仍保持絕對優勢，但在其他框架上競爭力下降</div>
              <div>• <strong>Netlify</strong> 在傳統 JAMstack 框架（Astro, Nuxt SSG）上仍有優勢</div>
              <div>• 總體而言，三大平台的支援度差距正在縮小，技術選型的自由度大幅提升</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkSupportChart;