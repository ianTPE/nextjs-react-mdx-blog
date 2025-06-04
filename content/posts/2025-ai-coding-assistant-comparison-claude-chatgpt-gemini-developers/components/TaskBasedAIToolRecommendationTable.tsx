import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type AIToolRecommendation = {
  task: string;
  tool1: string;
  tool2: string;
  auxiliaryTool: string;
  mode: string;
};

const defaultData: AIToolRecommendation[] = [
  { task: '⚡ 快速原型', tool1: 'Claude（普通）', tool2: '千問', auxiliaryTool: 'Perplexity', mode: '普通模式' },
  { task: '🔍 技術選型', tool1: 'ChatGPT（Thinking）', tool2: 'Gemini', auxiliaryTool: 'DeepSeek', mode: 'Thinking模式' },
  { task: '📋 流程梳理', tool1: '千問', tool2: 'Claude', auxiliaryTool: '豆包', mode: '普通模式' },
  { task: '🛡️ 安全評估', tool1: 'Gemini（Thinking）', tool2: 'Claude', auxiliaryTool: 'Grok', mode: 'Thinking模式' },
  { task: '👥 團隊培訓', tool1: 'ChatGPT', tool2: 'Claude', auxiliaryTool: 'Perplexity', mode: '普通模式' },
];

const columnHelper = createColumnHelper<AIToolRecommendation>();

const columns = [
  columnHelper.accessor('task', {
    header: () => '任務場景',
    cell: info => <span className="font-semibold">{info.getValue()}</span>,
  }),
  columnHelper.accessor('tool1', {
    header: () => '主要工具 1',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('tool2', {
    header: () => '主要工具 2',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('auxiliaryTool', {
    header: () => '輔助工具',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('mode', {
    header: () => '建議模式',
    cell: info => info.getValue(),
  }),
];

export function TaskBasedAIToolRecommendationTable() {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
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
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap py-4 px-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
