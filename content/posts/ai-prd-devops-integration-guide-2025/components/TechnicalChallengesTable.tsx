'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type ChallengeData = {
  challengeType: string;
  specificProblem: string;
  solution: string;
  implementationTool: string;
};

const defaultData: ChallengeData[] = [
  {
    challengeType: '數據孤島',
    specificProblem: '多系統數據不互通',
    solution: '統一數據湖架構',
    implementationTool: 'Snowflake + dbt',
  },
  {
    challengeType: '模型漂移',
    specificProblem: '線上效果退化',
    solution: '自動再訓練管道',
    implementationTool: 'MLflow + Kubeflow',
  },
  {
    challengeType: '算力瓶頸',
    specificProblem: '大模型推理慢',
    solution: '模型壓縮與加速',
    implementationTool: 'TensorRT + ONNX',
  },
  {
    challengeType: '安全風險',
    specificProblem: '模型攻擊威脅',
    solution: '對抗訓練與防護',
    implementationTool: 'Adversarial Robustness Toolbox',
  },
];

const columnHelper = createColumnHelper<ChallengeData>();

const columns = [
  columnHelper.accessor('challengeType', {
    header: () => <span className="font-bold">挑戰類型</span>,
    cell: info => info.getValue(),
    size: 120,
    meta: { width: '20%' },
  }),
  columnHelper.accessor('specificProblem', {
    header: () => <span className="font-bold">具體問題</span>,
    cell: info => info.getValue(),
    size: 150,
    meta: { width: '25%' },
  }),
  columnHelper.accessor('solution', {
    header: () => <span className="font-bold">解決方案</span>,
    cell: info => info.getValue(),
    size: 150,
    meta: { width: '25%' },
  }),
  columnHelper.accessor('implementationTool', {
    header: () => <span className="font-bold">實施工具</span>,
    cell: info => info.getValue(),
    size: 180,
    meta: { width: '30%' },
  }),
];

export const TechnicalChallengesTable: React.FC = () => {
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

export default TechnicalChallengesTable;
