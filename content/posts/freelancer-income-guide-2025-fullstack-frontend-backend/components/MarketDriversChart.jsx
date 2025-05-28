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

const MarketDriversChart = () => {
  const data = {
    labels: [
      '企業數字化轉型',
      '遠程工作常態化', 
      'AI技術民主化',
      '中小企業技術普及',
      '訂閱經濟崛起'
    ],
    datasets: [
      {
        label: '市場影響程度',
        data: [84, 70, 68, 65, 65.2],
        backgroundColor: [
          'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
          'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
          'linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)',
          'linear-gradient(90deg, #10b981 0%, #059669 100%)',
          'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '2025年市場需求驅動因素分析',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Inter, system-ui, sans-serif',
        },
        color: '#1f2937',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 12,
        displayColors: false,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `影響程度: ${context.parsed.x}%`;
          },
          afterLabel: function(context) {
            const drivers = {
              '企業數字化轉型': '推動自動化和效率提升需求',
              '遠程工作常態化': '創造新的工具和平台需求',
              'AI技術民主化': '降低AI應用門檻，增加整合需求',
              '中小企業技術普及': '低代碼工具普及，市場擴大',
              '訂閱經濟崛起': '訂閱制平台和服務大量需求'
            };
            return drivers[context.label] || '';
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 90,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#6b7280',
          callback: function(value) {
            return value + '%';
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: '500',
            family: 'Inter, system-ui, sans-serif',
          },
          color: '#374151',
          crossAlign: 'far',
        },
      },
    },
    animation: {
      duration: 2500,
      easing: 'easeOutQuart',
      delay: (context) => {
        return context.dataIndex * 200;
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const driversData = [
    {
      name: '企業數字化轉型',
      percentage: 84,
      color: 'from-red-400 to-red-600',
      icon: '🏢',
      description: '84%企業已轉向低代碼平台',
      impact: '每個企業平均需要2-5個數字化項目'
    },
    {
      name: '遠程工作常態化',
      percentage: 70,
      color: 'from-blue-400 to-blue-600',
      icon: '💻',
      description: '70%員工每週至少遠程工作一天',
      impact: '帶來大量系統和工具需求'
    },
    {
      name: 'AI技術民主化',
      percentage: 68,
      color: 'from-purple-400 to-purple-600',
      icon: '🤖',
      description: '18%企業尋找AI技能freelancer',
      impact: '全職員工缺乏相關技能'
    },
    {
      name: '中小企業技術普及',
      percentage: 65,
      color: 'from-green-400 to-green-600',
      icon: '🏪',
      description: '低代碼工具讓中小企業數字化',
      impact: '市場規模擴大10倍'
    },
    {
      name: '訂閱經濟崛起',
      percentage: 65.2,
      color: 'from-yellow-400 to-orange-500',
      icon: '💳',
      description: '訂閱制電商年增長65.2%',
      impact: '每個品牌都需要相關系統'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="h-[400px] p-6">
        <Bar data={data} options={options} />
      </div>
      
      <div className="px-6 pb-6">
        <div className="bg-white rounded-xl p-5 shadow-inner border border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
            驅動因素詳細分析
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {driversData.map((driver, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xl">{driver.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-gray-800 text-sm">{driver.name}</h5>
                      <span className="text-lg font-bold text-gray-900">{driver.percentage}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${driver.color} mt-1`}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">{driver.description}</p>
                  <p className="text-xs text-gray-600">{driver.impact}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <div className="text-center">
              <h5 className="font-bold text-emerald-700 mb-2">📈 市場機會預測</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-bold text-emerald-600">8650萬</p>
                  <p className="text-gray-600">美國freelancer數量</p>
                </div>
                <div>
                  <p className="font-bold text-blue-600">70%</p>
                  <p className="text-gray-600">新應用低代碼開發</p>
                </div>
                <div>
                  <p className="font-bold text-purple-600">4:1</p>
                  <p className="text-gray-600">公民vs專業開發者</p>
                </div>
                <div>
                  <p className="font-bold text-orange-600">650億</p>
                  <p className="text-gray-600">2027年市場規模</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDriversChart;