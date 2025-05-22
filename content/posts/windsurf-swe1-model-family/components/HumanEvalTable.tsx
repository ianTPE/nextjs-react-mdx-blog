"use client";

import React from 'react';

const HumanEvalTable = () => {
  const data = [
    { model: 'SWE-1', score: '89.2%', rank: 1 },
    { model: 'Claude 3.7 Sonnet', score: '88.4%', rank: 2 },
    { model: 'GPT-4.1', score: '84.1%', rank: 3 },
    { model: 'Claude 3.5 Sonnet', score: '81.7%', rank: 4 },
    { model: 'SWE-1-lite', score: '78.3%', rank: 5 },
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
              HumanEval+ 分數
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
                  {item.score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HumanEvalTable;