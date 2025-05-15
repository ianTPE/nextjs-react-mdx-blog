'use client';

import React from 'react';

const PerformanceBenchmarkTable = () => {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">基準測試</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">Claude 3.7 Sonnet</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">GPT-4.1</th>
            <th className="py-3 px-4 border-b-2 border-gray-300 text-left font-medium text-gray-700">SWE-1</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">SWE-bench</td>
            <td className="py-3 px-4 border-b border-gray-300">
              62.3%（標準）<br/>
              70.3%（Scaffold）
            </td>
            <td className="py-3 px-4 border-b border-gray-300">54.6%</td>
            <td className="py-3 px-4 border-b border-gray-300">67.8%</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">MMLU</td>
            <td className="py-3 px-4 border-b border-gray-300">未公開</td>
            <td className="py-3 px-4 border-b border-gray-300">80.1%</td>
            <td className="py-3 px-4 border-b border-gray-300">未公開</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 border-b border-gray-300 font-semibold">編碼能力</td>
            <td className="py-3 px-4 border-b border-gray-300">端到端 SDLC 支持</td>
            <td className="py-3 px-4 border-b border-gray-300">Aider 瀏覽 9.8%</td>
            <td className="py-3 px-4 border-b border-gray-300">強（內部評測）</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceBenchmarkTable;
