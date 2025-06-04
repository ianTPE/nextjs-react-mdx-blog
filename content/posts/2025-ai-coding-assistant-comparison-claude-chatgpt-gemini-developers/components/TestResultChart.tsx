"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TestResult {
  platform: string;
  buildTime: number; // in hours
  issues: number;
  status: 'success' | 'warning' | 'error';
}

const TestResultChart: React.FC = () => {
  const testResults: TestResult[] = [
    { platform: 'Claude', buildTime: 2.0, issues: 0, status: 'success' },
    { platform: 'ChatGPT', buildTime: 3.0, issues: 1, status: 'warning' },
    { platform: 'Gemini', buildTime: 4.0, issues: 1, status: 'warning' },
    { platform: '千問', buildTime: 1.5, issues: 2, status: 'warning' },
  ];

  const getColor = (status: string) => {
    switch (status) {
      case 'success': return '#10B981'; // Green
      case 'warning': return '#F59E0B'; // Amber
      case 'error': return '#EF4444'; // Red
      default: return '#6B7280'; // Gray
    }
  };

  const timeData = {
    labels: testResults.map(result => result.platform),
    datasets: [
      {
        label: '完成時間 (小時)',
        data: testResults.map(result => result.buildTime),
        backgroundColor: testResults.map(result => getColor(result.status)),
        borderColor: testResults.map(result => getColor(result.status)),
        borderWidth: 1,
        yAxisID: 'y',
      },
    ],
  };

  const issuesData = {
    labels: testResults.map(result => result.platform),
    datasets: [
      {
        label: '遇到問題數量',
        data: testResults.map(result => result.issues),
        backgroundColor: testResults.map(result => 
          result.issues === 0 ? '#10B981' : 
          result.issues === 1 ? '#F59E0B' : '#EF4444'
        ),
        borderColor: testResults.map(result => 
          result.issues === 0 ? '#10B981' : 
          result.issues === 1 ? '#F59E0B' : '#EF4444'
        ),
        borderWidth: 1,
      },
    ],
  };

  const timeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '實際測試：MDX 系統搭建完成時間',
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex;
            const result = testResults[dataIndex];
            const statusText = result.status === 'success' ? '✅ 無重大問題' : 
                              result.status === 'warning' ? '⚠️ 需要調試' : '❌ 有問題';
            return statusText;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '時間 (小時)',
        },
        ticks: {
          stepSize: 0.5,
        },
      },
      x: {
        title: {
          display: true,
          text: 'AI 平台',
        },
      },
    },
  };

  const issuesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '實際測試：遇到問題數量統計',
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
        title: {
          display: true,
          text: '問題數量',
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: 'AI 平台',
        },
      },
    },
  };

  return (
    <div className="w-full my-8">
      {/* 完成時間圖表 */}
      <div className="p-4 bg-white rounded-lg shadow-md min-h-[350px] max-h-[400px] mb-6">
        <Bar data={timeData} options={timeOptions} />
      </div>
      
      {/* 問題數量圖表 */}
      <div className="p-4 bg-white rounded-lg shadow-md min-h-[350px] max-h-[400px]">
        <Bar data={issuesData} options={issuesOptions} />
      </div>

      {/* 測試說明 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p className="font-medium mb-2">測試場景：從零搭建 MDX 系統</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>✅ 無重大問題：可直接使用</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded mr-2"></div>
              <span>⚠️ 需要調試：依賴配置等小問題</span>
            </div>
          </div>
          <div className="space-y-1">
            <div><strong>測試標準：</strong>按照 AI 建議完整搭建系統</div>
            <div><strong>評估指標：</strong>完成時間、遇到問題、最終可用性</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultChart;