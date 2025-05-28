import React, { useMemo } from 'react';
import type { FC } from 'react'; // Import FC directly for clarity
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  CellContext
} from '@tanstack/react-table';

interface PlatformData {
  platform: string;
  useCase: string;
  difficulty: string;
  pricing: string;
  difficultyLevel: number;
}

const PlatformComparisonTable: FC = () => {
  const data = useMemo<PlatformData[]>(() => [
    {
      platform: 'Zapier',
      useCase: '中小企業簡單自動化',
      difficulty: '低',
      pricing: '按觸發次數',
      difficultyLevel: 1,
    },
    {
      platform: 'Make (原Integromat)',
      useCase: '複雜業務邏輯處理',
      difficulty: '中',
      pricing: '按操作數量',
      difficultyLevel: 2,
    },
    {
      platform: 'Microsoft Power Automate',
      useCase: '企業級Office 365整合',
      difficulty: '中高',
      pricing: '企業授權',
      difficultyLevel: 3,
    },
  ], []);

  const columns = useMemo<ColumnDef<PlatformData>[]>(() => [
    {
      accessorKey: 'platform',
      header: '平台',
      cell: ({ getValue }) => (
        <div className="font-semibold text-blue-600">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'useCase',
      header: '適用場景',
      cell: ({ getValue }) => (
        <div className="text-gray-700">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'difficulty',
      header: '學習難度',
      cell: ({ row }: CellContext<PlatformData, unknown>) => {
        const level = row.original.difficultyLevel;
        const difficulty = row.getValue('difficulty') as string;
        const getColor = (level: number) => {
          switch (level) {
            case 1: return 'bg-green-100 text-green-800 border-green-200';
            case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 3: return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
          }
        };
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getColor(level)}`}>
            {difficulty}
          </span>
        );
      },
    },
    {
      accessorKey: 'pricing',
      header: '收費結構',
      cell: ({ getValue }) => (
        <div className="text-gray-700 font-medium">
          {getValue() as string}
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">主流平台生態系統對比</h3>
        <p className="text-sm text-gray-600 mt-1">選擇最適合你項目需求的自動化平台</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-200`}
              >
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatformComparisonTable;
