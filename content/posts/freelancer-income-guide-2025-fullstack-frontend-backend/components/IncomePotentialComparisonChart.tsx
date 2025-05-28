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
    // 1. 添加包裹 div 並設定其高度
    <div style={{ height: '60vh', minHeight: '400px', maxHeight: '700px', width: '100%' }}>
      <Bar
        data={{
          labels: ['初級項目', '中級項目', '高級項目', '月度維護'],
          datasets: [{
            label: '後端開發',
            data: [10000, 32500, 125000, 6000],
            backgroundColor: 'rgba(255, 99, 132, 0.8)'
          }, {
            label: '前端開發',
            data: [3000, 17500, 65000, 2750],
            backgroundColor: 'rgba(54, 162, 235, 0.8)'
          }, {
            label: '全棧開發',
            data: [17500, 50000, 162500, 7500],
            backgroundColor: 'rgba(75, 192, 192, 0.8)'
          }]
        }}
        options={{
          responsive: true,
          // 2. 設定 maintainAspectRatio 為 false
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
            legend: { // 確保圖例可見，如果需要
              position: 'top',
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => {
                  // 使用 Intl.NumberFormat 進行更標準的貨幣格式化
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0, // 如果不想要小數點
                    maximumFractionDigits: 0  // 如果不想要小數點
                  }).format(value);
                }
              }
            },
            x: {
                // 如果x軸標籤太長或在手機上重疊，可以考慮旋轉或自動跳過
                // ticks: {
                //   maxRotation: 45,
                //   minRotation: 0,
                //   autoSkip: true,
                //   maxTicksLimit: 4 // 例如，限制手機上顯示的標籤數量
                // }
            }
          }
        }}
      />
    </div>
  );
};

export default IncomePotentialComparisonChart;