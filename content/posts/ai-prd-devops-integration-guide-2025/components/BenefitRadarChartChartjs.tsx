"use client";

import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type TooltipItem
} from 'chart.js';

// Register Chart.js elements
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Define types for our data
interface BenefitDataItem {
  metric: string;
  traditional: number;
  ai: number;
  fullMark: number;
}

const benefitData: BenefitDataItem[] = [
  {
    metric: '需求準確率',
    traditional: 65,
    ai: 92,
    fullMark: 100,
  },
  {
    metric: '開發效率',
    traditional: 40,
    ai: 80,
    fullMark: 100,
  },
  {
    metric: '部署成功率',
    traditional: 85,
    ai: 98,
    fullMark: 100,
  },
  {
    metric: '故障響應速度',
    traditional: 30,
    ai: 90,
    fullMark: 100,
  },
  {
    metric: '代碼質量',
    traditional: 75,
    ai: 92,
    fullMark: 100,
  },
  {
    metric: '成本效益',
    traditional: 50,
    ai: 85,
    fullMark: 100,
  },
];

const BenefitRadarChartChartjs = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">傳統模式 vs AI 賦能模式效益對比</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入雷達圖...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: benefitData.map((d) => d.metric),
    datasets: [
      {
        label: '傳統模式',
        data: benefitData.map((d) => d.traditional),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ef4444',
        fill: true,
      },
      {
        label: 'AI 賦能模式',
        data: benefitData.map((d) => d.ai),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#22c55e',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: '#e5e7eb', // Equivalent to PolarGrid stroke
        },
        suggestedMin: 0,
        suggestedMax: 100,
        grid: {
            color: '#e5e7eb', // Grid line colors
        },
        pointLabels: {
          font: {
            size: 12, // Equivalent to PolarAngleAxis className="text-sm"
          },
          color: '#374151', // Text color for labels
        },
        ticks: { // For the radial axis numbers (0, 20, 40...)
            backdropColor: 'rgba(255, 255, 255, 0.75)', // Add a backdrop for better readability
            color: '#6b7280', // Color of the tick labels
            stepSize: 20
        }
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'radar'>) => {
            let label = ctx.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (ctx.parsed.r !== null) {
              label += ctx.parsed.r;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">傳統模式 vs AI 賦能模式效益對比</h3>
      <div className="relative w-full h-[400px]">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BenefitRadarChartChartjs;
