import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryDetail {
  country: string;
  visa: string;
  duration: string;
  advantage: string;
  savingsRate: string;
  taxRate: string;
}

const DigitalNomadCostChart: React.FC = () => {
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
        text: '熱門數位遊民目的地：簽證要求 vs 生活成本對比',
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
        borderColor: '#8B5CF6',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            if (context.dataset.label === '月收入要求') {
              return `月收入要求: $${context.parsed.y.toLocaleString()}`;
            } else {
              return `月生活成本: $${context.parsed.y.toLocaleString()}`;
            }
          },
          afterLabel: function(context: any) {
            const income = context.dataset.label === '月收入要求' ? context.parsed.y : null;
            const cost = context.dataset.label === '月生活成本' ? context.parsed.y : null;
            
            if (income) {
              const avgCost = [1500, 2200, 1000, 1200, 800][context.dataIndex];
              const savingsRate = ((income - avgCost) / income * 100).toFixed(1);
              return `預估儲蓄率: ${savingsRate}%`;
            }
            return '';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '金額 (美元)',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: '國家/地區',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      }
    }
  };

  const countries = ['葡萄牙', '西班牙', '泰國', '墨西哥', '哥倫比亞'];
  
  const data = {
    labels: countries,
    datasets: [
      {
        label: '月收入要求',
        data: [3800, 2900, 7300, 2800, 750], // 轉換為美元
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: '#EF4444',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      },
      {
        label: '月生活成本',
        data: [1500, 2200, 1000, 1200, 800],
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: '#22C55E',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  const countryDetails: CountryDetail[] = [
    {
      country: '🇵🇹 葡萄牙',
      visa: 'D8 簽證',
      duration: '1年可續簽',
      advantage: '申根區自由旅行',
      savingsRate: '60.5%',
      taxRate: '低稅率'
    },
    {
      country: '🇪🇸 西班牙',
      visa: '數位遊民簽證',
      duration: '最長5年',
      advantage: '家屬可隨行',
      savingsRate: '24.1%',
      taxRate: '24%固定稅率'
    },
    {
      country: '🇹🇭 泰國',
      visa: 'LTR 簽證',
      duration: '10年有效',
      advantage: '超長效期',
      savingsRate: '86.3%',
      taxRate: '外國收入免稅'
    },
    {
      country: '🇲🇽 墨西哥',
      visa: '臨時居民簽證',
      duration: '可延長至4年',
      advantage: '覆蓋北美時區',
      savingsRate: '57.1%',
      taxRate: '無需當地納稅'
    },
    {
      country: '🇨🇴 哥倫比亞',
      visa: '數位遊民簽證',
      duration: '2年',
      advantage: '最低門檻',
      savingsRate: '-6.7%',
      taxRate: '低生活成本'
    }
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 my-8">
      <div className="h-96 mb-6">
        <Bar options={options} data={data} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 mb-3">🌍 各國詳細資訊</h4>
          {countryDetails.map((country, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{country.country}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  parseFloat(country.savingsRate) > 50 ? 'bg-green-100 text-green-800' :
                  parseFloat(country.savingsRate) > 20 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  儲蓄率 {country.savingsRate}
                </span>
              </div>
              <div className="text-gray-600 space-y-1">
                <div>📋 {country.visa} • {country.duration}</div>
                <div>💡 {country.advantage}</div>
                <div>💰 {country.taxRate}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">💡 地理套利策略</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>泰國：最高儲蓄率86.3%，10年簽證</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span>葡萄牙：歐洲門戶，5年永居路徑</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                <span>墨西哥：北美時區，客戶協作便利</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">📊 收益計算範例</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>月收入：$15,000 (SOAR顧問時薪$150 x 100小時)</div>
              <div className="border-t pt-2 mt-2">
                <div>🇹🇭 泰國生活：月支出$1,000 → 月儲蓄$14,000</div>
                <div>🇺🇸 美國生活：月支出$8,000 → 月儲蓄$7,000</div>
                <div className="font-medium text-green-600 mt-1">
                  地理套利優勢：額外儲蓄 $7,000/月 ($84,000/年)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>數據來源: 各國政府官方簽證要求 + Nomad List 生活成本統計 (2025年)</p>
        <p className="mt-1 text-purple-600 font-medium">
          💼 建議：選擇符合個人收入水平和生活偏好的目的地，平衡成本與生活品質
        </p>
      </div>
    </div>
  );
};

export default DigitalNomadCostChart;