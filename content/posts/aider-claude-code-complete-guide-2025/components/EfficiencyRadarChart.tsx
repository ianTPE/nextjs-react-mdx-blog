import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const EfficiencyRadarChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['程式碼編寫', '除錯修復', '測試撰寫', '文件生成', '重構優化', '學習新技術'],
            datasets: [
              {
                label: '傳統開發方式',
                data: [3, 2, 2, 1, 2, 3],
                backgroundColor: 'rgba(149, 165, 166, 0.2)',
                borderColor: 'rgba(149, 165, 166, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(149, 165, 166, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(149, 165, 166, 1)'
              },
              {
                label: 'Aider + Claude Code',
                data: [9, 8, 9, 10, 9, 8],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
                labels: {
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                    size: 12
                  }
                }
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 10,
                ticks: {
                  stepSize: 2,
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                    size: 11
                  }
                },
                pointLabels: {
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                },
                angleLines: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg my-8">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          ⚡ 開發效率多維度提升分析
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          AI 程式設計工具在不同開發環節的效率提升表現
        </p>
      </div>
      <div className="relative h-96">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default EfficiencyRadarChart;