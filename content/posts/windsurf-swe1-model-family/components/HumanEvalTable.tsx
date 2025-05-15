'use client';

import React from 'react';

const HumanEvalTable = () => {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">模型</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Pass@1</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Pass@3</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Pass@10</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1</td>
            <td className="py-3 px-4 border-b border-gray-300">79.3%</td>
            <td className="py-3 px-4 border-b border-gray-300">89.7%</td>
            <td className="py-3 px-4 border-b border-gray-300">95.1%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">Claude 3.7 Sonnet</td>
            <td className="py-3 px-4 border-b border-gray-300">77.8%</td>
            <td className="py-3 px-4 border-b border-gray-300">88.9%</td>
            <td className="py-3 px-4 border-b border-gray-300">94.5%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">GPT-4.1</td>
            <td className="py-3 px-4 border-b border-gray-300">75.3%</td>
            <td className="py-3 px-4 border-b border-gray-300">86.2%</td>
            <td className="py-3 px-4 border-b border-gray-300">93.8%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1-lite</td>
            <td className="py-3 px-4 border-b border-gray-300">71.2%</td>
            <td className="py-3 px-4 border-b border-gray-300">82.3%</td>
            <td className="py-3 px-4 border-b border-gray-300">88.5%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HumanEvalTable;
