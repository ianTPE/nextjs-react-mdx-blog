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

const EndToEndBenchmarkChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'End to End task benchmark | Offline Evals',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#ffffff',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 6,
        ticks: {
          stepSize: 2,
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#ffffff',
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: [
      'Claude\nSonnet 3.7\nThinking',
      'Claude\nSonnet 3.7',
      'SWE-1',
      'Claude\nSonnet 3.5',
      'DeepSeek V3',
      'SWE-1 Lite',
      'Claude\nHaiku 3.5',
      'Qwen 3',
      'Qwen 2.5\n72B Inst'
    ],
    datasets: [
      {
        data: [5.8, 5.7, 5.6, 5.3, 5.2, 5.0, 4.2, 3.6, 2.7],
        backgroundColor: [
          '#808080', // Claude Sonnet 3.7 Thinking
          '#808080', // Claude Sonnet 3.7
          '#4A90E2', // SWE-1 (highlighted in blue)
          '#808080', // Claude Sonnet 3.5
          '#808080', // DeepSeek V3
          '#4A90E2', // SWE-1 Lite (highlighted in blue)
          '#808080', // Claude Haiku 3.5
          '#808080', // Qwen 3
          '#808080', // Qwen 2.5 72B Inst
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-full my-8 p-4 bg-black rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <div className="text-white text-sm">
          <span className="mr-8">
            <span className="inline-block w-4 h-4 bg-gray-500 mr-2"></span>
            Frontier models
          </span>
          <span>
            <span className="inline-block w-4 h-4 bg-gray-500 mr-2"></span>
            Mid-sized models
          </span>
        </div>
      </div>
      <div style={{ height: '500px' }}>
        <Bar data={data} options={options} />
      </div>
      <div className="text-white text-xs mt-4 text-center">
        * SWE-1 and SWE-1 Lite highlighted in blue for Windsurf models
      </div>
    </div>
  );
};

export default EndToEndBenchmarkChart;