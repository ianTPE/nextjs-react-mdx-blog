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
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// 註冊ChartJS組件
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PlatformFeatureRadarChart = () => {
  // 圖表數據
  const data = {
    labels: ['易用性', '移動應用支持', '網頁應用支持', '可擴展性', '整合能力', '社區支持'],
    datasets: [
      {
        label: 'Adalo',
        data: [9, 9, 7, 6, 6, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Bubble',
        data: [6, 5, 9, 9, 9, 9],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Glide',
        data: [10, 8, 6, 5, 7, 7],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 圖表選項
  const options: any = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 10,
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15
        }
      },
      title: {
        display: true,
        text: '主要無程式碼平台功能比較',
        font: {
          size: 16,
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.r}/10`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full my-4 sm:my-6 md:my-8 p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-md -ml-2 sm:ml-0">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <div className="relative" style={{ paddingBottom: '100%' }}>
          <div className="absolute inset-0">
            <Radar 
              data={data} 
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeatureRadarChart;
