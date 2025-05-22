"use client";

import React from 'react';

const ModelComparisonTable = () => {
  const data = [
    {
      aspect: '主要定位',
      swe1: '軟體工程專業模型',
      claude: '混合推理通用模型',
      gpt: '超大上下文多模態模型'
    },
    {
      aspect: '核心優勢',
      swe1: '流感知技術 + IDE 深度集成',
      claude: '透明推理過程 + 擴展思考',
      gpt: '百萬級上下文 + 成本優化'
    },
    {
      aspect: '最適用場景',
      swe1: '日常開發 + 團隊協作',
      claude: '複雜設計 + 推理任務',
      gpt: '大型代碼庫 + 文檔生成'
    },
    {
      aspect: '集成方式',
      swe1: 'Windsurf Editor 原生集成',
      claude: 'API 調用 + 第三方工具',
      gpt: 'GitHub Copilot + VS Code'
    },
    {
      aspect: '學習能力',
      swe1: '適應個人/團隊風格',
      claude: '固定行為模式',
      gpt: '固定行為模式'
    }
  ];

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              對比面向
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SWE-1
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Claude 3.7 Sonnet
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GPT-4.1
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {item.aspect}
              </td>
              <td className="px-6 py-4 text-sm text-blue-600 font-medium">
                {item.swe1}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.claude}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.gpt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelComparisonTable;