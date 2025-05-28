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
            borderWidth: 2,
            // --- 修改點在這裡 ---
            barPercentage: 0.6, // 例如設定為 60% 的可用寬度，預設是 0.9
            // categoryPercentage: 0.8, // 你也可以調整這個，預設是 0.8
            // 或者使用固定的寬度 (如果需要，取消註解並調整)
            // barThickness: 25, // 設定柱子固定寬度為 25px
            // maxBarThickness: 40 // 設定柱子最大寬度為 40px
            // --- ---
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
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
                callback: (value: string | number) => {
                  return `${Number(value)}%`;
                }
              }
            },
            x: {
              ticks: {
                // autoSkip: true,
                // maxRotation: 45,
                // minRotation: 0,
                // padding: 5,
                // font: {
                //   size: 10
                // },
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