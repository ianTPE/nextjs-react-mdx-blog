import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem
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

const IncomeComparisonChart: React.FC = () => {
  const data = {
    labels: [
      '新手階段\n(0-6月)',
      '初級開發者\n(6-12月)',
      '中級開發者\n(1-2年)',
      '高級開發者\n(2-3年)',
      '專家/顧問\n(3年以上)',
      '技術創業者\n(5年以上)'
    ],
    datasets: [
      {
        label: '傳統後端開發 (年薪 $)',
        data: [45000, 65000, 85000, 110000, 140000, 180000],
        backgroundColor: 'rgba(156, 163, 175, 0.8)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      },
      {
        label: '低程式碼後端開發 (年薪 $)',
        data: [35000, 80000, 120000, 180000, 250000, 400000],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      },
      {
        label: '自由職業收入潛力 (年收入 $)',
        data: [25000, 95000, 150000, 220000, 350000, 600000],
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  const pricingData = [
    {
      category: '工作流程自動化',
      hourlyRate: '$50-120',
      projectRange: '$800-3000',
      monthlyRetainer: '$500-2000'
    },
    {
      category: 'API開發與資料庫',
      hourlyRate: '$60-150',
      projectRange: '$1500-8000',
      monthlyRetainer: '$800-3500'
    },
    {
      category: 'Headless CMS',
      hourlyRate: '$80-180',
      projectRange: '$2500-12000',
      monthlyRetainer: '$1000-4000'
    },
    {
      category: 'GraphQL微服務',
      hourlyRate: '$100-250',
      projectRange: '$5000-25000',
      monthlyRetainer: '$2000-8000'
    },
    {
      category: '企業級安全',
      hourlyRate: '$150-300',
      projectRange: '$10000-50000',
      monthlyRetainer: '$3000-15000'
    }
  ];

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: '不同發展階段收入潛力對比分析',
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
        borderColor: 'rgba(34, 197, 94, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          },
          afterLabel: (context: TooltipItem<'bar'>) => {
            if (context.datasetIndex === 1 && context.dataIndex >= 2) {
              const increases = ['', '', '41%↑', '64%↑', '79%↑', '122%↑'];
              return `相比傳統開發: ${increases[context.dataIndex]}`;
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
          callback: function(this: any, value: number | string) {
            if (typeof value === 'number') {
              return `$${value / 1000}k`;
            }
            return value;
          },
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: '年收入 (美元)',
          font: {
            size: 12,
            weight: 'bold'
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
      mode: 'index'
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="h-96 mb-8">
        <Bar data={data} options={options} />
      </div>

      {/* 收費標準表格 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">💰 各領域收費標準參考</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 font-medium text-gray-700">技術領域</th>
                <th className="text-left p-3 font-medium text-gray-700">時薪範圍</th>
                <th className="text-left p-3 font-medium text-gray-700">專案報價</th>
                <th className="text-left p-3 font-medium text-gray-700">月度維護</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{item.category}</td>
                  <td className="p-3 text-green-600 font-medium">{item.hourlyRate}</td>
                  <td className="p-3 text-blue-600 font-medium">{item.projectRange}</td>
                  <td className="p-3 text-purple-600 font-medium">{item.monthlyRetainer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 成功案例收入展示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$180k</div>
            <div className="text-sm text-green-700 mt-1">年收入</div>
            <div className="text-xs text-green-600 mt-2">
              專精工作流程自動化<br/>
              服務35+企業客戶
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">$320k</div>
            <div className="text-sm text-blue-700 mt-1">年收入</div>
            <div className="text-xs text-blue-600 mt-2">
              GraphQL企業級顧問<br/>
              長期合約客戶8家
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$450k</div>
            <div className="text-sm text-purple-700 mt-1">年收入</div>
            <div className="text-xs text-purple-600 mt-2">
              SaaS產品創始人<br/>
              基於低程式碼平台
            </div>
          </div>
        </div>
      </div>

      {/* 關鍵成功因素 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-bold text-orange-800 mb-3">🚀 高收入關鍵成功因素</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
          <div>
            <strong>技能組合策略：</strong>
            <ul className="mt-2 space-y-1">
              <li>• 掌握2-3個高需求技術棧</li>
              <li>• 專精一個垂直領域深度發展</li>
              <li>• 結合AI工具提升開發效率</li>
              <li>• 建立可複用的解決方案庫</li>
            </ul>
          </div>
          <div>
            <strong>商業化策略：</strong>
            <ul className="mt-2 space-y-1">
              <li>• 從按時計費轉向按價值計費</li>
              <li>• 建立長期維護合約收入</li>
              <li>• 發展SaaS產品被動收入</li>
              <li>• 培養個人品牌和影響力</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeComparisonChart;