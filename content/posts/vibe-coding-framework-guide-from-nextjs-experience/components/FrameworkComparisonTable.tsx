"use client";

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// 定義數據類型
type Framework = {
  framework: string;
  vibeCodingFriendly: string;
  learningCost: string;
  recommendation: string;
  experience: string;
};

// 準備數據
const data: Framework[] = [
  {
    framework: 'Next.js (app router)',
    vibeCodingFriendly: '⭐⭐⭐⭐⭐',
    learningCost: '中等',
    recommendation: '最推薦',
    experience: '完美支援'
  },
  {
    framework: 'Remix',
    vibeCodingFriendly: '⭐⭐⭐⭐⭐',
    learningCost: '中等',
    recommendation: '強烈推薦',
    experience: '未深度測試'
  },
  {
    framework: 'Nuxt.js',
    vibeCodingFriendly: '⭐⭐⭐⭐',
    learningCost: '低',
    recommendation: '推薦',
    experience: 'Vue 生態好選擇'
  },
  {
    framework: 'Astro',
    vibeCodingFriendly: '⭐⭐',
    learningCost: '低',
    recommendation: '不適合',
    experience: '實測不便'
  },
  {
    framework: 'Gatsby',
    vibeCodingFriendly: '⭐⭐',
    learningCost: '高',
    recommendation: '不適合',
    experience: '實測不便'
  },
  {
    framework: 'Vite',
    vibeCodingFriendly: '⭐',
    learningCost: '高',
    recommendation: '不適合',
    experience: '實測不便'
  }
];

const columnHelper = createColumnHelper<Framework>();

// 定義列配置
const columns = [
  columnHelper.accessor('framework', {
    header: '框架',
    cell: info => (
      <div className="font-semibold text-gray-900 dark:text-gray-100">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('vibeCodingFriendly', {
    header: 'Vibe Coding 友善度',
    cell: info => (
      <div className="text-center text-lg">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('learningCost', {
    header: '學習成本',
    cell: info => {
      const cost = info.getValue();
      const costColors = {
        '低': 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
        '中等': 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20',
        '高': 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
      };
      
      return (
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${costColors[cost as keyof typeof costColors] || ''}`}>
          {cost}
        </span>
      );
    },
  }),
  columnHelper.accessor('recommendation', {
    header: '推薦指數',
    cell: info => {
      const recommendation = info.getValue();
      const recColors = {
        '最推薦': 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 border-green-200 dark:border-green-800',
        '強烈推薦': 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
        '推薦': 'text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
        '不適合': 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
      };
      
      return (
        <span className={`px-3 py-1 rounded-md text-sm font-medium border ${recColors[recommendation as keyof typeof recColors] || ''}`}>
          {recommendation}
        </span>
      );
    },
  }),
  columnHelper.accessor('experience', {
    header: '實際體驗',
    cell: info => (
      <div className="text-gray-700 dark:text-gray-300">
        {info.getValue()}
      </div>
    ),
  }),
];

export default function FrameworkComparisonTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id}
                className={`${
                  index % 2 === 0 
                    ? 'bg-white dark:bg-gray-900' 
                    : 'bg-gray-50 dark:bg-gray-800/50'
                } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150`}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 表格說明 */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 此比較基於組件驅動開發（Vibe Coding）的實際使用體驗
        </p>
      </div>
    </div>
  );
}