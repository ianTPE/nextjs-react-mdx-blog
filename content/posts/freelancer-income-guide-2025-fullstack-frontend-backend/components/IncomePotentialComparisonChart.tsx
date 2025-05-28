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

const IncomePotentialComparisonChart = () => {
  return (
    <div style={{ height: '60vh', minHeight: '400px', maxHeight: '700px', width: '100%' }}>
      <Bar
        data={{
          labels: ['初級項目', '中級項目', '高級項目', '月度維護'],
          datasets: [{
            label: '後端開發',
            data: [10000, 32500, 125000, 6000],
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            barPercentage: 0.7, // <--- 修改點：使柱子變細
            // categoryPercentage: 0.8, // 可以保持預設或根據需要調整
          }, {
            label: '前端開發',
            data: [3000, 17500, 65000, 2750],
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            barPercentage: 0.7, // <--- 修改點：使柱子變細
          }, {
            label: '全棧開發',
            data: [17500, 50000, 162500, 7500],
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            barPercentage: 0.7, // <--- 修改點：使柱子變細
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '不同技術方向收入潛力對比（美元）',
              font: {
                size: 16
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
                }
              }
            },
            legend: {
              position: 'top',
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value: string | number) => {
                  const numericValue = Number(value);
                  if (isNaN(numericValue)) {
                    return String(value);
                  }
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(numericValue);
                }
              }
            },
            x: {
              // ticks: {
              //   maxRotation: 45,
              //   minRotation: 0,
              //   autoSkip: true,
              //   maxTicksLimit: 4
              // }
            }
          }
        }}
      />
    </div>
  );
};

export default IncomePotentialComparisonChart;