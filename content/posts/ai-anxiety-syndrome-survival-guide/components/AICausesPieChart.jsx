'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AICausesPieChart() {
  const data = {
    labels: ['工作安全擔憂', '隱私與監控疑慮', '資訊真實性擔憂', '技能過時憂慮', '倫理與社會衝擊'],
    datasets: [
      {
        label: 'AI焦慮主要原因 (%)',
        data: [42, 24, 16, 11, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
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

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to break aspect ratio
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'AI焦慮主要原因分布',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="py-6 my-6 bg-gray-50 rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-center mb-4">AI焦慮成因分布圖</h3>
      <div style={{ height: '400px', maxHeight: '70vh' }}>
        <Pie data={data} options={options} />
      </div>
      <p className="text-sm text-gray-500 text-center mt-4">
        根據2025年全球1,200名受訪者調查數據
      </p>
    </div>
  );
}
