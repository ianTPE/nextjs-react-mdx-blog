"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FreelanceIncomeChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'LC/NC外包專案收入分布 (2025)',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            let value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  };

  const data = {
    labels: [
      '小型專案 ($500-$2,000)',
      '中型專案 ($2,000-$5,000)',
      '大型專案 ($5,000-$10,000)',
      '企業級專案 ($10,000+)',
      '月度維護 ($500-$2,000/月)'
    ],
    datasets: [
      {
        data: [35, 28, 18, 9, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-6">
      <div style={{ height: '400px' }}>
        <Pie options={options} data={data} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        * 數據基於300+LC/NC自由工作者的匿名收入調查。專案價格範圍反映北美與歐洲市場平均值，亞太地區可能有15-30%的差異。
      </p>
    </div>
  );
};

export default FreelanceIncomeChart;