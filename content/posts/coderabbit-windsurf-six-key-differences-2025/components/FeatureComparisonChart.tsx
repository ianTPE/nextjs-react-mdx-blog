"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FeatureComparisonChart = () => {
  const data = [
    {
      name: '程式語言理解能力',
      CodeRabbit: 5,
      Windsurf: 5,
    },
    {
      name: '程式碼生成',
      CodeRabbit: 0,
      Windsurf: 5,
    },
    {
      name: '智能補全',
      CodeRabbit: 0,
      Windsurf: 5,
    },
    {
      name: '即時反饋',
      CodeRabbit: 5,
      Windsurf: 0,
    },
    {
      name: '學習能力',
      CodeRabbit: 5,
      Windsurf: 3,
    },
    {
      name: '安全性',
      CodeRabbit: 5,
      Windsurf: 5,
    },
  ];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="CodeRabbit" fill="#36a2eb" />
          <Bar dataKey="Windsurf" fill="#ff6384" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureComparisonChart;