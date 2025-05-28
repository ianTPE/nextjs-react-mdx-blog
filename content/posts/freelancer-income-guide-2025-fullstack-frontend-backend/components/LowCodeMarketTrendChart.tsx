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

// It's good practice to define CSS in a separate .css file
// and import it, or use a CSS-in-JS solution.
// For this example, I'll show how to define a class and suggest where to put the CSS.

// Create a CSS file (e.g., LowCodeMarketTrendChart.css) and add:
/*
.low-code-chart-container {
  width: 100%; // Default width
  height: 300px; // Default height for larger screens, adjust as needed
}

@media (max-width: 768px) { // Target mobile devices (adjust breakpoint as needed)
  .low-code-chart-container {
    height: 400px; // Taller height for mobile
    // You could also use min-height: 400px;
  }
}
*/

// If you are using Next.js with CSS Modules, you could name it LowCodeMarketTrendChart.module.css
// import styles from './LowCodeMarketTrendChart.module.css';

const LowCodeMarketTrendChart = () => {
  return (
    // Add a div with a class to control its size
    // If using CSS Modules: <div className={styles.lowCodeChartContainer}>
    <div className="low-code-chart-container" style={{ position: 'relative', width: '100%' }}> {/* Added inline style for basic width */}
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
          maintainAspectRatio: false, // IMPORTANT: Set to false to allow custom height
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
            },
            legend: {
              position: 'top', // Default, can be 'bottom', etc.
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