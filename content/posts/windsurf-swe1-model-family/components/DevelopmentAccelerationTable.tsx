'use client';

import React from 'react';

const DevelopmentAccelerationTable = () => {
  return (
    <div className="overflow-x-auto -ml-2 sm:ml-0 my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">開發任務</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">無 AI 輔助</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">通用 AI 輔助</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">SWE-1 輔助</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">改進</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">新功能實現</td>
            <td className="py-3 px-4 border-b border-gray-300">100 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">47 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">28 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">72%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">錯誤修復</td>
            <td className="py-3 px-4 border-b border-gray-300">35 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">22 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">9 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">74%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">重構優化</td>
            <td className="py-3 px-4 border-b border-gray-300">120 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">73 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">36 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">70%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">單元測試生成</td>
            <td className="py-3 px-4 border-b border-gray-300">50 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">18 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">8 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">84%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">文檔生成</td>
            <td className="py-3 px-4 border-b border-gray-300">45 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">15 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">6 分鐘</td>
            <td className="py-3 px-4 border-b border-gray-300">87%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DevelopmentAccelerationTable;
