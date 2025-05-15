'use client';

import React from 'react';

const VersionComparisonTable = () => {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b text-left">功能</th>
            <th className="py-2 px-4 border-b text-left">Next.js 14</th>
            <th className="py-2 px-4 border-b text-left">Next.js 15</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">Partial Prerendering (PPR)</td>
            <td className="py-2 px-4 border-b">實驗階段</td>
            <td className="py-2 px-4 border-b">穩定版</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">Turbopack</td>
            <td className="py-2 px-4 border-b">Beta</td>
            <td className="py-2 px-4 border-b">預設打包工具</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">React 版本</td>
            <td className="py-2 px-4 border-b">React 18</td>
            <td className="py-2 px-4 border-b">React 19</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">Server Actions</td>
            <td className="py-2 px-4 border-b">實驗功能</td>
            <td className="py-2 px-4 border-b">正式版</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">Edge Runtime</td>
            <td className="py-2 px-4 border-b">基礎支援</td>
            <td className="py-2 px-4 border-b">強化能力</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">MDX 支援</td>
            <td className="py-2 px-4 border-b">需額外配置</td>
            <td className="py-2 px-4 border-b">內建支援</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">Metadata API</td>
            <td className="py-2 px-4 border-b">基礎功能</td>
            <td className="py-2 px-4 border-b">改進的 API</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VersionComparisonTable;
