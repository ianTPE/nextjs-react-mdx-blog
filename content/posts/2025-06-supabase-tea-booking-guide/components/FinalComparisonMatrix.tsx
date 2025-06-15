"use client";

import React, { useState } from 'react';

const FinalComparisonMatrix = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'technical' | 'business' | 'cost'>('all');

  const comparisonMatrix = [
    {
      category: 'technical',
      aspect: '資料庫架構',
      weight: 9,
      bubble: { score: 6, note: '簡化資料模型，限制複雜查詢' },
      xano: { score: 8, note: '真正 PostgreSQL，支援複雜關係' },
      supabase: { score: 10, note: '原生 PostgreSQL + 即時功能' }
    },
    {
      category: 'technical',
      aspect: 'API 設計品質',
      weight: 8,
      bubble: { score: 7, note: '工作流程式 API，學習曲線低' },
      xano: { score: 9, note: '標準 RESTful，開發者友善' },
      supabase: { score: 10, note: '自動生成 REST + GraphQL' }
    },
    {
      category: 'technical',
      aspect: '即時功能支援',
      weight: 9,
      bubble: { score: 4, note: '需額外開發，複雜度高' },
      xano: { score: 5, note: '需第三方整合' },
      supabase: { score: 10, note: '原生 WebSocket，毫秒級同步' }
    },
    {
      category: 'technical',
      aspect: '可擴展性',
      weight: 8,
      bubble: { score: 5, note: '~100 並發用戶上限' },
      xano: { score: 7, note: '~10K 並發用戶' },
      supabase: { score: 9, note: '100K+ 並發用戶' }
    },
    {
      category: 'technical',
      aspect: '開發者體驗',
      weight: 7,
      bubble: { score: 9, note: '視覺化，零程式碼' },
      xano: { score: 8, note: '開發者友善的無程式碼' },
      supabase: { score: 9, note: 'SQL + TypeScript，現代開發' }
    },
    {
      category: 'business',
      aspect: '廠商鎖定風險',
      weight: 8,
      bubble: { score: 3, note: '高度平台依賴' },
      xano: { score: 5, note: '中度平台依賴' },
      supabase: { score: 10, note: '開源，可自部署' }
    },
    {
      category: 'business',
      aspect: '團隊接手容易度',
      weight: 7,
      bubble: { score: 6, note: '需學習平台特定知識' },
      xano: { score: 7, note: '標準化程度較高' },
      supabase: { score: 9, note: '標準 SQL + JS，無學習門檻' }
    },
    {
      category: 'business',
      aspect: '長期維護性',
      weight: 8,
      bubble: { score: 5, note: '平台更新可能影響現有系統' },
      xano: { score: 7, note: '相對穩定，但仍依賴平台' },
      supabase: { score: 9, note: '開源保障，社群維護' }
    },
    {
      category: 'cost',
      aspect: '初期開發成本',
      weight: 7,
      bubble: { score: 9, note: '最低學習成本' },
      xano: { score: 8, note: '中等學習成本' },
      supabase: { score: 8, note: 'SQL 基礎需求' }
    },
    {
      category: 'cost',
      aspect: '運營成本效益',
      weight: 8,
      bubble: { score: 6, note: '中等定價，功能限制多' },
      xano: { score: 7, note: '較高定價，功能完整' },
      supabase: { score: 9, note: '最佳性價比，免費額度大' }
    },
    {
      category: 'cost',
      aspect: '擴展成本',
      weight: 8,
      bubble: { score: 4, note: '擴展成本高，效能瓶頸' },
      xano: { score: 6, note: '線性擴展成本' },
      supabase: { score: 9, note: '彈性計費，可自部署' }
    }
  ];

  const categories = [
    { key: 'all', label: '全部', icon: '📊' },
    { key: 'technical', label: '技術架構', icon: '⚙️' },
    { key: 'business', label: '商業考量', icon: '💼' },
    { key: 'cost', label: '成本效益', icon: '💰' }
  ];

  const filteredMatrix = selectedFilter === 'all' 
    ? comparisonMatrix 
    : comparisonMatrix.filter(item => item.category === selectedFilter);

  // 計算加權總分
  const calculateWeightedScore = (platform: 'bubble' | 'xano' | 'supabase') => {
    const totalWeight = comparisonMatrix.reduce((sum, item) => sum + item.weight, 0);
    const weightedSum = comparisonMatrix.reduce((sum, item) => {
      return sum + (item[platform].score * item.weight);
    }, 0);
    return Math.round((weightedSum / totalWeight) * 10) / 10;
  };

  const scores = {
    bubble: calculateWeightedScore('bubble'),
    xano: calculateWeightedScore('xano'),
    supabase: calculateWeightedScore('supabase')
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getBarWidth = (score: number) => `${(score / 10) * 100}%`;

  const getBarColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="my-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          最終決策矩陣分析
        </h3>
        <p className="text-gray-600">
          基於加權評分的客觀比較分析
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedFilter(category.key as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedFilter === category.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overall Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { name: 'Bubble.io', key: 'bubble' as const, icon: '🫧', color: 'blue' },
          { name: 'Xano', key: 'xano' as const, icon: '⚡', color: 'purple' },
          { name: 'Supabase', key: 'supabase' as const, icon: '🚀', color: 'green' }
        ].map((platform) => (
          <div key={platform.key} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{platform.icon}</span>
                <span className="font-semibold text-gray-900">{platform.name}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-sm font-bold ${getScoreColor(scores[platform.key])}`}>
                {scores[platform.key]}/10
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getBarColor(scores[platform.key])}`}
                style={{ width: getBarWidth(scores[platform.key]) }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/5">
                  評估項目
                  <div className="text-xs font-normal text-gray-500 mt-1">權重</div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600 w-1/4">
                  🫧 Bubble.io
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600 w-1/4">
                  ⚡ Xano
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-green-600 w-1/4">
                  🚀 Supabase
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMatrix.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.aspect}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500 mr-2">重要度:</span>
                      <div className="flex space-x-1">
                        {Array.from({ length: 10 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < item.weight ? 'bg-orange-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">({item.weight}/10)</span>
                    </div>
                  </td>
                  
                  {(['bubble', 'xano', 'supabase'] as const).map((platform) => (
                    <td key={platform} className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-bold mb-2 ${getScoreColor(item[platform].score)}`}>
                        {item[platform].score}/10
                      </div>
                      <div className="text-xs text-gray-600 text-left">
                        {item[platform].note}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Recommendation */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">🏆</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-green-900 mb-2">
              最終建議：Supabase 以 {scores.supabase}/10 分獲勝
            </h4>
            <div className="text-green-800 space-y-2 text-sm">
              <p><strong>決定性優勢：</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>技術領先</strong> - 原生即時功能 + PostgreSQL 完整支援</li>
                <li><strong>開源保障</strong> - 零廠商鎖定風險，可永久掌控數據</li>
                <li><strong>成本最優</strong> - 免費額度慷慨，付費方案性價比最高</li>
                <li><strong>擴展性強</strong> - 從 MVP 到企業級無縫擴展</li>
                <li><strong>生態完整</strong> - TypeScript + SQL，團隊無學習成本</li>
              </ul>
              
              <div className="bg-white rounded-lg p-4 mt-4 border border-green-200">
                <p className="text-green-900 font-semibold mb-2">🍵 對茶語時光項目的具體價值：</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <strong>即時訂單追蹤：</strong> 原生支援，用戶體驗最佳
                  </div>
                  <div>
                    <strong>複雜商業邏輯：</strong> PostgreSQL 函數完美支援
                  </div>
                  <div>
                    <strong>會員系統：</strong> Row Level Security 細粒度控制
                  </div>
                  <div>
                    <strong>未來擴展：</strong> 開源生態，永無技術債務
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Guide */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-900 mb-3">🤔 但是，如果你的情況是...</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="font-semibold text-blue-900 mb-1">選擇 Bubble.io</div>
            <div className="text-blue-800">
              • 零技術背景<br/>
              • 需要 3 週內 MVP<br/>
              • 預期用戶 &lt; 1000 人<br/>
              • 預算極有限
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <div className="font-semibold text-purple-900 mb-1">選擇 Xano</div>
            <div className="text-purple-800">
              • 偏好無程式碼但要專業 API<br/>
              • 團隊已熟悉 Xano<br/>
              • 不需要即時功能<br/>
              • 中等規模應用（5K-50K 用戶）
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="font-semibold text-green-900 mb-1">選擇 Supabase ⭐</div>
            <div className="text-green-800">
              • 團隊具備 SQL 基礎<br/>
              • 重視即時功能<br/>
              • 避免廠商鎖定<br/>
              • 長期發展考量<br/>
              • 50K+ 用戶規劃
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalComparisonMatrix;