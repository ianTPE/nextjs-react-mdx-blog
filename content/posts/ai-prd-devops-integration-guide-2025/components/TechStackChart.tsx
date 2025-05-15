"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Define types for our data
interface TechStackItem {
  category: string;
  tools: string;
  adoption: number;
}

// Dynamically import Recharts components to avoid SSR issues
const RechartsComponents = dynamic(() => import('recharts').then((mod) => ({
  BarChart: mod.BarChart,
  Bar: mod.Bar,
  XAxis: mod.XAxis,
  YAxis: mod.YAxis,
  CartesianGrid: mod.CartesianGrid,
  Tooltip: mod.Tooltip,
  Cell: mod.Cell,
  ResponsiveContainer: mod.ResponsiveContainer
})), { ssr: false });

const TechStackChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const techStackData: TechStackItem[] = [
    { category: 'AI 需求分析', tools: 'GPT-4, BERT, AWS Comprehend', adoption: 85 },
    { category: '智能編碼', tools: 'GitHub Copilot, CodeWhisperer', adoption: 75 },
    { category: '自適應流水線', tools: 'Harness AI, Azure ML', adoption: 60 },
    { category: '智能運維', tools: 'Moogsoft, Google AIOps', adoption: 70 },
    { category: '數據閉環', tools: 'MLflow, Elasticsearch', adoption: 65 },
  ];

  if (!isMounted || !RechartsComponents) {
    // Return a simple placeholder when not mounted (during SSR)
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入技術棧圖表...</p>
        </div>
      </div>
    );
  }

  // Destructure the dynamically loaded components
  const {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer
  } = RechartsComponents;

  return (
    <div className="w-full p-2 bg-white rounded-lg shadow-lg overflow-hidden">
      <h3 className="text-xl font-bold mb-2 text-center">AI 技術棧採用率分析</h3>
      <div className="flex justify-center w-full overflow-visible">
        <div className="w-full max-w-full sm:max-w-md md:max-w-lg mx-auto">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart 
              data={techStackData} 
              layout="vertical" 
              margin={{ top: 5, right: 10, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                dataKey="category" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                width={70} 
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, '採用率']} 
                contentStyle={{ fontSize: 12 }}
              />
              <Bar 
                dataKey="adoption" 
                fill="#6366f1"
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {techStackData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={[
                      '#3b82f6', // 藍
                      '#10b981', // 綠
                      '#f59e42', // 橙
                      '#ef4444', // 紅
                      '#a78bfa'  // 紫
                    ][index]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TechStackChart;