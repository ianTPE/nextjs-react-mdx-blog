"use client";
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts';

const techStackData = [
  { category: 'AI 需求分析', tools: 'GPT-4, BERT, AWS Comprehend', adoption: 85 },
  { category: '智能編碼', tools: 'GitHub Copilot, CodeWhisperer', adoption: 75 },
  { category: '自適應流水線', tools: 'Harness AI, Azure ML', adoption: 60 },
  { category: '智能運維', tools: 'Moogsoft, Google AIOps', adoption: 70 },
  { category: '數據閉環', tools: 'MLflow, Elasticsearch', adoption: 65 },
];

const TechStackChart = () => {
  return (
    <div className="w-full p-3 sm:p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2 sm:mb-4 text-center">AI 技術棧採用率分析</h3>
      <div className="-ml-2 sm:ml-0">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart 
            data={techStackData} 
            layout="vertical" 
            margin={{ top: 10, right: 25, left: 90, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fontSize: 14 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              dataKey="category" 
              type="category" 
              width={80} 
              tick={{ fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, '採用率']}
              contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', fontSize: 14 }}
            />
            <Bar 
              dataKey="adoption" 
              fill="#6366f1" 
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {techStackData.map((entry, index) => (
                <Cell 
                  key={`cell-${entry.category}`} 
                  fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TechStackChart;