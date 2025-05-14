'use client';

import React from 'react';

const VersionComparisonTable = () => {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300 text-left">功能/特性</th>
            <th className="p-3 border border-gray-300 text-left">Next.js 14</th>
            <th className="p-3 border border-gray-300 text-left">Next.js 15</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">Partial Prerendering (PPR)</td>
            <td className="p-3 border border-gray-300">實驗性支援</td>
            <td className="p-3 border border-gray-300 bg-green-50">穩定版，官方推薦使用</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">打包工具</td>
            <td className="p-3 border border-gray-300">Webpack (預設)，Turbopack (實驗性)</td>
            <td className="p-3 border border-gray-300 bg-green-50">Turbopack (預設)，顯著提升開發速度</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">React 版本</td>
            <td className="p-3 border border-gray-300">React 18</td>
            <td className="p-3 border border-gray-300 bg-green-50">React 19 (支援更強大的 Suspense、Actions 等)</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">Server Actions</td>
            <td className="p-3 border border-gray-300">實驗性功能</td>
            <td className="p-3 border border-gray-300 bg-green-50">穩定版，改進的錯誤處理和類型安全</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">Edge Runtime</td>
            <td className="p-3 border border-gray-300">部分支援</td>
            <td className="p-3 border border-gray-300 bg-green-50">完整支援，包括 API Routes 和 Server Actions</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">MDX 支援</td>
            <td className="p-3 border border-gray-300">需要額外配置</td>
            <td className="p-3 border border-gray-300 bg-green-50">內建 MDX 2.0 支援</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">開發伺服器啟動速度</td>
            <td className="p-3 border border-gray-300">基準</td>
            <td className="p-3 border border-gray-300 bg-green-50">提升 5-10 倍</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">熱更新速度</td>
            <td className="p-3 border border-gray-300">基準</td>
            <td className="p-3 border border-gray-300 bg-green-50">提升 3-5 倍</td>
          </tr>
          <tr>
            <td className="p-3 border border-gray-300 font-semibold">記憶體使用</td>
            <td className="p-3 border border-gray-300">基準</td>
            <td className="p-3 border border-gray-300 bg-green-50">減少約 40%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VersionComparisonTable;