'use client';

import React from 'react';

const MultiFileContextTable = () => {
  return (
    <div className="overflow-x-auto -ml-2 sm:ml-0 my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">模型</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">依賴識別</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">變更衝突預測</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">語義理解</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1</td>
            <td className="py-3 px-4 border-b border-gray-300">89.3%</td>
            <td className="py-3 px-4 border-b border-gray-300">83.7%</td>
            <td className="py-3 px-4 border-b border-gray-300">86.5%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">Claude 3.7 Sonnet</td>
            <td className="py-3 px-4 border-b border-gray-300">72.1%</td>
            <td className="py-3 px-4 border-b border-gray-300">68.5%</td>
            <td className="py-3 px-4 border-b border-gray-300">81.2%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">GPT-4.1</td>
            <td className="py-3 px-4 border-b border-gray-300">79.6%</td>
            <td className="py-3 px-4 border-b border-gray-300">74.2%</td>
            <td className="py-3 px-4 border-b border-gray-300">82.8%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MultiFileContextTable;
