"use client";

import React from 'react';

const ClaudeDetailedTable: React.FC = () => {
  const claudeData = [
    { dimension: "技術深度", score: "9/10", comment: "深入理解 MDX 編譯和 SSR 機制" },
    { dimension: "實用性", score: "10/10", comment: "代碼可直接運行，結構完整" },
    { dimension: "結構性", score: "10/10", comment: "層次清晰，邏輯連貫" },
    { dimension: "完整性", score: "9/10", comment: "涵蓋所有關鍵環節" },
    { dimension: "安全性考量", score: "9/10", comment: "詳細的安全建議" },
    { dimension: "創新性", score: "9/10", comment: "提供管理界面等創新建議" },
  ];

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-purple-50 dark:bg-purple-900">
            <th className="p-3 text-left text-sm font-semibold text-purple-800 dark:text-purple-200">維度</th>
            <th className="p-3 text-left text-sm font-semibold text-purple-800 dark:text-purple-200">評分</th>
            <th className="p-3 text-left text-sm font-semibold text-purple-800 dark:text-purple-200">評語</th>
          </tr>
        </thead>
        <tbody>
          {claudeData.map((row, index) => (
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

export default ClaudeDetailedTable;