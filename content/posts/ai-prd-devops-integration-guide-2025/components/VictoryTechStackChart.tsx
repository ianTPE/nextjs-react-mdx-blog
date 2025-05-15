"use client";

import React, { useEffect, useState } from 'react';

// 定義數據類型
interface TechStackItem {
  category: string;
  adoption: number;
  tools: string;
}

const VictoryTechStackChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 技術棧數據
  const techStackData = [
    { category: 'AI 需求分析', tools: 'GPT-4, BERT, AWS Comprehend', adoption: 85 },
    { category: '智能編碼', tools: 'GitHub Copilot, CodeWhisperer', adoption: 75 },
    { category: '自適應流水線', tools: 'Harness AI, Azure ML', adoption: 60 },
    { category: '智能運維', tools: 'Moogsoft, Google AIOps', adoption: 70 },
    { category: '數據閉環', tools: 'MLflow, Elasticsearch', adoption: 65 },
  ];

  // 顏色配置
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (!isMounted) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
        <div className="w-full h-[350px] flex items-center justify-center bg-gray-50">
          <p>載入技術棧圖表...</p>
        </div>
      </div>
    );
  }

  // 使用更簡單的方法來顯示圖表，避免客戶端渲染問題
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* 自定義水平條形圖 */}
          <div className="space-y-4 py-2">
            {techStackData.map((item, index) => (
              <div key={item.category} className="relative">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium w-24 md:w-32">{item.category}</span>
                  <div className="flex-1 h-8 bg-gray-100 rounded-r-md overflow-hidden">
                    <div 
                      className="h-full rounded-r-md flex items-center pl-2 text-white text-sm font-medium"
                      style={{
                        width: `${item.adoption}%`,
                        backgroundColor: colors[index % colors.length],
                      }}
                    >
                      {item.adoption}%
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 ml-24 md:ml-32">{item.tools}</div>
              </div>
            ))}
          </div>
          
          {/* X軸標籤 */}
          <div className="flex justify-between px-24 md:px-32 mt-2 text-xs text-gray-500">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryTechStackChart;
