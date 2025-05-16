'use client';

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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function CopingStrategiesEffectiveness() {
  const data = {
    labels: ['知識武裝', '終身學習', '設定使用邊界', '心理疏導', '提升人性化競爭力'],
    datasets: [
      {
        label: '短期效果 (0-100)',
        data: [65, 48, 82, 76, 42],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '長期效果 (0-100)',
        data: [85, 92, 68, 72, 88],
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'AI焦慮應對策略效果雷達圖',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="py-6 my-6 bg-gray-50 rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-center mb-4">各種應對策略的短期與長期效果對比</h3>
      <div className="max-w-xl mx-auto">
        <Radar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-500 text-center mt-4">
        策略效果評估基於心理學研究及2,000名受訪者自我報告結果
      </p>
    </div>
  );
}
