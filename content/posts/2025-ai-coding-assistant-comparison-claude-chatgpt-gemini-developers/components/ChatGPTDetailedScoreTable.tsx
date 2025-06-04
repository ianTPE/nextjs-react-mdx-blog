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
    comment: '深入解釋技術原理和選擇理由',
  },
  {
    dimension: '實用性',
    score: '8/10',
    comment: '代碼示例好但略顯複雜',
  },
  {
    dimension: '結構性',
    score: '8/10',
    comment: '邏輯清晰但稍顯冗長',
  },
  {
    dimension: '完整性',
    score: '8/10',
    comment: '覆蓋全面但重點不夠突出',
  },
  {
    dimension: '安全性考量',
    score: '8/10',
    comment: '安全考慮詳細',
  },
  {
    dimension: '創新性',
    score: '8/10',
    comment: '提供多種技術方案對比',
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

export const ChatGPTDetailedScoreTable: React.FC = () => {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
