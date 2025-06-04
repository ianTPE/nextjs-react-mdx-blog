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
    <div className="w-full overflow-x-auto my-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-cyan-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
          <h4 className="text-lg font-semibold text-cyan-800">🥈 ChatGPT (OpenAI) - 詳細評分</h4>
          <p className="text-sm text-cyan-600 mt-1">第二喜歡的回答 - 評分：49/60</p>
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
    </div>
  );
};

export default ChatGPTDetailedTable;