import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface AIScore {
  dimension: string;
  score: string;
  comment: string;
}

const data: AIScore[] = [
  { dimension: '技術深度', score: '9/10', comment: '深入理解 MDX 編譯和 SSR 機制' },
  { dimension: '實用性', score: '10/10', comment: '代碼可直接運行，結構完整' },
  { dimension: '結構性', score: '10/10', comment: '層次清晰，邏輯連貫' },
  { dimension: '完整性', score: '9/10', comment: '涵蓋所有關鍵環節' },
  { dimension: '安全性考量', score: '9/10', comment: '詳細的安全建議' },
  { dimension: '創新性', score: '9/10', comment: '提供管理界面等創新建議' },
];

// Define columns for react-table
const columns: ColumnDef<AIScore>[] = [
  {
    accessorKey: 'dimension',
    header: '維度',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'score',
    header: '評分',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'comment',
    header: '評語',
    cell: info => info.getValue(),
  },
];

export default function AIScoreComparisonTable() {
  const table = useReactTable<AIScore>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto my-6">
      <table className="min-w-[600px] w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700"
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
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className="even:bg-gray-50 hover:bg-gray-200">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 p-3 text-sm text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center border border-gray-300 p-3 text-sm text-gray-500"
              >
                沒有結果。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
