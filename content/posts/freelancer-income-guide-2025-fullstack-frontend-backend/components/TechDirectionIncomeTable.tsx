import { useMemo } from 'react';
import type React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, CellContext } from '@tanstack/react-table';

interface TechDirectionData {
  direction: string;
  projectType: string;
  incomeRange: string;
  developmentCycle: string;
  marketDemand: string;
  demandLevel: number;
  minIncome: number;
  maxIncome: number;
}

const TechDirectionIncomeTable: React.FC = () => {
  const data = useMemo<TechDirectionData[]>(() => [
    {
      direction: '後端自動化',
      projectType: '工作流程優化',
      incomeRange: '$10K-$80K',
      developmentCycle: '2-8週',
      marketDemand: '極高',
      demandLevel: 5,
      minIncome: 10000,
      maxIncome: 80000,
    },
    {
      direction: '前端電商',
      projectType: 'Headless Commerce',
      incomeRange: '$20K-$80K',
      developmentCycle: '4-12週',
      marketDemand: '高',
      demandLevel: 4,
      minIncome: 20000,
      maxIncome: 80000,
    },
    {
      direction: '全棧MVP',
      projectType: '快速原型開發',
      incomeRange: '$5K-$25K',
      developmentCycle: '1-4週',
      marketDemand: '極高',
      demandLevel: 5,
      minIncome: 5000,
      maxIncome: 25000,
    },
    {
      direction: '企業內部工具',
      projectType: '管理後台系統',
      incomeRange: '$15K-$100K',
      developmentCycle: '4-16週',
      marketDemand: '持續增長',
      demandLevel: 4,
      minIncome: 15000,
      maxIncome: 100000,
    },
  ], []);

  const columns = useMemo<ColumnDef<TechDirectionData>[]>(() => [
    {
      accessorKey: 'direction',
      header: '技術方向',
      cell: ({ getValue }) => (
        <div className="font-semibold text-purple-600">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'projectType',
      header: '項目類型',
      cell: ({ getValue }) => (
        <div className="text-gray-700">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'incomeRange',
      header: '收入範圍',
      cell: ({ row }: CellContext<TechDirectionData, unknown>) => {
        const range = row.getValue('incomeRange') as string;
        const min = row.original.minIncome;
        const max = row.original.maxIncome;
        
        return (
          <div className="space-y-1">
            <div className="font-bold text-green-600 text-lg">
              {range}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full relative"
                style={{ width: `${(max / 100000) * 100}%` }}
              >
                <div 
                  className="absolute left-0 top-0 h-2 bg-green-300 rounded-full"
                  style={{ width: `${(min / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'developmentCycle',
      header: '開發週期',
      cell: ({ getValue }) => (
        <div className="text-gray-700 font-medium">
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'marketDemand',
      header: '市場需求',
      cell: ({ row }: CellContext<TechDirectionData, unknown>) => {
        const demand = row.getValue('marketDemand') as string;
        const level = row.original.demandLevel;
        const getColor = (level: number) => {
          switch (level) {
            case 5: return 'bg-red-100 text-red-800 border-red-200';
            case 4: return 'bg-orange-100 text-orange-800 border-orange-200';
            case 3: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
          }
        };
        const demandDisplayDots = Array.from({ length: 5 }, (_, idx) => ({ id: `demand-dot-${idx}` }));

        return (
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getColor(level)}`}>
              {demand}
            </span>
            <div className="flex space-x-1">
              {demandDisplayDots.map((dot, dotIndex) => (
                <div
                  key={dot.id}
                  className={`w-2 h-2 rounded-full ${
                    dotIndex < level ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">各技術方向收入範圍總覽</h3>
        <p className="text-sm text-gray-600 mt-1">選擇最適合你背景和目標的技術方向</p>
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
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-purple-50 transition-colors duration-200`}
              >
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id}
                    className="px-6 py-4 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 text-xs text-gray-600 border-t border-gray-200">
        💡 提示：收入範圍基於2025年市場數據，實際收入會因經驗、地區和項目複雜度而異
      </div>
    </div>
  );
};

export default TechDirectionIncomeTable;
