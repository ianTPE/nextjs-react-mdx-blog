"use client";

import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PlatformSkillRadarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '主要LC/NC平台技能需求雷達圖',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw + '/10';
            }
            return label;
          }
        }
      }
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
          backdropColor: 'transparent'
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  const data = {
    labels: ['技術理解', '設計思維', '問題解決', '資料處理', '整合能力', '業務理解'],
    datasets: [
      {
        label: 'Bubble',
        data: [6, 8, 9, 7, 8, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Webflow',
        data: [5, 9, 7, 6, 6, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Power Apps',
        data: [7, 6, 8, 8, 9, 9],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'OutSystems',
        data: [9, 7, 8, 8, 9, 8],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-6">
      <div style={{ height: '450px' }}>
        <Radar options={options} data={data} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        * 技能需求評分基於各平台官方認證要求與行業專家訪談，10分表示最高要求。技術理解指程式邏輯基礎；設計思維指UI/UX設計能力；整合能力指API與第三方服務連接能力。
      </p>
    </div>
  );
};

export default PlatformSkillRadarChart;