'use client';

import React from 'react';

const ResourceConsumptionTable = () => {
  return (
    <div className="overflow-x-auto -ml-2 sm:ml-0 my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">模型</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">計算資源</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">成本</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">網絡流量</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1</td>
            <td className="py-3 px-4 border-b border-gray-300">65%</td>
            <td className="py-3 px-4 border-b border-gray-300">45%</td>
            <td className="py-3 px-4 border-b border-gray-300">22%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1-lite</td>
            <td className="py-3 px-4 border-b border-gray-300">37%</td>
            <td className="py-3 px-4 border-b border-gray-300">12%</td>
            <td className="py-3 px-4 border-b border-gray-300">18%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1-mini</td>
            <td className="py-3 px-4 border-b border-gray-300">8%</td>
            <td className="py-3 px-4 border-b border-gray-300">0%</td>
            <td className="py-3 px-4 border-b border-gray-300">3%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResourceConsumptionTable;
