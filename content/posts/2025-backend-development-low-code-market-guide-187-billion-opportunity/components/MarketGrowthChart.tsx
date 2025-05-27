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
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    datasets: [
      {
        label: '低程式碼/無程式碼市場規模 (億美元)',
        data: [103, 132, 175, 221, 287, 360, 455, 580, 740, 950, 1220, 1870],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: '傳統軟體開發市場 (億美元)',
        data: [4500, 4650, 4800, 4920, 5050, 5180, 5300, 5420, 5540, 5660, 5780, 5900],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.05)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(156, 163, 175)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderDash: [5, 5]
      }
    ]
  };

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
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: '全球低程式碼 vs 傳統軟體開發市場規模對比',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': $' + context.parsed.y + '億美元';
          },
          afterLabel: function(context: any) {
            if (context.datasetIndex === 0) {
              const year = context.label;
              const growthRates: { [key: string]: string } = {
                '2020': '(+28%)',
                '2021': '(+33%)',
                '2022': '(+26%)',
                '2023': '(+30%)',
                '2024': '(+25%)',
                '2025': '(+26%)',
                '2026': '(+27%)',
                '2027': '(+28%)',
                '2028': '(+28%)',
                '2029': '(+28%)',
                '2030': '(+53%)'
              };
              return '年增長率: ' + (growthRates[year] || '');
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value + '億';
          },
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p className="font-medium">關鍵洞察：</p>
        <p>低程式碼市場預計在2030年達到1870億美元，年複合增長率31%，</p>
        <p>相比傳統軟體開發市場的穩定增長，呈現爆發式發展趨勢</p>
      </div>
    </div>
  );
};

export default MarketGrowthChart;