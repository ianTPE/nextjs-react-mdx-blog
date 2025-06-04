"use client";

import React from 'react';

const OverallScoreTable: React.FC = () => {
  const scoreData = [
    { platform: "Claude", totalScore: "56/60", techDepth: 9, practicality: 10, structure: 10, completeness: 9, security: 9, innovation: 9, recommendation: "⭐⭐⭐⭐⭐" },
    { platform: "ChatGPT", totalScore: "49/60", techDepth: 9, practicality: 8, structure: 8, completeness: 8, security: 8, innovation: 8, recommendation: "⭐⭐⭐⭐" },
    { platform: "Gemini", totalScore: "47/60", techDepth: 10, practicality: 6, structure: 8, completeness: 10, security: 10, innovation: 3, recommendation: "⭐⭐⭐⭐" },
    { platform: "千問", totalScore: "38/60", techDepth: 6, practicality: 8, structure: 8, completeness: 6, security: 5, innovation: 5, recommendation: "⭐⭐⭐" },
    { platform: "DeepSeek", totalScore: "36/60", techDepth: 7, practicality: 7, structure: 6, completeness: 7, security: 5, innovation: 4, recommendation: "⭐⭐⭐" },
    { platform: "Grok", totalScore: "32/60", techDepth: 5, practicality: 7, structure: 6, completeness: 6, security: 4, innovation: 4, recommendation: "⭐⭐" },
    { platform: "豆包", totalScore: "33/60", techDepth: 6, practicality: 6, structure: 4, completeness: 7, security: 5, innovation: 5, recommendation: "⭐⭐" },
    { platform: "Perplexity", totalScore: "28/60", techDepth: 4, practicality: 5, structure: 7, completeness: 6, security: 3, innovation: 3, recommendation: "⭐⭐" },
  ];

  return (
    <div className="w-full overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">平台</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">總分</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">技術深度</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">實用性</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">結構性</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">完整性</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">安全性</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">創新性</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">推薦指數</th>
          </tr>
        </thead>
        <tbody>
          {scoreData.map((row, index) => (
            <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
              <td className="border border-gray-300 p-3 text-sm text-gray-800 font-medium">
                {row.platform === "Claude" || row.platform === "ChatGPT" || row.platform === "Gemini" ? 
                  <strong>{row.platform}</strong> : row.platform}
              </td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.totalScore}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.techDepth}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.practicality}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.structure}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.completeness}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.security}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.innovation}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverallScoreTable;