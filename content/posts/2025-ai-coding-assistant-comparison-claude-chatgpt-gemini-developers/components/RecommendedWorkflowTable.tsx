import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface WorkflowStep {
  step: string;
  tool: string;
  description: string;
}

const data: WorkflowStep[] = [
  { step: '需求定義與初步探索', tool: 'ChatGPT / Claude', description: '快速獲取多種方案，理解問題邊界' },
  { step: '核心代碼實現', tool: 'Claude', description: '生成高質量、可用的核心代碼' },
  { step: '安全評估階段', tool: 'Gemini', description: '深度分析安全風險，獲取企業級防護方案' },
  { step: '優化階段', tool: 'Claude + 自己思考', description: '結合AI建議與自身經驗進行優化' },
];

const columns: ColumnDef<WorkflowStep>[] = [
  { header: '步驟', accessorKey: 'step' },
  { header: '工具', accessorKey: 'tool' },
  { header: '說明', accessorKey: 'description' },
];

export default function RecommendedWorkflowTable() {
  const table = useReactTable<WorkflowStep>({
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
