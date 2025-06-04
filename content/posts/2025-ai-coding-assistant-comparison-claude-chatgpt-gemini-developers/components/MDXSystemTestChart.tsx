"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface MDXTestResult {
  platform: string;
  buildTime: number; // in hours
  codeUsability: number; // percentage
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

const MDXSystemTestChart: React.FC = () => {
  const testResults: MDXTestResult[] = [
    { platform: 'Claude', buildTime: 2, codeUsability: 100, status: 'excellent' },
    { platform: 'ChatGPT', buildTime: 3, codeUsability: 90, status: 'good' },
    { platform: 'Gemini', buildTime: 4, codeUsability: 85, status: 'good' },
    { platform: '千問', buildTime: 1.5, codeUsability: 70, status: 'fair' },
  ];

  const getTimeColor = (time: number) => {
    if (time <= 2) return '#10B981'; // Green
    if (time <= 3) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const getUsabilityColor = (usability: number) => {
    if (usability >= 95) return '#10B981'; // Green
    if (usability >= 85) return '#06B6D4'; // Blue
    if (usability >= 70) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  const data = {
    labels: testResults.map(result => result.platform),
    datasets: [
      {
        type: 'bar' as const,
        label: '完成時間 (小時)',
        data: testResults.map(result => result.buildTime),
        backgroundColor: testResults.map(result => getTimeColor(result.buildTime)),
        borderColor: testResults.map(result => getTimeColor(result.buildTime)),
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        type: 'bar' as const,
        label: '代碼可用性 (%)',
        data: testResults.map(result => result.codeUsability),
        backgroundColor: testResults.map(result => getUsabilityColor(result.codeUsability)),
        borderColor: testResults.map(result => getUsabilityColor(result.codeUsability)),
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'MDX系統搭建測試結果對比',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex;
            const result = testResults[dataIndex];
            if (context.datasetIndex === 0) {
              const statusText = result.status === 'excellent' ? '✅ 優秀' : 
                                result.status === 'good' ? '✅ 良好' : 
                                result.status === 'fair' ? '⚠️ 一般' : '❌ 較差';
              return `整體評價：${statusText}`;
            }
            return '';
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '完成時間 (小時)',
        },
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '代碼可用性 (%)',
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          drawOnChartArea: false,
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
    <div className="w-full my-8 p-4 bg-white rounded-lg shadow-md min-h-[400px] max-h-[500px]">
      <Bar data={data} options={options} />
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">測試詳情：</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-medium mb-1">測試場景：</p>
            <ul className="space-y-1">
              <li>• 從零搭建完整的 MDX 系統</li>
              <li>• 包含打包、存儲、API、渲染全流程</li>
              <li>• 實際運行並測試功能</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1">評估標準：</p>
            <ul className="space-y-1">
              <li>• 完成時間：越短越好</li>
              <li>• 代碼可用性：能直接運行的比例</li>
              <li>• 遇到問題的嚴重程度</li>
            </ul>
          </div>
        </div>
        <div className="mt-3 p-2 bg-blue-50 rounded">
          <p className="text-xs"><strong>結論：</strong>Claude 在實用性和完成效率方面表現最佳，代碼可直接使用且完成時間合理。</p>
        </div>
      </div>
    </div>
  );
};

export default MDXSystemTestChart;