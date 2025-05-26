'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const characteristicsData = [
  {
    subject: '專案週期短',
    'MVP與快速原型': 95,
    '企業應用與流程自動化': 75,
    '內部工具與管理後台': 80,
    '行動應用與跨平台部署': 60,
    '電商與CRM': 55,
    '數據分析與儀表板': 70,
  },
  {
    subject: '市場需求量',
    'MVP與快速原型': 85,
    '企業應用與流程自動化': 90,
    '內部工具與管理後台': 80,
    '行動應用與跨平台部署': 75,
    '電商與CRM': 70,
    '數據分析與儀表板': 65,
  },
  {
    subject: '專案預算',
    'MVP與快速原型': 70,
    '企業應用與流程自動化': 90,
    '內部工具與管理後台': 75,
    '行動應用與跨平台部署': 80,
    '電商與CRM': 85,
    '數據分析與儀表板': 65,
  },
  {
    subject: '技術門檻低',
    'MVP與快速原型': 80,
    '企業應用與流程自動化': 60,
    '內部工具與管理後台': 75,
    '行動應用與跨平台部署': 50,
    '電商與CRM': 65,
    '數據分析與儀表板': 55,
  },
  {
    subject: '後續維護少',
    'MVP與快速原型': 85,
    '企業應用與流程自動化': 60,
    '內部工具與管理後台': 70,
    '行動應用與跨平台部署': 40,
    '電商與CRM': 35,
    '數據分析與儀表板': 50,
  },
  {
    subject: '市場競爭低',
    'MVP與快速原型': 60,
    '企業應用與流程自動化': 75,
    '內部工具與管理後台': 70,
    '行動應用與跨平台部署': 55,
    '電商與CRM': 40,
    '數據分析與儀表板': 50,
  },
];

const colors: Record<string, string> = {
  'MVP與快速原型': '#4C9AFF',
  '企業應用與流程自動化': '#36B37E',
  '內部工具與管理後台': '#00B8D9',
  '行動應用與跨平台部署': '#6554C0',
  '電商與CRM': '#FFAB00',
  '數據分析與儀表板': '#FF5630'
};

type Category = keyof typeof colors;

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const LcncProjectCharacteristicsChartjs = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategories, setActiveCategories] = useState<Record<Category, boolean>>({
    'MVP與快速原型': true,
    '企業應用與流程自動化': true,
    '內部工具與管理後台': true,
    '行動應用與跨平台部署': false,
    '電商與CRM': false,
    '數據分析與儀表板': false
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLegendClick = (category: Category) => {
    setActiveCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const chartLabels = characteristicsData.map(d => d.subject);
  const chartDatasets = (Object.keys(colors) as Category[]).map(categoryKey => ({
    label: categoryKey,
    data: characteristicsData.map(charData => Number(charData[categoryKey as keyof typeof charData]) || 0),
    borderColor: colors[categoryKey],
    backgroundColor: hexToRgba(colors[categoryKey], 0.3),
    pointBackgroundColor: colors[categoryKey],
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: colors[categoryKey],
    hidden: !activeCategories[categoryKey],
    fill: true,
  }));

  const data: ChartData<'radar'> = {
    labels: chartLabels,
    datasets: chartDatasets,
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 12,
          },
        },
        ticks: {
          stepSize: 20, // Controls the radial lines/ticks
        },
        grid: {
          color: '#e5e7eb',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Using custom legend
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'radar'>) => {
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    }
  };

  const CustomizedLegend = () => (
    <div className="flex flex-wrap justify-center mt-4">
      {(Object.keys(colors) as Category[]).map((category) => (
        <button
          key={category}
          type="button"
          className="flex items-center mx-2 my-1 cursor-pointer"
          onClick={() => handleLegendClick(category)}
        >
          <div 
            className="w-4 h-4 mr-1 rounded-sm" 
            style={{ 
              backgroundColor: colors[category],
              opacity: activeCategories[category] ? 1 : 0.3
            }}
          />
          <span 
            className={`text-xs ${activeCategories[category] ? 'font-bold' : 'text-gray-500'}`}
          >
            {category}
          </span>
        </button>
      ))}
    </div>
  );

  if (!isMounted) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-2">低代碼/無代碼應用領域特性比較</h2>
        <p className="text-center text-sm text-gray-600 mb-4">點擊圖例可切換顯示類別</p>
        <div className="w-full h-96 flex items-center justify-center bg-gray-50">
            <p>載入圖表...</p>
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          數值越高表示在該特性上對自由工作者越有利
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-2">低代碼/無代碼應用領域特性比較</h2>
      <p className="text-center text-sm text-gray-600 mb-4">點擊圖例可切換顯示類別</p>
      <div className="w-full h-96">
        <Radar data={data} options={options} />
      </div>
      <CustomizedLegend />
      <div className="text-center text-sm text-gray-600 mt-4">
        數值越高表示在該特性上對自由工作者越有利
      </div>
    </div>
  );
};

export default LcncProjectCharacteristicsChartjs;
