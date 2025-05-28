'use client';
import React, { useRef, useEffect, useState } from 'react';
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

const MarketGrowthComparisonChart = () => {
  const chartContainerRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(400); // 預設高度

  useEffect(() => {
    const updateChartSize = () => {
      if (chartContainerRef.current) {
        // 根據視窗寬度動態設置高度
        const width = chartContainerRef.current.clientWidth;
        if (width < 768) { // 手機設備
          setChartHeight(300);
        } else if (width < 1024) { // 平板設備
          setChartHeight(350);
        } else { // 電腦設備
          setChartHeight(400);
        }
      }
    };

    // 初始設置和添加resize監聽
    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    
    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  return (
    <div 
      ref={chartContainerRef}
      className="w-full" 
      style={{ height: `${chartHeight}px` }}
    >
      <Bar
        data={{
          labels: ['傳統就業市場', 'Gig經濟', 'Freelancer收入增長'],
          datasets: [{
            label: '增長率 (%)',
            data: [1.1, 15, 60],
            backgroundColor: [
              'rgba(54, 162, 235, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(255, 99, 132, 0.8)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 2
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false, // 關閉默認寬高比
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: '市場增長對比：傳統就業 vs Gig經濟',
              font: {
                size: window.innerWidth < 768 ? 14 : 16 // 手機標題稍小
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y}%`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `${value}%`,
                font: {
                  size: window.innerWidth < 768 ? 10 : 12 // 手機字體稍小
                }
              },
              title: {
                display: true,
                text: '增長率 (%)',
                font: {
                  size: window.innerWidth < 768 ? 12 : 14
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: window.innerWidth < 768 ? 10 : 12
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default MarketGrowthComparisonChart;