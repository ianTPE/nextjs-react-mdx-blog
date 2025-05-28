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

const IncomePotentialComparisonChart = () => {
  const data = {
    labels: ['AI/機器學習', '網絡安全', '後端自動化', '數據分析', '全棧開發', '前端開發'],
    datasets: [
      {
        label: '最低時薪 ($)',
        data: [50, 40, 35, 30, 30, 25],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
      {
        label: '最高時薪 ($)',
        data: [150, 90, 85, 80, 80, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
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
        text: '各技術方向時薪範圍對比',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '時薪 (USD)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default IncomePotentialComparisonChart;