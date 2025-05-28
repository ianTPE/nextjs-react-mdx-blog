'use client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const JobSatisfactionChart = () => {
  return (
    <Doughnut
      data={{
        labels: ['Digital Nomad高度滿意', 'Digital Nomad滿意', '傳統工作者滿意'],
        datasets: [{
          data: [79, 12, 47],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: '工作滿意度對比',
            font: {
              size: 16
            }
          }
        }
      }}
    />
  );
};

export default JobSatisfactionChart;
