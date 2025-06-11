"use client";
import React from 'react';
import PlatformComparisonTable from './PlatformComparisonTable';
import TechDirectionIncomeTable from './TechDirectionIncomeTable';

const TablesDemo: React.FC = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Freelancer 市場分析表格
        </h1>
        <p className="text-gray-600 mb-8">
          使用 TanStack Table 創建的互動式表格，展示平台對比和收入分析
        </p>
        
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. 平台生態系統對比
            </h2>
            <PlatformComparisonTable />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. 技術方向收入範圍分析
            </h2>
            <TechDirectionIncomeTable />
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            📊 表格特色
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              響應式設計，適配各種螢幕尺寸
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              視覺化數據展示（進度條、狀態標籤、評級系統）
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              懸停效果和平滑過渡動畫
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              專業的配色方案和現代化設計
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              基於 TanStack Table v8 構建，性能優異
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TablesDemo;
