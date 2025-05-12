// C:\Users\iantp\GitHub\nextjs-react-mdx-blog\content\posts\getting-started-with-nextjs\VersionComparisonTable.tsx
'use client';

import React from 'react';

type FeatureComparisonProps = {
  feature: string;
  nextjs14: string;
  nextjs15: string;
}

const features: FeatureComparisonProps[] = [
  {
    feature: 'Partial Prerendering (PPR)',
    nextjs14: '實驗性階段',
    nextjs15: '穩定版，生產可用'
  },
  {
    feature: 'Turbopack',
    nextjs14: 'Beta 階段',
    nextjs15: '穩定版，完全取代 Webpack'
  },
  {
    feature: 'React 版本',
    nextjs14: 'React 18.x',
    nextjs15: 'React 19.x，支援最新並發功能'
  },
  {
    feature: 'Server Actions',
    nextjs14: '預覽版',
    nextjs15: '穩定版，額外安全強化'
  },
  {
    feature: 'Next.js Compiler',
    nextjs14: '基本優化',
    nextjs15: '進階最佳化，大幅提升效能'
  },
  {
    feature: 'MDX 支援',
    nextjs14: '需額外配置',
    nextjs15: '原生整合 MDX 2.0'
  },
  {
    feature: 'Edge Runtime 支援',
    nextjs14: '僅部分支援',
    nextjs15: '全面支援 API 路由、中間件'
  }
];

export default function VersionComparisonTable() {
  return (
    <div className="my-8">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                功能
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Next.js 14
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Next.js 15
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {features.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.feature}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                  {item.nextjs14}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                  {item.nextjs15}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}