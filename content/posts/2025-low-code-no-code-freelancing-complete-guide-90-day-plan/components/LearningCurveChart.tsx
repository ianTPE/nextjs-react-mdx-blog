"use client";

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LearningCurveChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '各平台學習曲線與上手時間對比',
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
              label += context.parsed.y + ' 週';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 16,
        title: {
          display: true,
          text: '熟練所需時間 (週)',
          font: {
            weight: 'bold'
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'LC/NC平台',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };

  const data = {
    labels: ['Glide', 'Softr', 'Adalo', 'AppSheet', 'Webflow', 'Bubble', 'Power Apps', 'Retool', 'OutSystems', 'Mendix'],
    datasets: [
      {
        label: '無技術背景者',
        data: [2, 2.5, 3, 4, 5, 8, 10, 12, 14, 14],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: '有技術背景者',
        data: [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 8],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        fill: true,
        tension: 0.4
      }
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-6">
      <div style={{ height: '400px' }}>
        <Line options={options} data={data} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        * 上手時間定義為能夠獨立完成基本專案所需的學習週數。資料來源：基於500+新手學習經驗的統計分析。
      </p>
    </div>
  );
};

export default LearningCurveChart;