'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AIAnxietyByDemographics() {
  const data = {
    labels: ['Gen Z (18-26歲)', '千禧世代 (27-42歲)', 'Gen X (43-58歲)', '嬰兒潮世代 (59+歲)'],
    datasets: [
      {
        label: 'AI焦慮程度 (0-100)',
        data: [72, 64, 48, 35],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'AI使用頻率 (0-100)',
        data: [85, 68, 42, 23],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
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
        text: '不同世代對AI的焦慮程度與使用頻率對比',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      }
    }
  };

  return (
    <div className="py-6 my-6 bg-gray-50 rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-center mb-4">不同年齡層的AI焦慮與使用情況</h3>
      {/* Add a container with fixed height */}
      <div style={{ height: '400px', maxHeight: '70vh' }}>
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-500 text-center mt-4">
        資料來源：2025年全球科技焦慮調查報告 (樣本數: 4,500人)
      </p>
    </div>
  );
}
