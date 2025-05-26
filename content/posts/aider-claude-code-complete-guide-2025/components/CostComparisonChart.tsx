import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CostComparisonChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['日常開發', '大型專案', '企業級使用'],
            datasets: [
              {
                label: 'Aider (Claude Sonnet)',
                data: [45, 105, 330],
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                borderRadius: 8,
              },
              {
                label: 'Claude Code',
                data: [180, 450, 1125],
                backgroundColor: 'rgba(255, 107, 107, 0.8)',
                borderColor: 'rgba(255, 107, 107, 1)',
                borderWidth: 2,
                borderRadius: 8,
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
              },
              title: {
                display: true,
                text: '每月使用成本比較 (USD)',
                font: {
                  family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                  size: 16,
                  weight: 'bold' as const
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: '成本 (美元)',
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif"
                  }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif"
                  }
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
          💰 每月使用成本比較分析
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          不同使用場景下的 Aider 與 Claude Code 成本對比，幫助您選擇最適合的方案
        </p>
      </div>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default CostComparisonChart;