import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface Score {
  dimension: string;
  score: string;
  comment: string;
}

const data: Score[] = [
  { dimension: '技術深度', score: '6/10', comment: '理解問題表面，缺乏深入分析' },
  { dimension: '實用性', score: '5/10', comment: '代碼示例過於簡單' },
  { dimension: '結構性', score: '6/10', comment: '回答基本清晰' },
  { dimension: '完整性', score: '5/10', comment: '遺漏較多細節' },
  { dimension: '安全性考量', score: '4/10', comment: '安全意識不足' },
  { dimension: '創新性', score: '3/10', comment: '缺乏新意' },
];

const columns: ColumnDef<Score>[] = [
  { header: '維度', accessorKey: 'dimension' },
  { header: '評分', accessorKey: 'score' },
  { header: '評語', accessorKey: 'comment' },
];

export default function WenxinScoreComparison() {
  const table = useReactTable<Score>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="border p-2 text-left bg-gray-100">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="border p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
