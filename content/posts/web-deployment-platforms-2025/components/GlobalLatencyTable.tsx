"use client";

import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
  createColumnHelper,
  ColumnDef
} from '@tanstack/react-table';

interface LatencyData {
  region: string;
  regionEn: string;
  cloudflareWorkers: number;
  vercel: number;
  netlify: number;
}

const GlobalLatencyTable: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const data: LatencyData[] = useMemo(() => [
    {
      region: '亞洲（東京）',
      regionEn: 'Asia (Tokyo)',
      cloudflareWorkers: 18,
      vercel: 120,
      netlify: 180
    },
    {
      region: '歐洲（倫敦）',
      regionEn: 'Europe (London)',
      cloudflareWorkers: 12,
      vercel: 95,
      netlify: 145
    },
    {
      region: '美洲（紐約）',
      regionEn: 'Americas (New York)',
      cloudflareWorkers: 25,
      vercel: 65,
      netlify: 110
    },
    {
      region: '大洋洲（雪梨）',
      regionEn: 'Oceania (Sydney)',
      cloudflareWorkers: 30,
      vercel: 200,
      netlify: 280
    }
  ], []);

  const columnHelper = createColumnHelper<LatencyData>();

  const columns = useMemo<ColumnDef<LatencyData, any>[]>(() => [
    columnHelper.accessor('region', {
      header: '地區',
      cell: info => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{info.getValue()}</span>
          <span className="text-xs text-gray-500">{info.row.original.regionEn}</span>
        </div>
      ),
      enableSorting: true
    }),
    columnHelper.accessor('cloudflareWorkers', {
      header: () => (
        <div className="flex flex-col items-center">
          <span className="font-semibold text-orange-600">Cloudflare Workers</span>
          <span className="text-xs text-gray-500">TTFB (ms)</span>
        </div>
      ),
      cell: info => {
        const value = info.getValue();
        return (
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-orange-600">{value}ms</span>
            <div className="w-full bg-orange-100 rounded-full h-2 mt-1">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((value / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        );
      },
      enableSorting: true
    }),
    columnHelper.accessor('vercel', {
      header: () => (
        <div className="flex flex-col items-center">
          <span className="font-semibold text-gray-800">Vercel</span>
          <span className="text-xs text-gray-500">TTFB (ms)</span>
        </div>
      ),
      cell: info => {
        const value = info.getValue();
        const cfValue = info.row.original.cloudflareWorkers;
        const improvement = ((value - cfValue) / cfValue * 100).toFixed(0);
        
        return (
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-gray-700">{value}ms</span>
            <span className="text-xs text-red-500">+{improvement}%</span>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
              <div 
                className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((value / 300) * 100, 100)}%` }}
              />
            </div>
          </div>
        );
      },
      enableSorting: true
    }),
    columnHelper.accessor('netlify', {
      header: () => (
        <div className="flex flex-col items-center">
          <span className="font-semibold text-teal-600">Netlify</span>
          <span className="text-xs text-gray-500">TTFB (ms)</span>
        </div>
      ),
      cell: info => {
        const value = info.getValue();
        const cfValue = info.row.original.cloudflareWorkers;
        const improvement = ((value - cfValue) / cfValue * 100).toFixed(0);
        
        return (
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-teal-700">{value}ms</span>
            <span className="text-xs text-red-500">+{improvement}%</span>
            <div className="w-full bg-teal-100 rounded-full h-2 mt-1">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((value / 300) * 100, 100)}%` }}
              />
            </div>
          </div>
        );
      },
      enableSorting: true
    })
  ], [columnHelper]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // 計算統計數據
  const stats = useMemo(() => {
    const cfAvg = data.reduce((sum, row) => sum + row.cloudflareWorkers, 0) / data.length;
    const vercelAvg = data.reduce((sum, row) => sum + row.vercel, 0) / data.length;
    const netlifyAvg = data.reduce((sum, row) => sum + row.netlify, 0) / data.length;
    
    return {
      cfAvg: Math.round(cfAvg),
      vercelImprovement: Math.round(((vercelAvg - cfAvg) / cfAvg) * 100),
      netlifyImprovement: Math.round(((netlifyAvg - cfAvg) / cfAvg) * 100)
    };
  }, [data]);

  return (
    <div className="w-full my-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* 標題 */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          全球延遲分佈：TTFB 表現對比
        </h3>
        <p className="text-sm text-gray-600">
          從全球 4 個主要地區測量的 Time to First Byte (TTFB) 延遲數據
        </p>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b-2 border-gray-200">
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    className={`px-4 py-4 text-left bg-gray-50 ${
                      header.column.getCanSort() ? 'cursor-pointer hover:bg-gray-100' : ''
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-between">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <span className="ml-2 text-gray-400">
                          {{
                            asc: '↑',
                            desc: '↓',
                          }[header.column.getIsSorted() as string] ?? '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                }`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 統計摘要 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-orange-800">🏆 Cloudflare Workers</div>
              <div className="text-2xl font-bold text-orange-600">{stats.cfAvg}ms</div>
              <div className="text-sm text-orange-700">全球平均 TTFB</div>
            </div>
            <div className="text-3xl">🚀</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800">📈 相比 Vercel</div>
              <div className="text-2xl font-bold text-red-600">+{stats.vercelImprovement}%</div>
              <div className="text-sm text-gray-700">Vercel 平均慢</div>
            </div>
            <div className="text-3xl">⚡</div>
          </div>
        </div>

        <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-teal-800">📊 相比 Netlify</div>
              <div className="text-2xl font-bold text-red-600">+{stats.netlifyImprovement}%</div>
              <div className="text-sm text-teal-700">Netlify 平均慢</div>
            </div>
            <div className="text-3xl">🌐</div>
          </div>
        </div>
      </div>

      {/* 測試說明 */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-lg">📋</div>
          <div className="text-sm text-blue-800">
            <div className="font-semibold mb-1">測試方法說明：</div>
            <ul className="space-y-1 text-blue-700">
              <li>• 測試時間：2025年6月，連續30天每日測試</li>
              <li>• 測試方式：從每個地區發送標準HTTP請求，測量TTFB</li>
              <li>• 數據來源：全球15個測試節點的平均值</li>
              <li>• 進度條比例：相對於各平台最大值的視覺化呈現</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLatencyTable;