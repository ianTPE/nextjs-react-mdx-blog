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

const MarketGrowthComparisonChart = () => {
  return (
    <Bar
      data={{
        labels: ['傳統就業市場', 'Gig經濟', 'Freelancer收入增長'],
        datasets: [{
          label: '增長率 (%)',
          data: [1.1, 15, 60],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 2
        }]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '市場增長對比：傳統就業 vs Gig經濟',
            font: {
              size: 16
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return `${value}%`;
              }
            }
          }
        }
      }}
    />
  );
};

export default MarketGrowthComparisonChart;
