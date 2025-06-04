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
    <div className="w-full overflow-x-auto my-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-purple-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
          <h4 className="text-lg font-semibold text-purple-800">🥇 Claude (Anthropic) - 詳細評分</h4>
          <p className="text-sm text-purple-600 mt-1">我最喜歡的回答 - 評分：56/60</p>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">維度</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評分</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評語</th>
            </tr>
          </thead>
          <tbody>
            {claudeData.map((row, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
                <td className="border border-gray-300 p-3 text-sm text-gray-800 font-medium">{row.dimension}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600 font-medium">{row.score}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaudeDetailedTable;