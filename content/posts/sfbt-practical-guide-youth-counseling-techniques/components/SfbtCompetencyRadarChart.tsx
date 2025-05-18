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

// 註冊必須的 ChartJS 元件
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SfbtCompetencyRadarChart = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 優化的色彩方案
  const colors = {
    beginner: {
      bg: 'rgba(99, 102, 241, 0.2)',
      border: 'rgba(99, 102, 241, 0.8)',
      hover: 'rgba(99, 102, 241, 0.4)'
    },
    intermediate: {
      bg: 'rgba(236, 72, 153, 0.2)',
      border: 'rgba(236, 72, 153, 0.8)',
      hover: 'rgba(236, 72, 153, 0.4)'
    },
    advanced: {
      bg: 'rgba(14, 165, 233, 0.2)',
      border: 'rgba(14, 165, 233, 0.8)',
      hover: 'rgba(14, 165, 233, 0.4)'
    }
  };

  const data = {
    labels: [
      '例外探索能力',
      '提問技巧',
      '系統合作',
      '目標設定',
      '資源放大',
      '小步驟設計',
      '積極態度維持',
    ],
    datasets: [
      {
        label: '初學者階段',
        data: [2, 2, 1, 3, 2, 2, 4],
        backgroundColor: colors.beginner.bg,
        borderColor: colors.beginner.border,
        borderWidth: 2,
        pointBackgroundColor: colors.beginner.border,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.beginner.border,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
      {
        label: '完成初階課程',
        data: [4, 5, 3, 6, 4, 5, 7],
        backgroundColor: colors.intermediate.bg,
        borderColor: colors.intermediate.border,
        borderWidth: 2,
        pointBackgroundColor: colors.intermediate.border,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.intermediate.border,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
      {
        label: '完成進階課程',
        data: [7, 8, 6, 8, 7, 8, 9],
        backgroundColor: colors.advanced.bg,
        borderColor: colors.advanced.border,
        borderWidth: 2,
        pointBackgroundColor: colors.advanced.border,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.advanced.border,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: isMobile ? 1 : 1.2,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: "'Noto Sans TC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: isMobile ? 12 : 14,
            weight: 500
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 8,
        cornerRadius: 8,
        usePointStyle: true,
        callbacks: {
          label: (context: TooltipItem<'radar'>) => {
            const label = context.dataset?.label || '';
            const value = context.parsed.r || 0;
            return `${label}: ${value}分`;
          }
        },
        titleFont: {
          family: "'Noto Sans TC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 14,
          weight: 600
        },
        bodyFont: {
          family: "'Noto Sans TC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 13
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        beginAtZero: true,
        ticks: {
          stepSize: 2,
          display: !isMobile,
          backdropColor: 'transparent',
          font: {
            size: 10,
          },
        },
        pointLabels: {
          font: {
            family: "'Noto Sans TC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: isMobile ? 11 : (isTablet ? 12 : 13),
            weight: 500
          },
          padding: isMobile ? 8 : 12,
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">
          SFBT不同學習階段能力雷達圖 <span className="text-sm font-normal text-gray-500">(0-10分)</span>
        </h3>
        <div className="w-full flex justify-center" style={{ height: isMobile ? '300px' : (isTablet ? '400px' : '450px') }}>
          <Radar data={data} options={options} />
        </div>
        <div className="text-xs sm:text-sm text-gray-500 mt-3 text-center px-2">
          * 數據基於研習課程參與者自評與講師評量
        </div>
      </div>
    </div>
  );
};

export default SfbtCompetencyRadarChart;