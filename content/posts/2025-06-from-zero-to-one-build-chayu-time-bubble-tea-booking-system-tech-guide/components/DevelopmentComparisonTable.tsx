"use client";

import React from 'react';

const DevelopmentComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      item: '開發時間',
      traditional: '6-8 週',
      bubble: '1-2 週',
      savings: '75%'
    },
    {
      item: '技術要求',
      traditional: '全端工程師',
      bubble: '前端工程師',
      savings: '50% 人力'
    },
    {
      item: '基礎建設',
      traditional: '自建伺服器/雲端',
      bubble: '內建託管',
      savings: '80% 維護成本'
    },
    {
      item: '擴展成本',
      traditional: '線性增長',
      bubble: '自動擴展',
      savings: '60% 擴展成本'
    }
  ];

  return (
    <div className="not-prose my-8">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">開發方式比較分析</h4>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">項目</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">傳統開發</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Bubble 開發</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">節省比例</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={row.item} className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                <td className="px-4 py-3 border-r border-gray-100">
                  <span className="font-medium text-gray-800">{row.item}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {row.traditional}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-r border-gray-100">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {row.bubble}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                      {row.savings}
                    </span>
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-green-800">
            Bubble.io 平均可為專案節省 66% 的開發成本與時間
          </span>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentComparisonTable;