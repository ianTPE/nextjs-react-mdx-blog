import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ToolComparisonChart = () => {
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
          type: 'bar',
          data: {
            labels: ['程式碼理解', '多檔案編輯', '自動化程度', '企業整合', '成本效益'],
            datasets: [
              {
                label: 'Aider.chat',
                data: [8, 7, 8, 6, 9],
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
              },
              {
                label: 'Claude Code',
                data: [10, 10, 9, 9, 6],
                backgroundColor: 'rgba(255, 107, 107, 0.8)',
                borderColor: 'rgba(255, 107, 107, 1)',
                borderWidth: 1
              },
              {
                label: 'Cursor',
                data: [7, 8, 7, 7, 7],
                backgroundColor: 'rgba(46, 204, 113, 0.8)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1
              },
              {
                label: 'GitHub Copilot',
                data: [6, 5, 6, 8, 8],
                backgroundColor: 'rgba(241, 196, 15, 0.8)',
                borderColor: 'rgba(241, 196, 15, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            indexAxis: 'y' as const,
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
              x: {
                beginAtZero: true,
                max: 10,
                title: {
                  display: true,
                  text: '評分 (1-10)',
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif"
                  }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                  stepSize: 2,
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif"
                  }
                }
              },
              y: {
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
          🔧 主流 AI 程式設計工具功能對比
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Aider、Claude Code 與競品工具的功能評分比較
        </p>
      </div>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ToolComparisonChart;