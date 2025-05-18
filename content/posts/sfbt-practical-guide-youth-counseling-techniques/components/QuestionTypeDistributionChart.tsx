import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// 註冊必須的 ChartJS 元件
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const QuestionTypeDistributionChart = () => {
  const data = {
    labels: ['奇蹟問句', '評量問句', '例外問句', '因應問句', '關係問句'],
    datasets: [
      {
        data: [25, 35, 20, 10, 10],
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'SFBT問句類型使用分佈',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
  };

  return (
    <div className="chart-container p-4 bg-white rounded-lg shadow-md">
      <Pie data={data} options={options} />
      <div className="text-sm text-gray-500 mt-2 text-center">
        *數據基於研習課程中實際案例分析與練習紀錄
      </div>
    </div>
  );
};

export default QuestionTypeDistributionChart;