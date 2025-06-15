"use client";

import React from 'react';

const ThreeWayComparisonTable = () => {
  const comparisonData = [
    {
      aspect: '資料庫類型',
      bubble: '簡化視覺資料庫',
      xano: '真正的 PostgreSQL',
      supabase: '原生 PostgreSQL + 即時訂閱',
      winner: 'supabase'
    },
    {
      aspect: 'API 設計',
      bubble: '工作流程導向',
      xano: '標準 RESTful',
      supabase: '自動生成 REST + GraphQL',
      winner: 'supabase'
    },
    {
      aspect: '即時功能',
      bubble: '需額外開發',
      xano: '需額外整合',
      supabase: '原生 WebSocket 支援',
      winner: 'supabase'
    },
    {
      aspect: '學習曲線',
      bubble: '最低（視覺化）',
      xano: '中等（開發者友善）',
      supabase: '中等（SQL 基礎）',
      winner: 'bubble'
    },
    {
      aspect: '擴展性',
      bubble: '有限（~100 用戶）',
      xano: '良好（~10K 用戶）',
      supabase: '優秀（100K+ 用戶）',
      winner: 'supabase'
    },
    {
      aspect: '廠商鎖定風險',
      bubble: '高度鎖定',
      xano: '中度鎖定',
      supabase: '零鎖定（開源）',
      winner: 'supabase'
    },
    {
      aspect: '開發速度',
      bubble: '最快（3週）',
      xano: '快速（2週）',
      supabase: '很快（1.5週）',
      winner: 'supabase'
    },
    {
      aspect: '成本效益',
      bubble: '中等',
      xano: '較高',
      supabase: '最佳',
      winner: 'supabase'
    },
    {
      aspect: '社群支援',
      bubble: '商業支援',
      xano: '有限社群',
      supabase: '活躍開源社群',
      winner: 'supabase'
    },
    {
      aspect: '自部署能力',
      bubble: '不支援',
      xano: '企業版支援',
      supabase: '完全支援',
      winner: 'supabase'
    }
  ];

  const getWinnerStyle = (platform: string, winner: string) => {
    if (platform === winner) {
      return 'bg-green-50 text-green-800 font-semibold border-l-4 border-green-500';
    }
    return 'bg-white text-gray-700';
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      bubble: '🫧',
      xano: '⚡',
      supabase: '🚀'
    };
    return icons[platform as keyof typeof icons] || '•';
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      bubble: 'text-blue-600',
      xano: 'text-purple-600', 
      supabase: 'text-green-600'
    };
    return colors[platform as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          三平台全方位比較分析
        </h3>
        <p className="text-gray-600 text-sm">
          從技術架構到商業價值的完整對比評估
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/4">
                比較項目
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
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {row.aspect}
                </td>
                <td className={`px-6 py-4 text-sm text-center ${getWinnerStyle('bubble', row.winner)}`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span>{getPlatformIcon('bubble')}</span>
                    <span>{row.bubble}</span>
                  </div>
                </td>
                <td className={`px-6 py-4 text-sm text-center ${getWinnerStyle('xano', row.winner)}`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span>{getPlatformIcon('xano')}</span>
                    <span>{row.xano}</span>
                  </div>
                </td>
                <td className={`px-6 py-4 text-sm text-center ${getWinnerStyle('supabase', row.winner)}`}>
                  <div className="flex items-center justify-center space-x-2">
                    <span>{getPlatformIcon('supabase')}</span>
                    <span>{row.supabase}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Score Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <strong>勝出項目統計：</strong>
          </div>
          <div className="flex space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">🫧 Bubble.io:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                1 項
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-600">⚡ Xano:</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
                0 項
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">🚀 Supabase:</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                9 項 🏆
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-700">
          <strong className="text-green-700">結論：</strong> 
          Supabase 在 90% 的關鍵指標上領先，是企業級茶飲預約系統的最佳選擇。
        </div>
      </div>
    </div>
  );
};

export default ThreeWayComparisonTable;