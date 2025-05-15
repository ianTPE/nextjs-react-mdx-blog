'use client';

import React from 'react';

const SWEBenchTable = () => {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">模型</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">準確率</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">完成時間</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">解決問題深度</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1</td>
            <td className="py-3 px-4 border-b border-gray-300">67.8%</td>
            <td className="py-3 px-4 border-b border-gray-300">42.3 秒</td>
            <td className="py-3 px-4 border-b border-gray-300">3.78/5</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">Claude 3.7 (標準)</td>
            <td className="py-3 px-4 border-b border-gray-300">62.3%</td>
            <td className="py-3 px-4 border-b border-gray-300">83.5 秒</td>
            <td className="py-3 px-4 border-b border-gray-300">3.62/5</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">Claude 3.7 (Scaffold)</td>
            <td className="py-3 px-4 border-b border-gray-300">70.3%</td>
            <td className="py-3 px-4 border-b border-gray-300">127.8 秒</td>
            <td className="py-3 px-4 border-b border-gray-300">4.12/5</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">GPT-4.1</td>
            <td className="py-3 px-4 border-b border-gray-300">54.6%</td>
            <td className="py-3 px-4 border-b border-gray-300">61.2 秒</td>
            <td className="py-3 px-4 border-b border-gray-300">3.41/5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SWEBenchTable;
