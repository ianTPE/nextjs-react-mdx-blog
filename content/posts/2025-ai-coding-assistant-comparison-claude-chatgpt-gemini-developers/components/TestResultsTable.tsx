"use client";

import React from 'react';

const TestResultsTable: React.FC = () => {
  const testResultsData = [
    { 
      platform: "Claude", 
      completionTime: "2小時", 
      issues: "無重大問題", 
      codeUsability: "✅ 100%可用", 
      overallRating: "優秀" 
    },
    { 
      platform: "ChatGPT", 
      completionTime: "3小時", 
      issues: "需要調試依賴配置", 
      codeUsability: "⚠️ 90%可用", 
      overallRating: "良好" 
    },
    { 
      platform: "Gemini", 
      completionTime: "4小時", 
      issues: "配置過於複雜", 
      codeUsability: "⚠️ 85%可用", 
      overallRating: "良好" 
    },
    { 
      platform: "DeepSeek", 
      completionTime: "2.5小時", 
      issues: "需要小幅調整", 
      codeUsability: "⚠️ 80%可用", 
      overallRating: "良好" 
    },
  ];

  return (
    <div className="w-full overflow-x-auto my-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-blue-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
          <h4 className="text-lg font-semibold text-blue-800">📊 MDX系統搭建測試結果</h4>
          <p className="text-sm text-blue-600 mt-1">使用各 AI 提供的方案，從零開始搭建完整的 MDX 系統</p>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">AI平台</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">完成時間</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">遇到問題</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">代碼可用性</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">綜合評價</th>
            </tr>
          </thead>
          <tbody>
            {testResultsData.map((row, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
                <td className="border border-gray-300 p-3 text-sm text-gray-800 font-medium">
                  {row.platform === "Claude" || row.platform === "DeepSeek" ? <strong>{row.platform}</strong> : row.platform}
                </td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.completionTime}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.issues}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.codeUsability}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600 font-medium">{row.overallRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResultsTable;