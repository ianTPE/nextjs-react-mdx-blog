'use client';

import { useState } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer
} from 'recharts';

const characteristicsData = [
  {
    subject: '專案週期短',
    'MVP與快速原型': 95,
    '企業應用與流程自動化': 75,
    '內部工具與管理後台': 80,
    '行動應用與跨平台部署': 60,
    '電商與CRM': 55,
    '數據分析與儀表板': 70,
    fullMark: 100,
  },
  {
    subject: '市場需求量',
    'MVP與快速原型': 85,
    '企業應用與流程自動化': 90,
    '內部工具與管理後台': 80,
    '行動應用與跨平台部署': 75,
    '電商與CRM': 70,
    '數據分析與儀表板': 65,
    fullMark: 100,
  },
  {
    subject: '專案預算',
    'MVP與快速原型': 70,
    '企業應用與流程自動化': 90,
    '內部工具與管理後台': 75,
    '行動應用與跨平台部署': 80,
    '電商與CRM': 85,
    '數據分析與儀表板': 65,
    fullMark: 100,
  },
  {
    subject: '技術門檻低',
    'MVP與快速原型': 80,
    '企業應用與流程自動化': 60,
    '內部工具與管理後台': 75,
    '行動應用與跨平台部署': 50,
    '電商與CRM': 65,
    '數據分析與儀表板': 55,
    fullMark: 100,
  },
  {
    subject: '後續維護少',
    'MVP與快速原型': 85,
    '企業應用與流程自動化': 60,
    '內部工具與管理後台': 70,
    '行動應用與跨平台部署': 40,
    '電商與CRM': 35,
    '數據分析與儀表板': 50,
    fullMark: 100,
  },
  {
    subject: '市場競爭低',
    'MVP與快速原型': 60,
    '企業應用與流程自動化': 75,
    '內部工具與管理後台': 70,
    '行動應用與跨平台部署': 55,
    '電商與CRM': 40,
    '數據分析與儀表板': 50,
    fullMark: 100,
  },
];

const colors = {
  'MVP與快速原型': '#4C9AFF',
  '企業應用與流程自動化': '#36B37E',
  '內部工具與管理後台': '#00B8D9',
  '行動應用與跨平台部署': '#6554C0',
  '電商與CRM': '#FFAB00',
  '數據分析與儀表板': '#FF5630'
};

// define Category type for proper typing
type Category = keyof typeof colors;

const ProjectCharacteristics = () => {
  const [activeCategories, setActiveCategories] = useState<Record<Category, boolean>>({
    'MVP與快速原型': true,
    '企業應用與流程自動化': true,
    '內部工具與管理後台': true,
    '行動應用與跨平台部署': false,
    '電商與CRM': false,
    '數據分析與儀表板': false
  });

  const handleLegendClick = (category: Category) => {
    setActiveCategories({
      ...activeCategories,
      [category]: !activeCategories[category]
    });
  };

  const renderRadars = () => {
    return (Object.keys(activeCategories) as Category[]).map((key) => {
      if (activeCategories[key]) {
        return (
          <Radar
            key={key}
            name={key}
            dataKey={key}
            stroke={colors[key]}
            fill={colors[key]}
            fillOpacity={0.3}
          />
        );
      }
      return null;
    });
  };

  const CustomizedLegend = () => (
    <div className="flex flex-wrap justify-center mt-4">
      {(Object.keys(colors) as Category[]).map((category) => (
        <button
          key={category}
          type="button"
          className="flex items-center mx-2 my-1 cursor-pointer"
          onClick={() => handleLegendClick(category)}
        >
          <div 
            className="w-4 h-4 mr-1 rounded-sm" 
            style={{ 
              backgroundColor: colors[category],
              opacity: activeCategories[category] ? 1 : 0.3
            }}
          />
          <span 
            className={`text-xs ${activeCategories[category] ? 'font-bold' : 'text-gray-500'}`}
          >
            {category}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-2">低代碼/無代碼應用領域特性比較</h2>
      <p className="text-center text-sm text-gray-600 mb-4">點擊圖例可切換顯示類別</p>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            cx="50%" 
            cy="50%" 
            outerRadius="70%" 
            data={characteristicsData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            {renderRadars()}
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <CustomizedLegend />
      <div className="text-center text-sm text-gray-600 mt-4">
        數值越高表示在該特性上對自由工作者越有利
      </div>
    </div>
  );
};

export default ProjectCharacteristics;
