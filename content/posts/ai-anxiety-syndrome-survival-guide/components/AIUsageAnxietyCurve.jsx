'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AIUsageAnxietyCurve() {
  const labels = [
    '從不使用', '每月使用', '每週使用', '每週數次', '每日使用', '每日數小時', '密集依賴'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'AI焦慮指數 (0-100)',
        data: [78, 65, 45, 38, 42, 58, 74],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AI使用頻率與焦慮程度的U型關係',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `焦慮指數: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: '焦慮指數'
        }
      },
      x: {
        title: {
          display: true,
          text: 'AI使用頻率'
        }
      }
    }
  };

  return (
    <div className="py-6 my-6 bg-gray-50 rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-center mb-4">AI使用頻率與焦慮程度關係曲線</h3>
      <Line options={options} data={data} />
      <p className="text-sm text-gray-500 text-center mt-4">
        資料顯示適度使用AI的人焦慮程度最低，而不使用或過度依賴的人焦慮感較高
      </p>
    </div>
  );
}
