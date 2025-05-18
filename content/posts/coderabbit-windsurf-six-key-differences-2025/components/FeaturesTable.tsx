"use client";

import React from 'react';

const FeaturesTable = () => {
  const features = [
    { feature: '即時程式碼審查', codeRabbit: '✅ 支援', windsurf: '✅ 支援' },
    { feature: '多檔案編輯', codeRabbit: '⚠️ 有限', windsurf: '✅ 完全支援' },
    { feature: '終端機整合與命令建議', codeRabbit: '❌ 不支援', windsurf: '✅ 支援' },
    { feature: '深度上下文感知', codeRabbit: '⚠️ 有限', windsurf: '✅ 完全支援' },
    { feature: '使用者體驗', codeRabbit: '🟢 熟悉的 VS Code 環境', windsurf: '🟢 專為 AI 開發設計' },
    { feature: '安裝和使用', codeRabbit: '🟢 安裝簡單，易於學習', windsurf: '🟢 獨立安裝，需要適應' },
    { feature: '程式碼生成', codeRabbit: '❌ 非主要焦點', windsurf: '✅ 強調' },
    { feature: '智能程式碼補全', codeRabbit: '❌ 基本', windsurf: '✅ 高級，上下文感知' }
  ];

  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left border-b border-gray-200 font-medium text-gray-700">功能</th>
            <th className="py-3 px-4 text-left border-b border-gray-200 font-medium text-gray-700">CodeRabbit（VS Code 擴充套件）</th>
            <th className="py-3 px-4 text-left border-b border-gray-200 font-medium text-gray-700">Windsurf（獨立 IDE）</th>
          </tr>
        </thead>
        <tbody>
          {features.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-3 px-4 border-b border-gray-200">{item.feature}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.codeRabbit}</td>
              <td className="py-3 px-4 border-b border-gray-200">{item.windsurf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturesTable;