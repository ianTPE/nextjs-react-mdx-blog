import React from 'react';
import type { FC } from 'react';
import MarketGrowthComparisonChart from './MarketGrowthComparisonChart';
import EmploymentGrowthForecastChart from './EmploymentGrowthForecastChart';
import IncomePotentialComparisonChart from './IncomePotentialComparisonChart';
import LowCodeMarketTrendChart from './LowCodeMarketTrendChart';
import TechDirectionScoreChart from './TechDirectionScoreChart';
import JobSatisfactionChart from './JobSatisfactionChart';
import MarketDriversChart from './MarketDriversChart';

const ChartsShowcase: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題區域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Freelancer 市場分析圖表
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            重構版本 — 現代化設計與視覺效果
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">Chart.js</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">現代設計</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">響應式</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">互動效果</span>
          </div>
        </div>

        {/* 圖表網格 */}
        <div className="space-y-12">
          {/* 第一行 - 市場概況 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. 市場增長對比
              </h2>
              <MarketGrowthComparisonChart />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. 工作滿意度分析
              </h2>
              <JobSatisfactionChart />
            </div>
          </div>

          {/* 第二行 - 趨勢預測 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. 低代碼市場趨勢
            </h2>
            <LowCodeMarketTrendChart />
          </div>

          {/* 第三行 - 技術分析 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. 就業增長預測
            </h2>
            <EmploymentGrowthForecastChart />
          </div>

          {/* 第四行 - 收入分析 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. 收入潛力對比
            </h2>
            <IncomePotentialComparisonChart />
          </div>

          {/* 第五行 - 技術評分 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. 技術方向評分
            </h2>
            <TechDirectionScoreChart />
          </div>

          {/* 第六行 - 市場驅動 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. 市場驅動因素
            </h2>
            <MarketDriversChart />
          </div>
        </div>

        {/* 總結區域 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🎨 重構亮點
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">現代化設計</h4>
              <p className="text-sm text-gray-600">漸變色彩、圓角邊框、陰影效果</p>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">增強數據展示</h4>
              <p className="text-sm text-gray-600">詳細說明、統計卡片、趨勢分析</p>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">動畫效果</h4>
              <p className="text-sm text-gray-600">流暢過渡、延遲載入、懸停效果</p>
            </div>

            <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">📱</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">響應式優化</h4>
              <p className="text-sm text-gray-600">適配各種螢幕、觸控友好</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <h4 className="font-bold text-emerald-700 mb-3 text-center">🚀 技術特色</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="text-gray-700">Chart.js v4</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-700">React Hooks</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span className="text-gray-700">Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span className="text-gray-700">CSS Gradients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsShowcase;
