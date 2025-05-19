"use client";

import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import type { 
  ChartData,
  ChartOptions,
  TooltipItem 
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MarketGrowthChart = () => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'LC/NC市場規模增長預測 (2022-2030)',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y}十億`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '市場規模 (十億美元)',
          font: {
            weight: 'bold' as const
          }
        },
        ticks: {
          callback: (value: string | number) => `$${value}`
        }
      }
    }
  };

  const data: ChartData<'line', number[], string> = {
    labels: ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    datasets: [
      {
        label: '全球LC/NC市場規模',
        data: [14.8, 25.7, 42.3, 68.9, 97.1, 133.8, 175.6, 221.5, 264.4],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3
      },
      {
        label: 'LC/NC相關就業機會',
        data: [9.2, 15.4, 26.8, 45.3, 65.8, 92.1, 124.5, 162.3, 198.7],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3
      }
    ],
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md mt-6">
      <div style={{ height: '400px' }}>
        <Line options={options} data={data} />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        * 數據來源：Gartner、Forrester Research、IDC及MarketsandMarkets研究報告綜合分析。就業機會數據包含全職、自由工作及兼職市場估計值。
      </p>
    </div>
  );
};

export default MarketGrowthChart;