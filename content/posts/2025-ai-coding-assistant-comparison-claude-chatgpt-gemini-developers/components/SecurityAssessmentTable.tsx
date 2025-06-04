"use client";

import React from 'react';

const SecurityAssessmentTable: React.FC = () => {
  const securityData = [
    { 
      platform: "Gemini", 
      riskPoints: "8個", 
      solutionQuality: "極其詳細", 
      practicality: "中等", 
      rating: "最全面" 
    },
    { 
      platform: "Claude", 
      riskPoints: "5個", 
      solutionQuality: "實用性強", 
      practicality: "高", 
      rating: "最實用" 
    },
    { 
      platform: "ChatGPT", 
      riskPoints: "4個", 
      solutionQuality: "解釋清晰", 
      practicality: "高", 
      rating: "最易懂" 
    },
    { 
      platform: "其他", 
      riskPoints: "1-2個", 
      solutionQuality: "基礎提醒", 
      practicality: "低", 
      rating: "不足" 
    },
  ];

  return (
    <div className="w-full overflow-x-auto my-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-red-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
          <h4 className="text-lg font-semibold text-red-800">🛡️ 安全性評估測試結果</h4>
          <p className="text-sm text-red-600 mt-1">要求各 AI 分析 MDX 系統的安全風險並提供防護方案</p>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">AI平台</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">發現風險點</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">防護方案質量</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">實用性</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">評價</th>
            </tr>
          </thead>
          <tbody>
            {securityData.map((row, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
                <td className="border border-gray-300 p-3 text-sm text-gray-800 font-medium">
                  {(row.platform === "Gemini" || row.platform === "Claude" || row.platform === "ChatGPT") ? 
                    <strong>{row.platform}</strong> : row.platform}
                </td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.riskPoints}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.solutionQuality}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.practicality}</td>
                <td className="border border-gray-300 p-3 text-sm text-gray-600 font-medium">{row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecurityAssessmentTable;