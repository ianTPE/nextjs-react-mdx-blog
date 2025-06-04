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
    score: '9/10',
    comment: '深入理解 MDX 編譯和 SSR 機制',
  },
  {
    dimension: '實用性',
    score: '10/10',
    comment: '代碼可直接運行，結構完整',
  },
  {
    dimension: '結構性',
    score: '10/10',
    comment: '層次清晰，邏輯連貫',
  },
  {
    dimension: '完整性',
    score: '9/10',
    comment: '涵蓋所有關鍵環節',
  },
  {
    dimension: '安全性考量',
    score: '9/10',
    comment: '詳細的安全建議',
  },
  {
    dimension: '創新性',
    score: '9/10',
    comment: '提供管理界面等創新建議',
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

export const ClaudeDetailedScoreTable: React.FC = () => {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
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
                <td key={cell.id} className="whitespace-nowrap py-4 px-3 text-sm text-gray-700 dark:text-gray-300">
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
