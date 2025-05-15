'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

// 天青色的十六進制代碼
const TIAN_QING_COLOR = '#88CCCA';

const data = [
  {
    name: 'MVP與快速原型開發',
    score: 90,
    description: '初創企業和創新項目對快速驗證概念的需求龐大',
    color: TIAN_QING_COLOR
  },
  {
    name: '企業應用與流程自動化',
    score: 85,
    description: '企業數位轉型推動大量流程自動化需求',
    color: TIAN_QING_COLOR
  },
  {
    name: '內部工具與管理後台',
    score: 75,
    description: '企業需要定制化內部系統提升效率',
    color: TIAN_QING_COLOR
  },
  {
    name: '行動應用與跨平台部署',
    score: 65,
    description: '行動應用需求持續但開發複雜度較高',
    color: TIAN_QING_COLOR
  },
  {
    name: '電商與客戶關係管理(CRM)',
    score: 60,
    description: '競爭激烈且通常需要長期合作關係',
    color: TIAN_QING_COLOR
  },
  {
    name: '數據分析與儀表板',
    score: 55,
    description: '企業通常傾向於內部處理敏感數據',
    color: TIAN_QING_COLOR
  }
];

// 為移動設備創建簡短的名稱
const getMobileName = (name: string) => {
  const nameMap: Record<string, string> = {
    'MVP與快速原型開發': 'MVP原型',
    '企業應用與流程自動化': '企業自動化',
    '內部工具與管理後台': '內部工具',
    '行動應用與跨平台部署': '行動應用',
    '電商與客戶關係管理(CRM)': '電商與CRM',
    '數據分析與儀表板': '數據分析'
  };
  return nameMap[name] || name;
};

const RankingChart = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  // 檢測視窗大小變化
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初始檢查
    checkIfMobile();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', checkIfMobile);
    
    // 清除監聽器
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // 根據設備選擇適當的數據
  const chartData = React.useMemo(() => {
    if (isMobile) {
      return data.map(item => ({
        ...item,
        displayName: getMobileName(item.name)
      }));
    }
    return data.map(item => ({
      ...item,
      displayName: item.name
    }));
  }, [isMobile]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-6">低代碼/無代碼應用領域：自由工作者前景排名</h2>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={isMobile ? 
              { top: 20, right: 50, left: 80, bottom: 5 } : 
              { top: 20, right: 50, left: 160, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis 
              dataKey="displayName" 
              type="category" 
              width={isMobile ? 70 : 150} 
              tick={{ fontSize: isMobile ? 12 : 14 }}
            />
            <Tooltip 
              formatter={(value) => [`前景評分: ${value}/100`, '']}
              labelFormatter={(label) => {
                // 在工具提示中顯示完整名稱
                const fullItem = chartData.find(item => item.displayName === label);
                return fullItem ? fullItem.name : label;
              }}
              wrapperStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px'
              }}
            />
            <Bar 
              dataKey="score" 
              name="前景評分" 
              isAnimationActive={true}
              animationDuration={1500}
            >
              {chartData.map((entry) => (
                <LabelList 
                  key={entry.name}
                  dataKey="score" 
                  position="right" 
                  style={{ fontWeight: 'bold' }} 
                />
              ))}
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-sm text-gray-600">
        *評分基於市場需求、專案特性和自由工作適合度綜合評估
      </div>
    </div>
  );
};

export default RankingChart;
