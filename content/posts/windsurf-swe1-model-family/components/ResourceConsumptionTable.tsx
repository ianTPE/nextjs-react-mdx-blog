"use client";

import React from 'react';

const ResourceConsumptionTable = () => {
  const data = [
    { model: 'SWE-1-mini', consumption: '12%', rank: 1 },
    { model: 'SWE-1-lite', consumption: '40%', rank: 2 },
    { model: 'SWE-1', consumption: '85%', rank: 3 },
    { model: 'GPT-4.1', consumption: '100%', rank: 4 },
    { model: 'Claude 3.5 Sonnet', consumption: '125%', rank: 5 },
    { model: 'Claude 3.7 Sonnet', consumption: '180%', rank: 6 },
  ];

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              排名
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              模型
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              資源消耗 (相對值)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className={item.model.includes('SWE-1') ? 'bg-blue-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{item.rank}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.model}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className={item.model.includes('SWE-1') ? 'font-bold text-blue-600' : ''}>
                  {item.consumption}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-sm text-gray-500 mt-2 px-6 pb-4">
        * 以 GPT-4.1 API 調用為基準 100%
      </div>
    </div>
  );
};

export default ResourceConsumptionTable;