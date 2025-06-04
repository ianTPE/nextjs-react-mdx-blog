import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface ConversionStep {
  step: string;
  tool: string;
  description: string;
}

const data: ConversionStep[] = [
  { step: 'MDX 轉 JSX', tool: '@mdx-js/mdx', description: '將 MDX 轉成 React JSX' },
  { step: 'JSX 轉 JS', tool: '@babel/core', description: '將 JSX 轉成可執行的 JS 字串' },
];

const columns: ColumnDef<ConversionStep>[] = [
  {
    accessorKey: 'step',
    header: '步驟',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'tool',
    header: '工具',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'description',
    header: '說明',
    cell: info => info.getValue(),
  },
];

export default function MdxJsxConversionStepsTable() {
  const table = useReactTable<ConversionStep>({
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
