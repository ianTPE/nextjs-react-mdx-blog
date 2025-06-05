"use client";

import React from 'react';

const GeminiDetailedTable: React.FC = () => {
  const geminiData = [
    { dimension: "技術深度", score: "10/10", comment: "技術分析極其深入，考慮到所有邊緣情況" },
    { dimension: "實用性", score: "6/10", comment: "過於複雜，實際使用難度大" },
    { dimension: "結構性", score: "8/10", comment: "結構清晰但信息密度過高" },
    { dimension: "完整性", score: "10/10", comment: "覆蓋了所有可能的技術細節" },
    { dimension: "安全性考量", score: "10/10", comment: "安全分析最為詳盡" },
    { dimension: "創新性", score: "3/10", comment: "技術方案相對保守" },
  ];

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-red-50 dark:bg-red-900">
            <th className="p-3 text-left text-sm font-semibold text-red-800 dark:text-red-200">維度</th>
            <th className="p-3 text-left text-sm font-semibold text-red-800 dark:text-red-200">評分</th>
            <th className="p-3 text-left text-sm font-semibold text-red-800 dark:text-red-200">評語</th>
          </tr>
        </thead>
        <tbody>
          {geminiData.map((row, index) => (
            <tr key={index} className="even:bg-gray-50 dark:even:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <td className="p-3 text-sm text-gray-800 dark:text-gray-200 font-medium">{row.dimension}</td>
              <td className="p-3 text-sm text-gray-600 dark:text-gray-300 font-medium">{row.score}</td>
              <td className="p-3 text-sm text-gray-600 dark:text-gray-300">{row.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeminiDetailedTable;