import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type AIScore = {
  platform: string;
  totalScore: string;
  techDepth: number;
  practicality: number;
  structure: number;
  completeness: number;
  security: number;
  innovation: number;
  recommendation: string;
};

const defaultData: AIScore[] = [
  { platform: 'Claude', totalScore: '56/60', techDepth: 9, practicality: 10, structure: 10, completeness: 9, security: 9, innovation: 9, recommendation: '⭐⭐⭐⭐⭐' },
  { platform: 'ChatGPT', totalScore: '49/60', techDepth: 9, practicality: 8, structure: 8, completeness: 8, security: 8, innovation: 8, recommendation: '⭐⭐⭐⭐' },
  { platform: 'Gemini', totalScore: '47/60', techDepth: 10, practicality: 6, structure: 8, completeness: 10, security: 10, innovation: 3, recommendation: '⭐⭐⭐⭐' },
  { platform: '千問', totalScore: '38/60', techDepth: 6, practicality: 8, structure: 8, completeness: 6, security: 5, innovation: 5, recommendation: '⭐⭐⭐' },
  { platform: 'DeepSeek', totalScore: '36/60', techDepth: 7, practicality: 7, structure: 6, completeness: 7, security: 5, innovation: 4, recommendation: '⭐⭐⭐' },
  { platform: 'Grok', totalScore: '32/60', techDepth: 5, practicality: 7, structure: 6, completeness: 6, security: 4, innovation: 4, recommendation: '⭐⭐' },
  { platform: '豆包', totalScore: '33/60', techDepth: 6, practicality: 6, structure: 4, completeness: 7, security: 5, innovation: 5, recommendation: '⭐⭐' },
  { platform: 'Perplexity', totalScore: '28/60', techDepth: 4, practicality: 5, structure: 7, completeness: 6, security: 3, innovation: 3, recommendation: '⭐⭐' },
];

const columnHelper = createColumnHelper<AIScore>();

const columns = [
  columnHelper.accessor('platform', {
    header: () => '平台',
    cell: info => <span className="font-bold">{info.getValue()}</span>,
  }),
  columnHelper.accessor('totalScore', {
    header: () => '總分',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('techDepth', {
    header: () => '技術深度',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('practicality', {
    header: () => '實用性',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('structure', {
    header: () => '結構性',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('completeness', {
    header: () => '完整性',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('security', {
    header: () => '安全性',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('innovation', {
    header: () => '創新性',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('recommendation', {
    header: () => '推薦指數',
    cell: info => info.getValue(),
  }),
];

export function OverallAIScoreTable() {
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
