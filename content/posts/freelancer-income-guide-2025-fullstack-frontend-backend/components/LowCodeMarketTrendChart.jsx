import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LowCodeMarketTrendChart = () => {
  const data = {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026', '2027'],
    datasets: [
      {
        label: '市場規模 (億美元)',
        data: [76.1, 110, 150, 200, 260, 310, 364.3],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
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
        text: '低代碼開發市場增長趨勢',
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
          text: '市場規模 (億美元)',
        },
      },
      x: {
        title: {
          display: true,
          text: '年份',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LowCodeMarketTrendChart;