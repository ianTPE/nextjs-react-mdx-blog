import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type ScoreDetail = {
  dimension: string;
  score: string;
  comment: string;
};

const defaultData: ScoreDetail[] = [
  {
    dimension: '技術深度',
    score: '10/10',
    comment: '技術分析極其深入，考慮到所有邊緣情況',
  },
  {
    dimension: '實用性',
    score: '6/10',
    comment: '過於複雜，實際使用難度大',
  },
  {
    dimension: '結構性',
    score: '8/10',
    comment: '結構清晰但信息密度過高',
  },
  {
    dimension: '完整性',
    score: '10/10',
    comment: '覆蓋了所有可能的技術細節',
  },
  {
    dimension: '安全性考量',
    score: '10/10',
    comment: '安全分析最為詳盡',
  },
  {
    dimension: '創新性',
    score: '3/10',
    comment: '技術方案相對保守',
  },
];

const columnHelper = createColumnHelper<ScoreDetail>();

const columns = [
  columnHelper.accessor('dimension', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">維度</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('score', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">評分</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('comment', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">評語</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
];

export const GeminiDetailedScoreTable: React.FC = () => {
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
