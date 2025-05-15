'use client';

import React from 'react';

const LatencyTable = () => {
  return (
    <div className="overflow-x-auto -ml-2 sm:ml-0 my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">模型</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">平均回應時間</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">首次 Token 延遲</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">完整回應時間</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1-mini</td>
            <td className="py-3 px-4 border-b border-gray-300">43 ms</td>
            <td className="py-3 px-4 border-b border-gray-300">N/A</td>
            <td className="py-3 px-4 border-b border-gray-300">N/A</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1-lite</td>
            <td className="py-3 px-4 border-b border-gray-300">156 ms</td>
            <td className="py-3 px-4 border-b border-gray-300">372 ms</td>
            <td className="py-3 px-4 border-b border-gray-300">423 ms</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-1</td>
            <td className="py-3 px-4 border-b border-gray-300">278 ms</td>
            <td className="py-3 px-4 border-b border-gray-300">312 ms</td>
            <td className="py-3 px-4 border-b border-gray-300">385 ms</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">API-based models</td>
            <td className="py-3 px-4 border-b border-gray-300">800-1200 ms</td>
            <td className="py-3 px-4 border-b border-gray-300">1000-1500 ms</td>
            <td className="py-3 px-4 border-b border-gray-300">1200-2000 ms</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LatencyTable;
