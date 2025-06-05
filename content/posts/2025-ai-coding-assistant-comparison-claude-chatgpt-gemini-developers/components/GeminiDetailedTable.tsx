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
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border shadow-sm bg-white dark:bg-gray-800">
        <thead className="bg-purple-500 dark:bg-purple-700 text-white">
          <tr>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">維度</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評分</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評語</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {geminiData.map((row, index) => (
            <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
              <td className="border border-gray-300 p-3 text-sm text-gray-800 font-medium">{row.dimension}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600 font-medium">{row.score}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeminiDetailedTable;