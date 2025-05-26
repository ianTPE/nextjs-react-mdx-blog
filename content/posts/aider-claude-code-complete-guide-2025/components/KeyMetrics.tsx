"use client";

import React from 'react';

const KeyMetrics = () => {
  const metrics = [
    {
      value: '70%',
      label: 'Aider 自動編寫程式碼比例',
      color: 'from-blue-500 to-purple-600'
    },
    {
      value: '51.6%',
      label: 'Claude Sonnet 複雜任務成功率',
      color: 'from-purple-500 to-pink-600'
    },
    {
      value: '3-5倍',
      label: '開發效率提升倍數',
      color: 'from-green-500 to-blue-600'
    },
    {
      value: '500%',
      label: '最高投資報酬率',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${metric.color} text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200`}
        >
          <div className="text-3xl font-bold mb-3 text-center">
            {metric.value}
          </div>
          <div className="text-sm opacity-90 text-center leading-relaxed">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyMetrics;