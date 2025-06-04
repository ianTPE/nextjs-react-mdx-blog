import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type BuildTestResult = {
  aiPlatform: string;
  completionTime: string;
  issuesEncountered: string;
  codeAvailability: string;
  overallRating: string;
};

const defaultData: BuildTestResult[] = [
  {
    aiPlatform: 'Claude',
    completionTime: '2小時',
    issuesEncountered: '無重大問題',
    codeAvailability: '✅ 100%可用',
    overallRating: '優秀',
  },
  {
    aiPlatform: 'ChatGPT',
    completionTime: '3小時',
    issuesEncountered: '需要調試依賴配置',
    codeAvailability: '⚠️ 90%可用',
    overallRating: '良好',
  },
  {
    aiPlatform: 'Gemini',
    completionTime: '4小時',
    issuesEncountered: '配置過於複雜',
    codeAvailability: '⚠️ 85%可用',
    overallRating: '良好',
  },
  {
    aiPlatform: '千問',
    completionTime: '1.5小時',
    issuesEncountered: '缺少錯誤處理',
    codeAvailability: '⚠️ 70%可用',
    overallRating: '一般',
  },
];

const columnHelper = createColumnHelper<BuildTestResult>();

const columns = [
  columnHelper.accessor('aiPlatform', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">AI平台</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{info.getValue()}</span>,
  }),
  columnHelper.accessor('completionTime', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">完成時間</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('issuesEncountered', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">遇到問題</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('codeAvailability', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">代碼可用性</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('overallRating', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">綜合評價</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
];

export const MDXSystemBuildTestTable: React.FC = () => {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} scope="col" className="px-4 py-3 text-left">
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
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
