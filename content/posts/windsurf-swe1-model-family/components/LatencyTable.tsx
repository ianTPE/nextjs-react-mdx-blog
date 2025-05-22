"use client";

import React from 'react';

const LatencyTable = () => {
  const data = [
    { model: 'SWE-1-mini', latency: '43ms', rank: 1 },
    { model: 'SWE-1-lite', latency: '780ms', rank: 2 },
    { model: 'SWE-1', latency: '1,240ms', rank: 3 },
    { model: 'Claude 3.5 Sonnet', latency: '2,100ms', rank: 4 },
    { model: 'GPT-4.1', latency: '2,800ms', rank: 5 },
    { model: 'Claude 3.7 Sonnet', latency: '3,200ms', rank: 6 },
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
              平均延遲
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
                  {item.latency}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatencyTable;