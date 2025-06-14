"use client";

import React from 'react';

interface FeatureItem {
  key: string;
  value: string;
  gradientClass: string;
}

const BubbleFeatures: React.FC = () => {
  const features: FeatureItem[] = [
    {
      key: "Database",
      value: "內建 PostgreSQL 資料庫",
      gradientClass: "from-indigo-500 via-purple-500 to-pink-500"
    },
    {
      key: "API", 
      value: "RESTful API 自動生成",
      gradientClass: "from-pink-500 via-red-500 to-yellow-500"
    },
    {
      key: "Workflow",
      value: "視覺化業務邏輯設計", 
      gradientClass: "from-blue-500 via-cyan-500 to-teal-500"
    },
    {
      key: "Integration",
      value: "支援第三方 API 整合",
      gradientClass: "from-green-500 via-emerald-500 to-cyan-500"
    },
    {
      key: "Scaling", 
      value: "自動擴展與負載平衡",
      gradientClass: "from-purple-500 via-pink-500 to-red-500"
    }
  ];

  return (
    <div className="not-prose max-w-4xl mx-auto my-8 px-4">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 relative">
        Bubble.io 核心技術特性
        <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.key}
            className={`relative bg-gradient-to-br ${feature.gradientClass} rounded-xl p-6 text-white overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border border-white border-opacity-20 group`}
          >
            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center text-sm font-semibold uppercase tracking-wider text-white text-opacity-90 mb-3">
                <span className="mr-2 text-xs">▶</span>
                {feature.key}
              </div>
              
              <div className="text-lg font-medium leading-relaxed">
                {feature.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleFeatures;