"use client";

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ScenarioChart = () => {
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
          type: 'doughnut',
          data: {
            labels: ['Aider 獨立使用', 'Claude Code 獨立使用', 'Aider + Claude 組合', '其他工具'],
            datasets: [{
              data: [25, 30, 40, 5],
              backgroundColor: [
                'rgba(102, 126, 234, 0.8)',
                'rgba(255, 107, 107, 0.8)',
                'rgba(46, 204, 113, 0.8)',
                'rgba(149, 165, 166, 0.8)'
              ],
              borderColor: [
                'rgba(102, 126, 234, 1)',
                'rgba(255, 107, 107, 1)',
                'rgba(46, 204, 113, 1)',
                'rgba(149, 165, 166, 1)'
              ],
              borderWidth: 2,
              hoverOffset: 10
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom' as const,
                labels: {
                  font: {
                    family: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                    size: 12
                  },
                  padding: 20,
                  usePointStyle: true,
                  pointStyle: 'circle'
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.parsed;
                    return `${label}: ${value}%`;
                  }
                }
              }
            },
            cutout: '50%'
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
          🎯 最佳適用場景分析
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          不同開發場景下推薦使用的工具組合
        </p>
      </div>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            組合使用 (40%) 提供最佳開發體驗和效率提升
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScenarioChart;