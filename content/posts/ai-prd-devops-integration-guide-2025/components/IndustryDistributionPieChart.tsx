"use client";

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const industryData = [
  { name: '智能製造', value: 25, color: '#3b82f6' },
  { name: '金融科技', value: 20, color: '#10b981' },
  { name: '醫療健康', value: 15, color: '#f59e0b' },
  { name: '零售電商', value: 15, color: '#ef4444' },
  { name: '汽車工業', value: 10, color: '#8b5cf6' },
  { name: '其他產業', value: 15, color: '#6b7280' },
];

const IndustryDistributionPieChart = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">AI+PRD+DevOps 產業應用分布</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={industryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name} ${entry.value}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {industryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndustryDistributionPieChart;