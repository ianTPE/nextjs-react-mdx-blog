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
    // 添加一個包裹 div，並設定其高度
    // height: 50vh 表示高度為視窗高度的 50%
    // minHeight: '300px' 確保在手機上至少有 300px 的高度，防止過矮
    // maxHeight: '600px' 防止在超大螢幕上圖表變得過高
    <div style={{ height: '50vh', minHeight: '300px', maxHeight: '600px', width: '100%' }}>
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
          // 設定 maintainAspectRatio 為 false，讓圖表可以填滿父容器的高度
          maintainAspectRatio: false, 
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
    </div>
  );
};

export default LowCodeMarketTrendChart;