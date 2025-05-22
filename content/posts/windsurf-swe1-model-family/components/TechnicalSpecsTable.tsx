"use client";

import React from 'react';

const TechnicalSpecsTable = () => {
  const data = [
    {
      spec: '參數規模',
      swe1: '3.2T (稀疏優化)',
      claude: '未公開 (估計 500B+)',
      gpt: '1.8T (推測)'
    },
    {
      spec: '上下文窗口',
      swe1: '工程特化上下文',
      claude: '200K tokens',
      gpt: '1M+ tokens'
    },
    {
      spec: '回應延遲',
      swe1: '43ms - 1.2s',
      claude: '2-5s',
      gpt: '1-3s'
    },
    {
      spec: '成本結構',
      swe1: '按訂閱計費',
      claude: '$3-15/M tokens',
      gpt: '$2.5-10/M tokens'
    },
    {
      spec: '部署方式',
      swe1: '雲端 + 本地混合',
      claude: '雲端 API',
      gpt: '雲端 API'
    },
    {
      spec: '模型變體',
      swe1: '3個 (mini/lite/full)',
      claude: '1個',
      gpt: '3個 (nano/mini/standard)'
    },
    {
      spec: '更新頻率',
      swe1: '即時學習',
      claude: '定期更新',
      gpt: '定期更新'
    }
  ];

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              技術規格
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
                {item.spec}
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

export default TechnicalSpecsTable;