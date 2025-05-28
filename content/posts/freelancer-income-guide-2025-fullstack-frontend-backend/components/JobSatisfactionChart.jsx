import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const JobSatisfactionChart = () => {
  const data = {
    labels: ['Digital Nomads', '傳統辦公室工作者'],
    datasets: [
      {
        data: [79, 52],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '工作滿意度對比 (%)',
        font: {
          size: 16,
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default JobSatisfactionChart;