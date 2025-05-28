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

const MarketDriversChart = () => {
  return (
    <Bar
      data={{
        labels: ['企業使用低代碼', '員工遠程工作', 'AI技能需求', '訂閱制電商增長', '新應用採用低代碼'],
        datasets: [{
          label: '百分比 (%)',
          data: [84, 70, 18, 65.2, 70],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
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
            text: '推動Freelancer需求的關鍵市場因素',
            font: {
              size: 16
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
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

export default MarketDriversChart;
