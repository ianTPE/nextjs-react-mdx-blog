'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type BenefitData = {
  metricCategory: string;
  traditionalMode: string;
  aiEnabledMode: string;
  improvement: string;
};

const defaultData: BenefitData[] = [
  {
    metricCategory: '需求準確率',
    traditionalMode: '65%',
    aiEnabledMode: '92%',
    improvement: '+41.5%',
  },
  {
    metricCategory: '開發週期',
    traditionalMode: '8-12 週',
    aiEnabledMode: '4-6 週',
    improvement: '-50%',
  },
  {
    metricCategory: '代碼缺陷率',
    traditionalMode: '15‰',
    aiEnabledMode: '8‰',
    improvement: '-46.7%',
  },
  {
    metricCategory: '部署成功率',
    traditionalMode: '85%',
    aiEnabledMode: '98%',
    improvement: '+15.3%',
  },
  {
    metricCategory: '運維響應時間',
    traditionalMode: '30 分鐘',
    aiEnabledMode: '3 分鐘',
    improvement: '-90%',
  },
  {
    metricCategory: '總體 ROI',
    traditionalMode: '-',
    aiEnabledMode: '-',
    improvement: '3.2x',
  },
];

const columnHelper = createColumnHelper<BenefitData>();

const columns = [
  columnHelper.accessor('metricCategory', {
    header: () => <span className="font-bold">指標類別</span>,
    cell: info => info.getValue(),
    size: 150,
    meta: { width: '30%' },
  }),
  columnHelper.accessor('traditionalMode', {
    header: () => <span className="font-bold">傳統模式</span>,
    cell: info => info.getValue(),
    size: 120,
    meta: { width: '20%' },
  }),
  columnHelper.accessor('aiEnabledMode', {
    header: () => <span className="font-bold">AI 賦能模式</span>,
    cell: info => info.getValue(),
    size: 120,
    meta: { width: '25%' },
  }),
  columnHelper.accessor('improvement', {
    header: () => <span className="font-bold">改善幅度</span>,
    cell: info => info.getValue(),
    size: 120,
    meta: { width: '25%' },
  }),
];

export const QuantitativeBenefitTable: React.FC = () => {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border border-gray-300 px-4 py-3 text-left text-sm"
                  style={{ width: (header.column.columnDef as any).meta?.width }}
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
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="border border-gray-300 px-4 py-3 align-top text-sm"
                  style={{ width: (cell.column.columnDef as any).meta?.width }}
                >
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

export default QuantitativeBenefitTable;
