"use client";
// 組件導入測試文件
import React from 'react';

// 從 index.ts 導入所有組件
import {
  MarketGrowthComparisonChart,
  EmploymentGrowthForecastChart,
  IncomePotentialComparisonChart,
  LowCodeMarketTrendChart,
  TechDirectionScoreChart,
  JobSatisfactionChart,
  MarketDriversChart,
  PlatformComparisonTable,
  TechDirectionIncomeTable,
} from './index';

const ComponentsTest = () => {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🧪 組件導入測試
      </h1>
      
      {/* 測試所有圖表組件 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">1. 市場增長對比圖</h3>
          <div className="h-64">
            <MarketGrowthComparisonChart />
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">2. 工作滿意度圖</h3>
          <div className="h-64">
            <JobSatisfactionChart />
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">3. 就業增長預測圖</h3>
          <div className="h-64">
            <EmploymentGrowthForecastChart />
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">4. 收入潛力對比圖</h3>
          <div className="h-64">
            <IncomePotentialComparisonChart />
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">5. 低代碼市場趨勢圖</h3>
          <div className="h-64">
            <LowCodeMarketTrendChart />
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">6. 技術方向評分圖</h3>
          <div className="h-64">
            <TechDirectionScoreChart />
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg col-span-full">
          <h3 className="text-lg font-semibold mb-4">7. 市場驅動因素圖</h3>
          <div className="h-64">
            <MarketDriversChart />
          </div>
        </div>
      </div>
      
      {/* 測試表格組件 */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">8. 平台對比表格</h3>
          <PlatformComparisonTable />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">9. 技術方向收入表格</h3>
          <TechDirectionIncomeTable />
        </div>
      </div>
      
      {/* 測試展示組件 */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">✅ 所有組件測試完成</h3>
          <p className="text-gray-600">
            如果你能看到以上所有圖表和表格，說明組件導入正常！
          </p>
          
          <div className="mt-4 flex justify-center space-x-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ✓ 7個圖表組件
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              ✓ 2個表格組件
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              ✓ 2個展示組件
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsTest;