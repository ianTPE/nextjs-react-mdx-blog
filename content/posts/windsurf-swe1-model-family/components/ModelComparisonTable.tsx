'use client';

import React from 'react';

const ModelComparisonTable = () => {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">特性</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Windsurf SWE-1</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Claude 3.7 Sonnet</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">OpenAI GPT-4.1</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">定位</td>
            <td className="py-3 px-4 border-b border-gray-300">專業軟體工程助手，專注於完整開發流程</td>
            <td className="py-3 px-4 border-b border-gray-300">通用 AI 助手，具備優秀的編程能力</td>
            <td className="py-3 px-4 border-b border-gray-300">通用 AI 助手，強大的多模態能力</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">核心優勢</td>
            <td className="py-3 px-4 border-b border-gray-300">流感知、專案感知、持續學習</td>
            <td className="py-3 px-4 border-b border-gray-300">強大的常識推理、長文本理解</td>
            <td className="py-3 px-4 border-b border-gray-300">廣泛的知識庫、多模態能力</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">開發整合</td>
            <td className="py-3 px-4 border-b border-gray-300">深度 IDE 整合、專案感知</td>
            <td className="py-3 px-4 border-b border-gray-300">基礎 IDE 整合</td>
            <td className="py-3 px-4 border-b border-gray-300">API 驅動，需要額外整合</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">響應時間</td>
            <td className="py-3 px-4 border-b border-gray-300">優化後平均 1.2 秒</td>
            <td className="py-3 px-4 border-b border-gray-300">平均 2.5 秒</td>
            <td className="py-3 px-4 border-b border-gray-300">平均 3.1 秒</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">程式語言支援</td>
            <td className="py-3 px-4 border-b border-gray-300">93+ 種語言，深度優化</td>
            <td className="py-3 px-4 border-b border-gray-300">主要語言支援良好</td>
            <td className="py-3 px-4 border-b border-gray-300">廣泛支援多種語言</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">上下文長度</td>
            <td className="py-3 px-4 border-b border-gray-300">工程特化上下文（約 128K tokens）</td>
            <td className="py-3 px-4 border-b border-gray-300">200K tokens</td>
            <td className="py-3 px-4 border-b border-gray-300">128K tokens</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">學習能力</td>
            <td className="py-3 px-4 border-b border-gray-300">持續學習開發者風格</td>
            <td className="py-3 px-4 border-b border-gray-300">會話內學習</td>
            <td className="py-3 px-4 border-b border-gray-300">有限的自適應能力</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">隱私保護</td>
            <td className="py-3 px-4 border-b border-gray-300">企業級數據隔離</td>
            <td className="py-3 px-4 border-b border-gray-300">標準數據保護</td>
            <td className="py-3 px-4 border-b border-gray-300">標準數據保護</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">定價</td>
            <td className="py-3 px-4 border-b border-gray-300">基於使用量（企業方案）</td>
            <td className="py-3 px-4 border-b border-gray-300">訂閱制</td>
            <td className="py-3 px-4 border-b border-gray-300">基於 token 計費</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">最佳使用場景</td>
            <td className="py-3 px-4 border-b border-gray-300">企業級軟體開發、大型專案</td>
            <td className="py-3 px-4 border-b border-gray-300">通用編程任務、文檔編寫</td>
            <td className="py-3 px-4 border-b border-gray-300">多模態任務、創意寫作</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ModelComparisonTable;
