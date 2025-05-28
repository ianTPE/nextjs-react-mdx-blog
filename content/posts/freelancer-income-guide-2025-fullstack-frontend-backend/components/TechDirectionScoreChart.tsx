'use client';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const TechDirectionScoreChart = () => {
  return (
    // 1. 包裹 div 並控制其大小和邊距
    <div style={{
      width: '90%',     // 在父容器中佔90%寬度，適應小螢幕
      maxWidth: '500px', // 在大螢幕上最大寬度為 500px
      margin: '20px auto' // 上下20px邊距，水平居中
    }}>
      <Radar
        data={{
          labels: ['項目獨立性', '收入潛力', '市場需求', '技能門檻', '遠程友好度', '成長空間'],
          datasets: [{
            label: '後端開發',
            data: [75, 85, 90, 80, 95, 88],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)', // 可以明確指定點的顏色
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
          }, {
            label: '前端開發',
            data: [70, 75, 85, 65, 90, 80],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
          }, {
            label: '全棧開發',
            data: [95, 90, 95, 85, 92, 93],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true, // 保持雷達圖的固有比例
          plugins: {
            title: {
              display: true,
              text: '三大技術方向綜合評分對比',
              font: {
                size: 16 // 標題字體大小
              }
            },
            legend: {
              position: 'top', // 圖例位置
              labels: {
                font: {
                  size: 10 // 圖例字體大小
                },
                boxWidth: 20, // 圖例顏色塊寬度
                padding: 10 // 圖例項之間的間距
              }
            }
          },
          scales: {
            r: { // 徑向軸配置
              beginAtZero: true,
              max: 100,
              pointLabels: { // 軸頂端的標籤 (如 '項目獨立性')
                font: {
                  size: 10 // 減小標籤字體大小
                },
                // 如果標籤太長可以考慮換行或截斷
                // callback: function(value) {
                //   return value.length > 6 ? value.substring(0, 6) + '...' : value;
                // }
              },
              ticks: { // 刻度線上的數字 (0, 20, 40...)
                display: true, // 顯示刻度
                stepSize: 25,  // 刻度間隔
                font: {
                  size: 9 // 減小刻度數字字體
                },
                backdropColor: 'transparent' // 使刻度背景透明，避免遮擋
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)' // 網格線顏色調淡
              },
              angleLines: {
                color: 'rgba(0, 0, 0, 0.1)' // 從中心發散的線條顏色調淡
              }
            }
          },
          // 3. 調整圖表元素的視覺大小
          elements: {
            line: {
              borderWidth: 2 // 線條寬度 (預設可能是3)
            },
            point: {
              radius: 3, // 數據點的半徑 (預設可能是3)
              hoverRadius: 5, // 懸停時數據點的半徑
              borderWidth: 1,
              hoverBorderWidth: 2
            }
          }
        }}
      />
    </div>
  );
};

export default TechDirectionScoreChart;