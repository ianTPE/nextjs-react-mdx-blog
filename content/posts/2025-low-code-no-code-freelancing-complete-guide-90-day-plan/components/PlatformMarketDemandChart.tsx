"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PlatformMarketDemandChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '2025年LC/NC平台市場需求與職缺分析',
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
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' 分';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            return value + ' 分';
          }
        },
        title: {
          display: true,
          text: '評分 (0-10分)',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };

  const data = {
    labels: ['Power Apps', 'AppSheet', 'OutSystems', 'Mendix', 'Bubble', 'Webflow', 'Retool', 'Appsmith', 'Glide', 'Softr'],
    datasets: [
      {
        label: '市場需求',
        data: [9.5, 9.1, 8.7, 8.6, 8.3, 8.1, 7.8, 7.5, 6.9, 6.5],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '職缺數量',
        data: [9.2, 8.9, 8.5, 8.3, 7.9, 7.8, 7.4, 7.0, 6.2, 5.9],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: '自由接案機會',
        data: [7.8, 8.1, 6.5, 6.3, 9.0, 8.8, 7.9, 7.2, 7.5, 7.0],
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      }
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div style={{ height: '400px' }}>
        <Bar options={options} data={data} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        * 評分基於市場研究與業內專家意見，10分為最高。數據來源：2025年LC/NC平台市場調查報告。
      </p>
    </div>
  );
};

export default PlatformMarketDemandChart;