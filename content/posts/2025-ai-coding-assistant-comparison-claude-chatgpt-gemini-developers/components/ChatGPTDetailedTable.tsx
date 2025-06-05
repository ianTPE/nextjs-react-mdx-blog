"use client";

import React from 'react';

const ChatGPTDetailedTable: React.FC = () => {
  const chatGPTData = [
    { dimension: "技術深度", score: "9/10", comment: "深入解釋技術原理和選擇理由" },
    { dimension: "實用性", score: "8/10", comment: "代碼示例好但略顯複雜" },
    { dimension: "結構性", score: "8/10", comment: "邏輯清晰但稍顯冗長" },
    { dimension: "完整性", score: "8/10", comment: "覆蓋全面但重點不夠突出" },
    { dimension: "安全性考量", score: "8/10", comment: "安全考慮詳細" },
    { dimension: "創新性", score: "8/10", comment: "提供多種技術方案對比" },
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
          {chatGPTData.map((row, index) => (
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

export default ChatGPTDetailedTable;