import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const JobSatisfactionChart = () => {
  const data = {
    labels: ['Digital Nomads', '傳統辦公室工作者'],
    datasets: [
      {
        data: [79, 52],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(156, 163, 175, 0.6)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 0,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(156, 163, 175, 0.7)',
        ],
        hoverBorderWidth: 4,
        hoverBorderColor: '#ffffff',
        cutout: '65%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '工作滿意度對比分析',
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
        displayColors: true,
        usePointStyle: true,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `滿意度: ${value}% (佔比: ${percentage}%)`;
          },
          afterLabel: function(context) {
            const label = context.label;
            if (label === 'Digital Nomads') {
              return '• 高度工作自由度\n• 地點獨立性\n• 工作生活平衡';
            } else {
              return '• 固定辦公環境\n• 通勤時間成本\n• 工作時間限制';
            }
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeOutQuart',
    },
    interaction: {
      intersect: false,
    },
  };

  const satisfactionData = [
    {
      type: 'Digital Nomads',
      percentage: 79,
      color: 'from-green-400 to-emerald-600',
      icon: '🌍',
      benefits: ['工作地點自由', '時間安排彈性', '全球化視野', '生活成本優化']
    },
    {
      type: '傳統辦公室工作者',
      percentage: 52,
      color: 'from-gray-400 to-gray-600',
      icon: '🏢',
      benefits: ['穩定收入來源', '團隊協作環境', '公司福利制度', '職業發展路徑']
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl shadow-xl border border-green-100 overflow-hidden">
      <div className="h-96 p-6 relative">
        <Doughnut data={data} options={options} />
        {/* 中心文字 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">79% vs 52%</p>
            <p className="text-sm text-gray-600">滿意度差距</p>
            <p className="text-lg font-semibold text-green-600 mt-1">+27%</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {satisfactionData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-inner border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h5 className="font-semibold text-gray-800">{item.type}</h5>
                  <p className="text-lg font-bold text-gray-900">{item.percentage}%</p>
                </div>
                <div className={`w-12 h-2 rounded-full bg-gradient-to-r ${item.color} ml-auto`}></div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 mb-2">主要優勢：</p>
                {item.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="text-center">
              <p className="font-bold text-green-600 text-lg">27%</p>
              <p className="text-gray-600">滿意度優勢</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-blue-600 text-lg">4000萬</p>
              <p className="text-gray-600">全球數字遊民</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-purple-600 text-lg">36歲</p>
              <p className="text-gray-600">平均年齡</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSatisfactionChart;