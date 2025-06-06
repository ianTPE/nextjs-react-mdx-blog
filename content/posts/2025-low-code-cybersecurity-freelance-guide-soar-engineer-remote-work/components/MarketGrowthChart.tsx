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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MarketGrowthChart: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      title: {
        display: true,
        text: 'LC/NC市場規模增長趨勢 (2020-2030)',
        font: {
          size: 16,
          weight: 'bold' as const,
          family: 'Inter, sans-serif'
        },
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3B82F6',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.parsed.y}B`;
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
            size: 12,
            family: 'Inter, sans-serif'
          }
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value + 'B';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: '年份',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  const data = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    datasets: [
      {
        label: 'LC/NC市場總規模',
        data: [7, 9, 12, 15, 18, 24, 32, 45, 67, 98, 187],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: '資安相關LC/NC市場',
        data: [1.2, 1.8, 2.5, 3.2, 4.1, 5.5, 7.8, 11.2, 16.8, 24.5, 37.4],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#EF4444',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 my-8">
      <div className="h-96">
        <Line options={options} data={data} />
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>數據來源: Gartner, ISG Information Services Group 市場研究報告</p>
        <p className="mt-1 text-blue-600 font-medium">
          💡 預測到2030年，資安LC/NC市場將達到374億美元，年複合增長率超過40%
        </p>
      </div>
    </div>
  );
};

export default MarketGrowthChart;