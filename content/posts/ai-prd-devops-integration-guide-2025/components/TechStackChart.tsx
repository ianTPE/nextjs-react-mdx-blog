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
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">AI 技術棧採用率分析</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={techStackData} layout="vertical" margin={{ left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="category" type="category" width={100} />
          <Tooltip 
            formatter={(value, name) => [`${value}%`, '採用率']}
            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
          />
          <Bar dataKey="adoption" fill="#6366f1" radius={[0, 4, 4, 0]}>
            {techStackData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TechStackChart;