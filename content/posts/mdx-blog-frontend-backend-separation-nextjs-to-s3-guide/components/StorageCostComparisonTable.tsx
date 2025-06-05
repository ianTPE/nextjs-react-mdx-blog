"use client";

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from '@tanstack/react-table';

interface StorageComparison {
  item: string;
  awsS3: string;
  cloudflareR2: string;
  isHighlight?: boolean;
}

const storageData: StorageComparison[] = [
  {
    item: '存儲費用',
    awsS3: '$0.023/GB/月',
    cloudflareR2: '$0.015/GB/月'
  },
  {
    item: '出流量費用',
    awsS3: '$0.09/GB', 
    cloudflareR2: '$0.00/GB',
    isHighlight: true
  },
  {
    item: 'PUT 請求',
    awsS3: '$0.0005/1000',
    cloudflareR2: '$0.0045/1000'
  },
  {
    item: 'GET 請求',
    awsS3: '$0.0004/1000',
    cloudflareR2: '$0.0036/1000'
  }
];

const storageColumnHelper = createColumnHelper<StorageComparison>();

const storageColumns = [
  storageColumnHelper.accessor('item', {
    header: '項目',
    cell: info => (
      <span className="font-medium">
        {info.getValue()}
      </span>
    ),
  }),
  storageColumnHelper.accessor('awsS3', {
    header: 'AWS S3',
    cell: info => (
      <span className="font-mono text-sm text-orange-600">
        {info.getValue()}
      </span>
    ),
  }),
  storageColumnHelper.accessor('cloudflareR2', {
    header: 'Cloudflare R2',
    cell: info => {
      const row = info.row.original;
      return (
        <span 
          className={`font-mono text-sm ${
            row.isHighlight 
              ? 'font-bold text-green-600 bg-green-50 px-2 py-1 rounded' 
              : 'text-blue-600'
          }`}
        >
          {info.getValue()}
        </span>
      );
    },
  }),
];

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  title: string;
  description?: string;
}

function DataTable<T>({ data, columns, title, description }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
      
      <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-3 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StorageCostComparisonTable() {
  return (
    <div className="space-y-4">
      <DataTable
        data={storageData}
        columns={storageColumns}
        title="Cloudflare R2 vs AWS S3 成本比較"
        description="詳細的費用結構對比，突出顯示 R2 的零出流量費用優勢"
      />
      
      {/* 成本計算範例 */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-green-800 mb-2">
          💰 實際案例計算
        </h4>
        <div className="text-sm text-green-700 space-y-1">
          <p><strong>假設：</strong>每月 1TB 存儲 + 100GB 出流量</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white rounded p-3 border border-green-200">
              <p className="font-medium text-orange-600">AWS S3</p>
              <p>存儲：$23 + 出流量：$9 = <span className="font-bold">$32</span></p>
            </div>
            <div className="bg-white rounded p-3 border border-green-200">
              <p className="font-medium text-blue-600">Cloudflare R2</p>
              <p>存儲：$15 + 出流量：$0 = <span className="font-bold">$15</span></p>
            </div>
          </div>
          <p className="mt-2 font-semibold text-green-800">
            💡 節省 <span className="text-lg">53%</span> 的成本！
          </p>
        </div>
      </div>
    </div>
  );
}
