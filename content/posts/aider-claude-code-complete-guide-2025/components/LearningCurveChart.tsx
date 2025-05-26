import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LearningCurveChart = () => {
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
          type: 'line',
          data: {
            labels: ['第1週', '第2週', '第1個月', '第2個月', '第3個月', '第6個月'],
            datasets: [
              {
                label: '初級開發者',
                data: [20, 35, 60, 80, 90, 95],
                borderColor: 'rgba(255, 107, 107, 1)',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: 'rgba(255, 107, 107, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
              },
              {
                label: '中級開發者',
                data: [40, 65, 85, 95, 98, 100],
                borderColor: 'rgba(102, 126, 234, 1)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
              },
              {
                label: '資深開發者',
                data: [60, 80, 95, 100, 100, 100],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: 'rgba(46, 204, 113, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
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
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: '熟練度 (%)',
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif"
                  }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                  stepSize: 20,
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif"
                  }
                }
              },
              x: {
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif"
                  }
                }
              }
            },
            interaction: {
              intersect: false,
              mode: 'index' as const
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
          📚 學習曲線與生產力成長
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          不同經驗等級開發者使用 AI 工具的學習與成長軌跡
        </p>
      </div>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-red-800 dark:text-red-200">初級開發者</span>
          </div>
          <span className="text-xs text-red-600 dark:text-red-300">6個月達到95%熟練度</span>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">中級開發者</span>
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-300">2個月達到95%熟練度</span>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800 dark:text-green-200">資深開發者</span>
          </div>
          <span className="text-xs text-green-600 dark:text-green-300">1個月達到100%熟練度</span>
        </div>
      </div>
    </div>
  );
};

export default LearningCurveChart;