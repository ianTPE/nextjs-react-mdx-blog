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
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartHeight, setChartHeight] = useState(380);
  const [chartConfig, setChartConfig] = useState({
    barThickness: 60, // 默认条形柱厚度
    fontSize: { 
      title: 16, 
      axis: 12,
      tooltip: 14
    }
  });

  useEffect(() => {
    const updateChartSize = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.clientWidth;
        
        // 响应式设置
        if (width < 640) { // 手机
          setChartHeight(280);
          setChartConfig({
            barThickness: 40, // 手机端更细的条形柱
            fontSize: { title: 14, axis: 10, tooltip: 12 }
          });
        } else if (width < 1024) { // 平板
          setChartHeight(320);
          setChartConfig({
            barThickness: 50, // 平板端适中粗细
            fontSize: { title: 15, axis: 11, tooltip: 13 }
          });
        } else { // 电脑
          setChartHeight(380);
          setChartConfig({
            barThickness: 60, // 电脑端稍粗但仍比原来细
            fontSize: { title: 16, axis: 12, tooltip: 14 }
          });
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
            borderWidth: 2,
            borderRadius: 4, // 添加轻微圆角
            barThickness: chartConfig.barThickness // 应用响应式厚度
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
                size: chartConfig.fontSize.title
              },
              padding: {
                top: 10,
                bottom: 20
              }
            },
            tooltip: {
              bodyFont: {
                size: chartConfig.fontSize.tooltip
              },
              callbacks: {
                label: (context) => `${context.parsed.y}%`
              },
              padding: 12,
              displayColors: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `${value}%`,
                font: {
                  size: chartConfig.fontSize.axis
                },
                padding: 8
              },
              title: {
                display: true,
                text: '增長率 (%)',
                font: {
                  size: chartConfig.fontSize.axis
                },
                padding: {
                  top: 10,
                  bottom: 10
                }
              },
              grid: {
                drawTicks: false
              }
            },
            x: {
              ticks: {
                font: {
                  size: chartConfig.fontSize.axis
                },
                padding: 10
              },
              grid: {
                display: false
              }
            }
          },
          // 添加间距使条形柱更细
          datasets: {
            bar: {
              categoryPercentage: 0.6, // 控制类别宽度
              barPercentage: 0.8 // 控制条形柱宽度
            }
          }
        }}
      />
    </div>
  );
};

export default MarketGrowthComparisonChart;