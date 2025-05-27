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
  Filler,
  ChartOptions,
  TooltipItem
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

const SkillRoadmapChart: React.FC = () => {
  const data = {
    labels: [
      '第1月', '第2月', '第3月', '第6月', '第9月', '第12月', '第18月', '第24月'
    ],
    datasets: [
      {
        label: '技術技能等級 (1-100)',
        data: [10, 25, 40, 60, 70, 80, 90, 95],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10
      },
      {
        label: '月收入潛力 (千美元)',
        data: [0, 1, 3, 8, 15, 25, 40, 60],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10
      },
      {
        label: '客戶數量',
        data: [0, 1, 3, 8, 15, 25, 35, 50],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: 'rgb(255, 255, 255)',
        pointBorderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10
      }
    ]
  };

  const milestones = [
    { month: 1, title: '工具基礎', skills: ['Zapier', 'Airtable'] },
    { month: 2, title: '首個專案', skills: ['API整合', '客戶溝通'] },
    { month: 3, title: '技能擴展', skills: ['Supabase', 'Bubble'] },
    { month: 6, title: '專業化', skills: ['GraphQL', 'Headless CMS'] },
    { month: 9, title: '市場定位', skills: ['品牌建立', '定價策略'] },
    { month: 12, title: '規模化', skills: ['團隊協作', '流程優化'] },
    { month: 18, title: '專家地位', skills: ['思想領導', '產品開發'] },
    { month: 24, title: '行業影響力', skills: ['創業投資', '生態建設'] }
  ];

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: '後端開發者低程式碼轉型路線圖 (24個月)',
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const labels = ['技術等級', '月收入 $', '客戶數'];
            const units = ['分', 'k', '個'];
            return `${labels[context.datasetIndex]}: ${context.parsed.y}${units[context.datasetIndex]}`;
          },
          afterLabel: (context: TooltipItem<'line'>) => {
            const monthIndex = context.dataIndex;
            const milestone = milestones[monthIndex];
            if (milestone) {
              return [
                `🏁 里程碑: ${milestone.title}`,
                `📚 核心技能: ${milestone.skills.join(', ')}`
              ];
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
      mode: 'index'
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="h-96">
        <Line data={data} options={options} />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        {milestones.slice(0, 4).map((milestone, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
            <div className="font-bold text-blue-800">{milestone.title}</div>
            <div className="text-blue-600 mt-1">第{milestone.month}個月</div>
            <div className="text-gray-600 mt-2 text-xs">
              {milestone.skills.map((skill, i) => (
                <span key={i} className="inline-block bg-white px-2 py-1 rounded mr-1 mb-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        {milestones.slice(4, 8).map((milestone, index) => (
          <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
            <div className="font-bold text-green-800">{milestone.title}</div>
            <div className="text-green-600 mt-1">第{milestone.month}個月</div>
            <div className="text-gray-600 mt-2 text-xs">
              {milestone.skills.map((skill, i) => (
                <span key={i} className="inline-block bg-white px-2 py-1 rounded mr-1 mb-1">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
        <div className="text-sm text-center">
          <p className="font-bold text-orange-800 mb-2">🚀 預期成果</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-lg font-bold text-blue-600">95分</div>
              <div className="text-gray-600">專家級技術水平</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">$60k/月</div>
              <div className="text-gray-600">穩定收入潛力</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">50+客戶</div>
              <div className="text-gray-600">建立客戶網路</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRoadmapChart;