"use client";

import React, { useEffect, useState } from 'react';

// Define types for our data
interface BenefitDataItem {
  metric: string;
  traditional: number;
  ai: number;
  fullMark: number;
}

const BenefitRadarChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const benefitData: BenefitDataItem[] = [
    {
      metric: '需求準確率',
      traditional: 65,
      ai: 92,
      fullMark: 100,
    },
    {
      metric: '開發效率',
      traditional: 40,
      ai: 80,
      fullMark: 100,
    },
    {
      metric: '部署成功率',
      traditional: 85,
      ai: 98,
      fullMark: 100,
    },
    {
      metric: '故障響應速度',
      traditional: 30,
      ai: 90,
      fullMark: 100,
    },
    {
      metric: '代碼質量',
      traditional: 75,
      ai: 92,
      fullMark: 100,
    },
    {
      metric: '成本效益',
      traditional: 50,
      ai: 85,
      fullMark: 100,
    },
  ];

  if (!isMounted) {
    // Return a simple placeholder when not mounted (during SSR)
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-center">傳統模式 vs AI 賦能模式效益對比</h3>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
          <p>載入雷達圖...</p>
        </div>
      </div>
    );
  }

  // Import Recharts components only on the client side
  const {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip,
    Legend,
    ResponsiveContainer
  } = require('recharts');

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center">傳統模式 vs AI 賦能模式效益對比</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={benefitData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="metric" className="text-sm" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="傳統模式"
            dataKey="traditional"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
          />
          <Radar
            name="AI 賦能模式"
            dataKey="ai"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.3}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BenefitRadarChart;