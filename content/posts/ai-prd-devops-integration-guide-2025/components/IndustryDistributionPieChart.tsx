"use client";

import React, { useEffect, useState } from 'react';

const IndustryDistributionPieChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const industryData = [
    { name: '智能製造', value: 25, color: '#3b82f6' },
    { name: '金融科技', value: 20, color: '#10b981' },
    { name: '醫療健康', value: 15, color: '#f59e0b' },
    { name: '零售電商', value: 15, color: '#ef4444' },
    { name: '汽車工業', value: 10, color: '#8b5cf6' },
    { name: '其他產業', value: 15, color: '#6b7280' },
  ];

  if (!isMounted) {
    // Return a simple placeholder when not mounted (during SSR)
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">AI+PRD+DevOps 產業應用分布</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入產業分布圖...</p>
        </div>
      </div>
    );
  }

  // Import Recharts components only on the client side
  const {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
  } = require('recharts');

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