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
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border shadow-sm bg-white dark:bg-gray-800">
        <thead className="bg-blue-50">
          <tr>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">AI平台</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">完成時間</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">遇到問題</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">代碼可用性</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">綜合評價</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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
  );
};

export default TestResultsTable;