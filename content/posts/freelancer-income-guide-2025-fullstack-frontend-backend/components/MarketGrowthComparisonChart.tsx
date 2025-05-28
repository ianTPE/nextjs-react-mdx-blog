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
    barThickness: 60,
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

        if (width < 640) { // 手机
          setChartHeight(280);
          setChartConfig({
            barThickness: 40,
            fontSize: { title: 14, axis: 10, tooltip: 12 }
          });
        } else if (width < 1024) { // 平板
          setChartHeight(320);
          setChartConfig({
            barThickness: 50,
            fontSize: { title: 15, axis: 11, tooltip: 13 }
          });
        } else { // 电脑
          setChartHeight(380);
          setChartConfig({
            barThickness: 60,
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
      className="w-full" // 保持 w-full，讓 maxWidth 控制實際寬度
      style={{
        height: `${chartHeight}px`,
        maxWidth: '700px', // 在電腦上限制最大寬度為 700px (您可以調整此值)
        margin: '0 auto'   // 水平居中
      }}
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
            borderRadius: 4,
            barThickness: chartConfig.barThickness
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
          // 移除了 options.datasets.bar，因為 barThickness 已經在 dataset 中設定
          // 如果需要調整柱子寬度比例（當不使用 barThickness 時），
          // categoryPercentage 和 barPercentage 應放在 data.datasets 的每個對象中
        }}
      />
    </div>
  );
};

export default MarketGrowthComparisonChart;