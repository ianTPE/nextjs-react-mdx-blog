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
    <Radar
      data={{
        labels: ['項目獨立性', '收入潛力', '市場需求', '技能門檻', '遠程友好度', '成長空間'],
        datasets: [{
          label: '後端開發',
          data: [75, 85, 90, 80, 95, 88],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }, {
          label: '前端開發',
          data: [70, 75, 85, 65, 90, 80],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)'
        }, {
          label: '全棧開發',
          data: [95, 90, 95, 85, 92, 93],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
      }}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '三大技術方向綜合評分對比',
            font: {
              size: 16
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }}
    />
  );
};

export default TechDirectionScoreChart;
