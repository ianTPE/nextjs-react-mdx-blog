'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

type PlatformSalary = {
  platform: string;
  juniorHourly: string;
  seniorHourly: string;
  salaryRange: string;
  demand: string;
  demandLevel: number;
};

const data: PlatformSalary[] = [
  {
    platform: 'Bubble',
    juniorHourly: '$50',
    seniorHourly: '$150',
    salaryRange: '$60,000-$130,000',
    demand: '★★★★★',
    demandLevel: 5,
  },
  {
    platform: 'Adalo',
    juniorHourly: '$40',
    seniorHourly: '$120',
    salaryRange: '$50,000-$100,000',
    demand: '★★★★☆',
    demandLevel: 4,
  },
  {
    platform: 'Glide',
    juniorHourly: '$40',
    seniorHourly: '$100',
    salaryRange: '$45,000-$90,000',
    demand: '★★★★☆',
    demandLevel: 4,
  },
  {
    platform: 'FlutterFlow',
    juniorHourly: '$40',
    seniorHourly: '$120',
    salaryRange: '$50,000-$110,000',
    demand: '★★★☆☆',
    demandLevel: 3,
  },
  {
    platform: 'Thunkable',
    juniorHourly: '$30',
    seniorHourly: '$90',
    salaryRange: '$40,000-$85,000',
    demand: '★★★☆☆',
    demandLevel: 3,
  },
  {
    platform: 'AppMaster',
    juniorHourly: '$50',
    seniorHourly: '$150',
    salaryRange: '$60,000-$120,000',
    demand: '★★☆☆☆',
    demandLevel: 2,
  },
];

const columns: ColumnDef<PlatformSalary>[] = [
  {
    header: '平台',
    accessorKey: 'platform',
    cell: info => <span className="font-medium">{info.getValue() as string}</span>,
  },
  {
    header: '初級時薪',
    accessorKey: 'juniorHourly',
    cell: info => <span className="text-center block">{info.getValue() as string}</span>,
  },
  {
    header: '高級時薪',
    accessorKey: 'seniorHourly',
    cell: info => <span className="text-center block">{info.getValue() as string}</span>,
  },
  {
    header: '年薪範圍',
    accessorKey: 'salaryRange',
    cell: info => <span className="text-center block">{info.getValue() as string}</span>,
  },
  {
    header: '需求程度',
    accessorKey: 'demand',
    cell: info => {
      const demandLevel = info.row.original.demandLevel;
      return (
        <div className="flex items-center justify-center">
          <span className="text-yellow-500 text-lg">
            {info.getValue() as string}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            ({demandLevel}/5)
          </span>
        </div>
      );
    },
  },
];

const PlatformSalaryTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto my-8">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow-md rounded-lg">
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
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td 
                      key={cell.id} 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
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
      <p className="mt-2 text-xs text-gray-500 text-right">
        * 數據為2025年市場調研估算值，實際情況可能有所變動
      </p>
    </div>
  );
};

export default PlatformSalaryTable;
