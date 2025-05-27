import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

const FreelanceOpportunityChart: React.FC = () => {
  const data = {
    labels: [
      '工作流程\n自動化',
      '行動與Web\n應用後端',
      '即時資料\n與推播',
      '企業級擴展\n與安全',
      'GraphQL入口\n微服務整合',
      '內容管理\nHeadless CMS'
    ],
    datasets: [
      {
        label: 'Upwork 職位數量',
        data: [1055, 1579, 712, 382, 90, 8],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)',
          'rgb(168, 85, 247)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: '自由職業平台需求分析：六大後端解決方案職位數量對比',
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
        callbacks: {
          label: function(context: any) {
            return '職位數量: ' + context.parsed.y.toLocaleString() + ' 個';
          },
          afterLabel: function(context: any) {
            const rankings = [
              '🥇 排名第1 - 高頻剛需',
              '🥇 排名第2 - 高頻剛需', 
              '🥈 排名第3 - 垂直專精',
              '🥉 排名第4 - 高階專業',
              '🥉 排名第5 - 高階專業',
              '🥉 排名第6 - 高階專業'
            ];
            return rankings[context.dataIndex];
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
            return value.toLocaleString();
          },
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: '職位數量',
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 0,
          minRotation: 0
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
        <Bar data={data} options={options} />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-bold text-green-800 mb-2">🥇 第一梯隊（高頻剛需）</h4>
          <ul className="text-green-700 space-y-1">
            <li>• 工作流程自動化：1055+ 職位</li>
            <li>• 行動與Web應用後端：1579+ 職位</li>
            <li>• 技術門檻適中，收入穩定</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2">🥈 第二梯隊（垂直專精）</h4>
          <ul className="text-blue-700 space-y-1">
            <li>• 即時資料與推播：712+ 職位</li>
            <li>• 特定場景需求，技術含量高</li>
            <li>• 適合有經驗的開發者</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-bold text-purple-800 mb-2">🥉 第三梯隊（高階專業）</h4>
          <ul className="text-purple-700 space-y-1">
            <li>• GraphQL微服務：90+ 職位</li>
            <li>• 企業級安全：382+ 職位</li>
            <li>• 高技術門檻，高收費潛力</li>
          </ul>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
          <h4 className="font-bold text-pink-800 mb-2">💎 專精利基（小而美）</h4>
          <ul className="text-pink-700 space-y-1">
            <li>• Headless CMS：8+ 職位</li>
            <li>• 競爭少，客單價高</li>
            <li>• 適合深度專精發展</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FreelanceOpportunityChart;