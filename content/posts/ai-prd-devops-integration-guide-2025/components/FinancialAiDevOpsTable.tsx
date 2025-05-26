'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type FinancialData = {
  processLayer: string;
  techSolution: string;
  implementationDetails: string; // Will be split by <br/>
  performanceMetrics: string;
};

const defaultData: FinancialData[] = [
  {
    processLayer: '需求生成',
    techSolution: 'GPT-4 + 金融領域預訓練',
    implementationDetails: '解析 SWIFT 報文模式<br/>自動生成風控規則',
    performanceMetrics: '需求覆蓋率 +65%',
  },
  {
    processLayer: '代碼交付',
    techSolution: 'GitHub Copilot + Snyk',
    implementationDetails: '生成反洗錢算法<br/>合規性自動檢查',
    performanceMetrics: '代碼缺陷率 -42%',
  },
  {
    processLayer: '運維監控',
    techSolution: 'Datadog 異常檢測',
    implementationDetails: 'API 調用模式分析<br/>自動擴容決策',
    performanceMetrics: '流量處理能力 8x',
  },
];

const columnHelper = createColumnHelper<FinancialData>();

// Helper to render multi-line content (can be extracted to a shared util if used in many tables)
const renderMultiLine = (text: string) => {
  return text.split('<br/>').map((line, index) => (
    <p key={`line-${index}-${line.substring(0, 10)}`} className={index === 0 ? '' : 'mt-1'}>{line}</p>
  ));
};

const columns = [
  columnHelper.accessor('processLayer', {
    header: () => <span className="font-bold">流程層</span>,
    cell: info => info.getValue(),
    size: 120,
    meta: { width: '20%' },
  }),
  columnHelper.accessor('techSolution', {
    header: () => <span className="font-bold">技術方案</span>,
    cell: info => info.getValue(),
    size: 200,
    meta: { width: '25%' },
  }),
  columnHelper.accessor('implementationDetails', {
    header: () => <span className="font-bold">實施細節</span>,
    cell: info => renderMultiLine(info.getValue()),
    size: 250,
    meta: { width: '35%' },
  }),
  columnHelper.accessor('performanceMetrics', {
    header: () => <span className="font-bold">效能指標</span>,
    cell: info => info.getValue(),
    size: 150,
    meta: { width: '20%' },
  }),
];

export const FinancialAiDevOpsTable: React.FC = () => {
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

export default FinancialAiDevOpsTable;
