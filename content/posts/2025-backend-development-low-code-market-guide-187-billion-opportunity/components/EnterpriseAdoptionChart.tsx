import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  TooltipItem
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const EnterpriseAdoptionChart: React.FC = () => {
  const adoptionData = {
    labels: [
      '已全面採用低程式碼',
      '正在評估或試點',
      '計劃在未來12個月內採用',
      '尚無明確計劃',
      '不考慮採用'
    ],
    datasets: [
      {
        label: '企業採用比例',
        data: [41, 27, 16, 12, 4],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(156, 163, 175, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(251, 191, 36)',
          'rgb(156, 163, 175)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: 'rgba(255, 255, 255, 0.8)'
      }
    ]
  };

  const benefitsData = {
    labels: [
      '提升開發速度',
      '降低IT成本',
      '增強業務敏捷性',
      '改善用戶體驗',
      '加速數位轉型',
      '提高員工生產力'
    ],
    datasets: [
      {
        label: '企業獲益比例',
        data: [89, 76, 82, 71, 85, 79],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: 'rgba(255, 255, 255, 0.8)'
      }
    ]
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    cutout: '50%'
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-center mb-6">企業低程式碼採用現況與效益分析</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 採用率圖表 */}
        <div>
          <h4 className="text-md font-semibold text-center mb-4 text-gray-700">
            企業採用低程式碼平台現況分佈
          </h4>
          <div className="h-64">
            <Doughnut data={adoptionData} options={chartOptions} />
          </div>
        </div>

        {/* 效益圖表 */}
        <div>
          <h4 className="text-md font-semibold text-center mb-4 text-gray-700">
            企業採用低程式碼後獲得的主要效益
          </h4>
          <div className="h-64">
            <Doughnut data={benefitsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 統計數據摘要 */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">84%</div>
          <div className="text-sm text-green-700">企業已採用或正在評估</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">70%</div>
          <div className="text-sm text-blue-700">2025年新應用將使用低程式碼</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">10x</div>
          <div className="text-sm text-yellow-700">開發速度平均提升</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">75%</div>
          <div className="text-sm text-purple-700">大型企業將使用4+低程式碼工具</div>
        </div>
      </div>

      {/* 關鍵洞察 */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-bold text-blue-800 mb-3">📊 關鍵市場洞察</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <strong>採用趨勢：</strong>
            <ul className="mt-2 space-y-1">
              <li>• 68%企業已採用或正在試點低程式碼平台</li>
              <li>• 公民開發者將以4:1比例超越專業開發者</li>
              <li>• 到2024年80%技術產品將由非技術專業人員構建</li>
            </ul>
          </div>
          <div>
            <strong>商業效益：</strong>
            <ul className="mt-2 space-y-1">
              <li>• 平均企業避免招聘2名IT開發人員</li>
              <li>• 3年內獲得440萬美元業務價值增長</li>
              <li>• 91%IT決策者認為低程式碼改善了IT能力</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAdoptionChart;