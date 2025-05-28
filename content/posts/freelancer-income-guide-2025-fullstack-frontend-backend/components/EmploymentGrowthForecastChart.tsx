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
    // 添加一個包裹 div，並設定其高度
    // height: 'auto' 或 '100%' 都可以，但配合 maintainAspectRatio: false 和父容器的高度控制更有效
    // 這裡我們依然使用 vh 單位結合 min/maxHeight 來控制
    // 由於是水平條形圖 (indexAxis: 'y')，高度主要由條目的數量和設定的容器高度決定
    // 如果條目很多，可能需要更大的高度
    <div style={{ height: '60vh', minHeight: '350px', maxHeight: '700px', width: '100%' }}>
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
          indexAxis: 'y', // 這是水平條形圖
          responsive: true,
          maintainAspectRatio: false, // 關鍵：允許圖表不保持預設寬高比，以填滿容器高度
          plugins: {
            legend: {
              display: false // 根據您的原始設定，圖例是關閉的
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
            x: { // 對於 indexAxis: 'y'，x 軸是數值軸
              beginAtZero: true,
              ticks: {
                callback: (value) => {
                  return `${value}%`;
                }
              }
            },
            y: { // y 軸是類別軸
              // 如果標籤太長，可以在這裡調整
              ticks: {
                // autoSkip: false, // 如果希望所有標籤都顯示
                // maxRotation: 0, // 避免標籤旋轉
              }
            }
          }
        }}
      />
    </div>
  );
};

export default EmploymentGrowthForecastChart;