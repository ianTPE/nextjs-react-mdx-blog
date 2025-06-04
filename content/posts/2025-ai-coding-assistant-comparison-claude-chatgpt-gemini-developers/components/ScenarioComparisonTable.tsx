"use client";

import React from 'react';

const ScenarioComparisonTable: React.FC = () => {
  const scenarioData = [
    { 
      scenario: "🔥 緊急修Bug", 
      primary: "Claude（普通）", 
      alternative: "ChatGPT", 
      notRecommended: "Gemini", 
      modeAdvice: "普通模式" 
    },
    { 
      scenario: "📖 學習新技術", 
      primary: "ChatGPT（Thinking）", 
      alternative: "Claude", 
      notRecommended: "豆包", 
      modeAdvice: "Thinking模式" 
    },
    { 
      scenario: "🏗️ 架構設計", 
      primary: "Gemini（Thinking）", 
      alternative: "Claude", 
      notRecommended: "Grok", 
      modeAdvice: "Thinking模式" 
    },
    { 
      scenario: "⚡ 快速原型", 
      primary: "Claude（普通）", 
      alternative: "千問", 
      notRecommended: "Perplexity", 
      modeAdvice: "普通模式" 
    },
    { 
      scenario: "🔍 技術選型", 
      primary: "ChatGPT（Thinking）", 
      alternative: "Gemini", 
      notRecommended: "DeepSeek", 
      modeAdvice: "Thinking模式" 
    },
    { 
      scenario: "📋 流程梳理", 
      primary: "千問", 
      alternative: "Claude", 
      notRecommended: "豆包", 
      modeAdvice: "普通模式" 
    },
    { 
      scenario: "🛡️ 安全評估", 
      primary: "Gemini（Thinking）", 
      alternative: "Claude", 
      notRecommended: "Grok", 
      modeAdvice: "Thinking模式" 
    },
    { 
      scenario: "👥 團隊培訓", 
      primary: "ChatGPT", 
      alternative: "Claude", 
      notRecommended: "Perplexity", 
      modeAdvice: "普通模式" 
    },
  ];

  return (
    <div className="w-full overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">使用場景</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">首選 AI</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">替代選擇</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">不推薦</th>
            <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">模式建議</th>
          </tr>
        </thead>
        <tbody>
          {scenarioData.map((row, index) => (
            <tr key={index} className="even:bg-gray-50 hover:bg-gray-200">
              <td className="border border-gray-300 p-3 text-sm text-gray-800 font-medium">{row.scenario}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.primary}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.alternative}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.notRecommended}</td>
              <td className="border border-gray-300 p-3 text-sm text-gray-600">{row.modeAdvice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScenarioComparisonTable;