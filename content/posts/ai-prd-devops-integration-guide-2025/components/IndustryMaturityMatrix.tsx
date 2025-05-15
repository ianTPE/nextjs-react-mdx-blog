"use client";

import React, { useEffect, useState } from 'react';

// Define types for our data
interface IndustryMaturityItem {
  industry: string;
  prd: number;
  devops: number;
  aiops: number;
  overall: number;
}

const IndustryMaturityMatrix = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const industryApplicationData: IndustryMaturityItem[] = [
    { industry: '智能製造', prd: 90, devops: 85, aiops: 88, overall: 88 },
    { industry: '金融科技', prd: 95, devops: 90, aiops: 92, overall: 92 },
    { industry: '醫療健康', prd: 85, devops: 75, aiops: 80, overall: 80 },
    { industry: '零售電商', prd: 88, devops: 82, aiops: 85, overall: 85 },
    { industry: '汽車工業', prd: 92, devops: 88, aiops: 90, overall: 90 },
  ];

  if (!isMounted) {
    // Return a simple placeholder when not mounted (during SSR)
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">各產業 AI 應用成熟度分析</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入產業成熟度矩陣圖...</p>
        </div>
      </div>
    );
  }

  // Import Recharts components only on the client side
  const {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } = require('recharts');

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">各產業 AI 應用成熟度分析</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={industryApplicationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="industry" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="prd" name="PRD智能化" fill="#3b82f6" />
          <Bar dataKey="devops" name="DevOps自動化" fill="#10b981" />
          <Bar dataKey="aiops" name="AIOps運維" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndustryMaturityMatrix;