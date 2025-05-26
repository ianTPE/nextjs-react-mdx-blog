"use client";

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
  type ChartOptions,
} from 'chart.js';

// Register Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

// Define types for our data
interface ROITimelineItem {
  month: string;
  roi: number;
  investment: number;
  return: number;
}

const roiTimelineData: ROITimelineItem[] = [
  { month: '第1月', roi: -20, investment: 100, return: 80 },
  { month: '第3月', roi: -5, investment: 150, return: 145 },
  { month: '第6月', roi: 30, investment: 200, return: 260 },
  { month: '第9月', roi: 85, investment: 220, return: 407 },
  { month: '第12月', roi: 150, investment: 240, return: 600 },
  { month: '第18月', roi: 220, investment: 260, return: 832 },
];

const ROITrendChartChartjs = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">投資回報率（ROI）趨勢分析</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入ROI趨勢圖...</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: roiTimelineData.map((d) => d.month),
    datasets: [
      {
        label: 'ROI',
        data: roiTimelineData.map((d) => d.roi),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        yAxisID: 'yLeft',
        fill: true,
        tension: 0.4, // Equivalent to Recharts type="monotone"
      },
      {
        label: '累積投資',
        data: roiTimelineData.map((d) => d.investment),
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        yAxisID: 'yRight',
        fill: false,
        tension: 0.4,
      },
      {
        label: '累積回報',
        data: roiTimelineData.map((d) => d.return),
        borderColor: '#22c55e',
        backgroundColor: '#22c55e',
        yAxisID: 'yRight',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: '#e5e7eb',
          // TODO: Revisit dashed grid lines. borderDash: [3, 3], // Replicates strokeDasharray="3 3"
        },
      },
      yLeft: {
        type: 'linear' as const,
        position: 'left' as const,
        title: {
          display: true,
          text: 'ROI (%)',
          font: { size: 14 },
        },
        grid: {
          color: '#e5e7eb',
          // TODO: Revisit dashed grid lines. borderDash: [3, 3],
        },
      },
      yRight: {
        type: 'linear' as const,
        position: 'right' as const,
        title: {
          display: true,
          text: '金額 (萬元)',
          font: { size: 14 },
        },
        grid: {
          drawOnChartArea: false, // Important to prevent duplicate grid lines
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'line'>) => {
            let label = ctx.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (ctx.parsed.y !== null) {
              label += ctx.parsed.y;
              if (ctx.dataset.yAxisID === 'yLeft') {
                label += '%';
              }
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">投資回報率（ROI）趨勢分析</h3>
      <div className="relative w-full h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ROITrendChartChartjs;
