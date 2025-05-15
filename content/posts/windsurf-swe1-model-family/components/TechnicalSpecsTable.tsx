'use client';

import React from 'react';

const TechnicalSpecsTable = () => {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">規格</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Windsurf SWE-1</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Claude 3.7 Sonnet</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">GPT-4.1</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">核心定位</td>
            <td className="py-3 px-4 border-b border-gray-300">軟體工程專用垂直模型</td>
            <td className="py-3 px-4 border-b border-gray-300">混合推理通用模型</td>
            <td className="py-3 px-4 border-b border-gray-300">長上下文通用模型</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">上下文窗口</td>
            <td className="py-3 px-4 border-b border-gray-300">未公開（IDE 實時上下文）</td>
            <td className="py-3 px-4 border-b border-gray-300">200K tokens</td>
            <td className="py-3 px-4 border-b border-gray-300">1,000,000 tokens</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">推理模式</td>
            <td className="py-3 px-4 border-b border-gray-300">流感知多階段優化</td>
            <td className="py-3 px-4 border-b border-gray-300">混合推理（標準/延展）</td>
            <td className="py-3 px-4 border-b border-gray-300">單階段高效推理</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">工具調用</td>
            <td className="py-3 px-4 border-b border-gray-300">靜態分析、測試運行、API 調用</td>
            <td className="py-3 px-4 border-b border-gray-300">依賴 Prompt Scaffold 引導</td>
            <td className="py-3 px-4 border-b border-gray-300">插件系統 API 調用</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">主要優勢</td>
            <td className="py-3 px-4 border-b border-gray-300">開發流程深度集成</td>
            <td className="py-3 px-4 border-b border-gray-300">複雜問題混合推理</td>
            <td className="py-3 px-4 border-b border-gray-300">超長上下文處理</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TechnicalSpecsTable;
