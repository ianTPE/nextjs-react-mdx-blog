'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LowCodeMarketTrendChart = () => {
  return (
    <Line
      data={{
        labels: ['2021', '2023', '2025', '2027'],
        datasets: [{
          label: '低代碼市場規模（億美元）',
          data: [76.1, 150, 250, 364.3],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          fill: true
        }, {
          label: '新應用採用低代碼比例（%）',
          data: [25, 45, 70, 85],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y1'
        }]
      }}
      options={{
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: '低代碼市場爆發性增長趨勢',
            font: {
              size: 16
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: '市場規模（億美元）'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            title: {
              display: true,
              text: '採用率（%）'
            }
          }
        }
      }}
    />
  );
};

export default LowCodeMarketTrendChart;
