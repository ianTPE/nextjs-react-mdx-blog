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
  // 修复：添加正确的 ref 类型定义
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(400);
  const [fontSize, setFontSize] = useState({ 
    title: 16, 
    axis: 12,
    tooltip: 14
  });

  useEffect(() => {
    const updateChartSize = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.clientWidth;
        
        // 响应式高度设置
        if (width < 640) { // 手机
          setChartHeight(280);
          setFontSize({ title: 14, axis: 10, tooltip: 12 });
        } else if (width < 1024) { // 平板
          setChartHeight(350);
          setFontSize({ title: 15, axis: 11, tooltip: 13 });
        } else { // 电脑
          setChartHeight(420);
          setFontSize({ title: 16, axis: 12, tooltip: 14 });
        }
      }
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    
    return () => window.removeEventListener('resize', updateChartSize);
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
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: '市場增長對比：傳統就業 vs Gig經濟',
              font: {
                size: fontSize.title
              }
            },
            tooltip: {
              bodyFont: {
                size: fontSize.tooltip
              },
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
                  size: fontSize.axis
                }
              },
              title: {
                display: true,
                text: '增長率 (%)',
                font: {
                  size: fontSize.axis
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: fontSize.axis
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