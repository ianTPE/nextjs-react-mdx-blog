'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const PricingAndSkills = () => {
  const pricingData = [
    {
      category: 'MVP與快速原型開發',
      min: 3000,
      max: 15000,
      avg: 7500,
      color: '#4C9AFF',
      skills: ['界面設計', 'API整合', '原型設計', '用戶體驗', '市場驗證']
    },
    {
      category: '企業應用與流程自動化',
      min: 5000,
      max: 50000,
      avg: 20000,
      color: '#36B37E',
      skills: ['業務流程分析', 'API整合', '自動化規則設計', '數據處理', '系統整合']
    },
    {
      category: '內部工具與管理後台',
      min: 4000,
      max: 20000,
      avg: 10000,
      color: '#00B8D9',
      skills: ['數據模型設計', '工作流程設計', '權限管理', '表單設計', '數據可視化']
    },
    {
      category: '行動應用與跨平台部署',
      min: 5000,
      max: 25000,
      avg: 12000,
      color: '#6554C0',
      skills: ['響應式設計', '原生功能整合', '離線存儲', '推送通知', '跨平台兼容']
    },
    {
      category: '電商與客戶關係管理(CRM)',
      min: 6000,
      max: 30000,
      avg: 15000,
      color: '#FFAB00',
      skills: ['支付整合', '庫存管理', '客戶分析', '自動營銷流程', 'SEO優化']
    },
    {
      category: '數據分析與儀表板',
      min: 3000,
      max: 18000,
      avg: 8000,
      color: '#FF5630',
      skills: ['數據處理', '數據可視化', '報表設計', '數據分析', 'BI工具整合']
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-bold">{data.category}</p>
          <p>價格範圍: ${data.min.toLocaleString()} - ${data.max.toLocaleString()}</p>
          <p>平均價格: ${data.avg.toLocaleString()}</p>
          <div className="mt-2">
            <p className="font-semibold">核心技能要求:</p>
            <ul className="list-disc ml-4 mt-1">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-sm">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-6">低代碼/無代碼應用領域專案價格範圍</h2>
      <div className="mb-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={pricingData}
            margin={{ top: 20, right: 30, left: 20, bottom: 90 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              angle={-45} 
              textAnchor="end" 
              height={80} 
              tickMargin={25}
            />
            <YAxis 
              label={{ value: '價格 (USD)', angle: -90, position: 'insideLeft', offset: 10 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <Bar 
              dataKey="min" 
              name="最低價格" 
              fill="#8884d8" 
              opacity={0.7}
            />
            <Bar 
              dataKey="max" 
              name="最高價格" 
              fill="#82ca9d" 
              opacity={0.7}
            />
            <ReferenceLine 
              y={15000} 
              stroke="red" 
              strokeDasharray="3 3" 
              label={{ value: "高價值專案門檻", position: 'insideBottomRight', fill: 'red' }} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-bold text-center mb-4">各領域所需技能與平台比較</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">應用領域</th>
                <th className="p-2 border border-gray-300">核心技能</th>
                <th className="p-2 border border-gray-300">推薦平台</th>
                <th className="p-2 border border-gray-300">入門難度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">MVP與快速原型開發</td>
                <td className="p-2 border border-gray-300">用戶界面設計、API整合、原型迭代</td>
                <td className="p-2 border border-gray-300">Bubble, Webflow, Softr</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border border-gray-300 font-medium">企業應用與流程自動化</td>
                <td className="p-2 border border-gray-300">業務流程分析、自動化規則設計、系統整合</td>
                <td className="p-2 border border-gray-300">Zapier, Make, OutSystems, Power Automate</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">內部工具與管理後台</td>
                <td className="p-2 border border-gray-300">數據模型設計、工作流程設計、權限管理</td>
                <td className="p-2 border border-gray-300">Retool, Budibase, NocoBase</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border border-gray-300 font-medium">行動應用與跨平台部署</td>
                <td className="p-2 border border-gray-300">響應式設計、原生功能整合、離線存儲</td>
                <td className="p-2 border border-gray-300">FlutterFlow, Adalo, Thunkable</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">電商與客戶關係管理(CRM)</td>
                <td className="p-2 border border-gray-300">支付整合、庫存管理、客戶分析、自動營銷</td>
                <td className="p-2 border border-gray-300">Webflow+Foxy, Softr+Airtable, Jotform Store</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border border-gray-300 font-medium">數據分析與儀表板</td>
                <td className="p-2 border border-gray-300">數據處理、可視化設計、報表設計</td>
                <td className="p-2 border border-gray-300">Airtable, Appsmith, Retool</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          入門難度：⭐ = 最簡單，⭐⭐⭐⭐⭐ = 最複雜
        </div>
      </div>
    </div>
  );
};

export default PricingAndSkills;
