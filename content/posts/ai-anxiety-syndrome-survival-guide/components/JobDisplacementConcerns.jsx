'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function JobDisplacementConcerns() {
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to break aspect ratio for better mobile display
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '各行業AI取代工作憂慮程度',
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: '憂慮指數 (0-100)'
        }
      }
    }
  };

  const labels = [
    '客服代表',
    '數據分析師',
    '平面設計師',
    '金融分析師',
    '翻譯人員',
    '內容撰寫者',
    '行政助理',
    '軟體測試員',
    '法律助理',
    '醫療影像分析師',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '就業者憂慮指數',
        data: [87, 81, 78, 76, 75, 72, 68, 65, 62, 60],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '產業專家評估風險',
        data: [92, 76, 65, 58, 84, 79, 88, 70, 55, 48],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="py-6 my-6 bg-gray-50 rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-center mb-4">各職業對AI取代工作的擔憂程度</h3>
      {/* Create a div with fixed height to contain the chart */}
      <div style={{ height: '500px', maxHeight: '80vh' }}>
        <Bar options={options} data={data} />
      </div>
      <p className="text-sm text-gray-500 text-center mt-4">
        比較就業者的主觀憂慮與產業專家客觀評估的風險程度
      </p>
    </div>
  );
}
