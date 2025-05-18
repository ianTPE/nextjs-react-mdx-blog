"use client";

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem,
  Colors
} from 'chart.js';

// 註冊必須的 ChartJS 元件
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors
);

const QuestionTypeDistributionChart = () => {
  // 使用 useState 和 useEffect 來處理視窗大小變化
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 640,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowDimensions.width < 768;

  // 優化的色彩方案 - 使用和諧色彩
  const data = {
    labels: ['奇蹟問句', '評量問句', '例外問句', '因應問句', '關係問句'],
    datasets: [
      {
        data: [25, 35, 20, 10, 10],
        backgroundColor: [
          'rgba(71, 120, 194, 0.8)',  // 深藍
          'rgba(105, 190, 163, 0.8)',  // 翠綠
          'rgba(243, 146, 55, 0.8)',   // 橙色
          'rgba(232, 93, 117, 0.8)',   // 粉紅
          'rgba(153, 115, 199, 0.8)',  // 紫色
        ],
        borderColor: [
          'rgba(71, 120, 194, 1)',
          'rgba(105, 190, 163, 1)',
          'rgba(243, 146, 55, 1)',
          'rgba(232, 93, 117, 1)',
          'rgba(153, 115, 199, 1)',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(71, 120, 194, 0.9)',
          'rgba(105, 190, 163, 0.9)',
          'rgba(243, 146, 55, 0.9)',
          'rgba(232, 93, 117, 0.9)',
          'rgba(153, 115, 199, 0.9)',
        ],
        hoverBorderColor: [
          'rgba(71, 120, 194, 1)',
          'rgba(105, 190, 163, 1)',
          'rgba(243, 146, 55, 1)',
          'rgba(232, 93, 117, 1)',
          'rgba(153, 115, 199, 1)',
        ],
        hoverBorderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  // 優化的圖表選項
  const options = {
    responsive: true,
    maintainAspectRatio: !isMobile,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: "'Noto Sans TC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 13,
            weight: 500
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333333',
        bodyColor: '#333333',
        bodyFont: {
          family: "'Noto Sans TC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 14
        },
        titleFont: {
          family: "'Noto Sans TC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 16,
          weight: 700
        },
        padding: 12,
        boxPadding: 8,
        cornerRadius: 8,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}% (使用頻率)`;
          }
        }
      }
    },
    // 添加動畫效果 - 修正 easing 類型為 Chart.js 支持的值
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1200,
      easing: 'easeInOutQuart' as const,
    },
    cutout: '0%', // 確保是完整的餅圖
    radius: '90%', // 稍微縮小半徑以適應容器
  };

  return (
    <div className="chart-container p-4 pb-6 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto flex flex-col items-center mb-4 border border-gray-100">
      {/* 半透明裝飾元素 */}
      <div className="w-full relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-transparent rounded-full -z-1 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-50 to-transparent rounded-full -z-1 opacity-50"></div>
      </div>
      
      {/* 圖表標題 */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">SFBT問句類型分佈</h3>
      
      {/* 圖表 */}
      <div className="w-full flex justify-center items-center relative" style={{ height: isMobile ? '380px' : '350px' }}>
        <Pie data={data} options={options} />
      </div>
      
      {/* 底部說明文字 - 使用更精緻的設計 */}
      <div className="w-full text-sm text-gray-500 mt-4 text-center px-4">
        <p className="italic">* 數據基於研習課程中實際案例分析與練習紀錄</p>
      </div>
    </div>
  );
};

export default QuestionTypeDistributionChart;