import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface AIFeature {
  ai: string;
  feature: string;
}

const data: AIFeature[] = [
  { ai: 'Claude', feature: '實用主義，開發者友好' },
  { ai: 'ChatGPT', feature: '教學導向，深度解釋' },
  { ai: 'Gemini', feature: '技術極客，安全專家' },
  { ai: 'Kimi', feature: '長文本理解，資料整合' },
  { ai: '文心一言', feature: '中文語境，創意寫作' },
  { ai: '通義千問', feature: '結構化輸出，圖文並茂' },
];

const columns: ColumnDef<AIFeature>[] = [
  { header: 'AI平台', accessorKey: 'ai' },
  { header: '特色總結', accessorKey: 'feature' },
];

export default function AIFeaturesSummaryTable() {
  const table = useReactTable<AIFeature>({
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
