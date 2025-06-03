"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface CostData {
  scale: string;
  cloudflareWorkers: number;
  vercel: number;
  netlify: number;
}

const CostComparisonChart: React.FC = () => {
  const costData: CostData[] = [
    {
      scale: '小型專案\n(<10萬 PV/月)',
      cloudflareWorkers: 0,
      vercel: 0,
      netlify: 0
    },
    {
      scale: '中型專案\n(100萬 PV/月)',
      cloudflareWorkers: 12,
      vercel: 520,
      netlify: 219
    },
    {
      scale: '大型專案\n(1000萬 PV/月)',
      cloudflareWorkers: 75,
      vercel: 7200,
      netlify: 1800
    },
    {
      scale: '企業級\n(1億 PV/月)',
      cloudflareWorkers: 650,
      vercel: 65000,
      netlify: 15000
    }
  ];

  const chartData = {
    labels: costData.map(d => d.scale),
    datasets: [
      {
        label: 'Cloudflare Workers',
        data: costData.map(d => d.cloudflareWorkers),
        backgroundColor: '#f3802080',
        borderColor: '#f38020',
        borderWidth: 2
      },
      {
        label: 'Vercel',
        data: costData.map(d => d.vercel),
        backgroundColor: '#00000080',
        borderColor: '#000000',
        borderWidth: 2
      },
      {
        label: 'Netlify',
        data: costData.map(d => d.netlify),
        backgroundColor: '#00c7b780',
        borderColor: '#00c7b7',
        borderWidth: 2
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '不同規模專案的月度成本比較 (USD)',
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
            return `${label}: $${value.toLocaleString()}/月`;
          },
          afterLabel: function(context) {
            if (context.dataIndex > 0) {
              const cfCost = costData[context.dataIndex].cloudflareWorkers;
              const currentCost = context.parsed.y;
              if (cfCost > 0 && currentCost > cfCost) {
                const multiplier = (currentCost / cfCost).toFixed(1);
                return `比 Cloudflare Workers 貴 ${multiplier}x`;
              }
            }
            return '';
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
          maxRotation: 0,
          font: {
            size: 11
          }
        }
      },
      y: {
        type: 'logarithmic' as const,
        title: {
          display: true,
          text: '月度成本 (USD) - 對數刻度'
        },
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          callback: function(value) {
            if (value === 0) return '$0';
            return '$' + Number(value).toLocaleString();
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
      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
            <div className="font-semibold text-orange-800">🏆 Cloudflare Workers</div>
            <div className="text-orange-700">企業級規模下僅需 $650/月</div>
          </div>
          <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-500">
            <div className="font-semibold text-gray-800">📈 Vercel</div>
            <div className="text-gray-700">同規模下需要 $65,000/月</div>
          </div>
          <div className="bg-teal-50 p-3 rounded border-l-4 border-teal-500">
            <div className="font-semibold text-teal-800">📊 Netlify</div>
            <div className="text-teal-700">同規模下需要 $15,000/月</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
          <p className="mb-2">
            <strong>💡 成本分析亮點：</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>企業級規模下，Vercel 比 Cloudflare Workers 貴 <span className="font-semibold text-red-600">100 倍</span></li>
            <li>Netlify 比 Cloudflare Workers 貴 <span className="font-semibold text-red-600">23 倍</span></li>
            <li>Cloudflare Workers 的成本隨規模增長近似線性，而其他平台呈指數增長</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CostComparisonChart;