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

const EmploymentGrowthForecastChart = () => {
  return (
    <Bar
      data={{
        labels: ['網絡安全', 'AI/ML開發', '軟件工程', '網頁設計', '技術寫作', '財務分析'],
        datasets: [{
          label: '預計增長率 (%)',
          data: [32, 26, 17, 16, 7, 9],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      }}
      options={{
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: '2025-2033年各技術領域就業增長預測',
            font: {
              size: 16
            }
          }
        },
        scales: {
          x: {
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

export default EmploymentGrowthForecastChart;
