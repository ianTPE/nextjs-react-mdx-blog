"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 註冊 ChartJS 元件
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeatureComparisonChart = () => {
  const labels = [
    '程式語言理解能力',
    '程式碼生成',
    '智能補全',
    '即時反饋',
    '學習能力',
    '安全性',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'CodeRabbit',
        data: [5, 0, 0, 5, 5, 5],
        backgroundColor: '#36a2eb',
      },
      {
        label: 'Windsurf',
        data: [5, 5, 5, 0, 3, 5],
        backgroundColor: '#ff6384',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '分';
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="w-full my-8" style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FeatureComparisonChart;