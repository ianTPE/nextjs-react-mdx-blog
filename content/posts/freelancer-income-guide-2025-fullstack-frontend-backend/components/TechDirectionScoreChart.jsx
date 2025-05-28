import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TechDirectionScoreChart = () => {
  const data = {
    labels: [
      '市場需求度',
      '入門門檻',
      '收入潛力',
      '發展前景',
      '工作靈活性',
      '技術穩定性'
    ],
    datasets: [
      {
        label: '後端自動化',
        data: [9, 6, 8, 9, 8, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: '前端電商',
        data: [8, 7, 7, 8, 9, 8],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
      {
        label: '全棧MVP',
        data: [10, 7, 8, 9, 10, 6],
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '技術方向綜合評分對比',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 10,
        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default TechDirectionScoreChart;