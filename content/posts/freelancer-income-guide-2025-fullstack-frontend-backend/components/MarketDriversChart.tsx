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
    // 1. 添加包裹 div 並設定其高度
    <div style={{ height: '60vh', minHeight: '400px', maxHeight: '600px', width: '100%' }}>
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
          // 2. 設定 maintainAspectRatio 為 false
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false // 根據您的原始設定，圖例是關閉的
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
                callback: (value: string | number) => { // 顯式標註類型以避免潛在的TS問題
                  return `${Number(value)}%`; // 確保 value 是數字
                }
              }
            },
            x: {
              // 如果X軸標籤在手機上太長或重疊，可以考慮以下調整
              ticks: {
                // autoSkip: true, // 自動跳過一些標籤以避免重疊
                // maxRotation: 45, // 標籤最大旋轉角度
                // minRotation: 0,  // 標籤最小旋轉角度
                // padding: 5,     // 標籤與軸線的距離
                // 如果標籤仍然太長，可以考慮縮小字體
                // font: {
                //   size: 10 // 根據需要調整字體大小
                // },
                // 或者使用 callback 函數來截斷或換行標籤
                // callback: function(value, index, ticks) {
                //   const label = this.getLabelForValue(index);
                //   return label.length > 10 ? label.substring(0, 8) + '...' : label;
                // }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default MarketDriversChart;