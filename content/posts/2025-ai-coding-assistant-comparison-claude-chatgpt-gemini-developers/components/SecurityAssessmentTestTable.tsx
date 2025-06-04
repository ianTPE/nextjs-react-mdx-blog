import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type SecurityTestResult = {
  aiPlatform: string;
  risksIdentified: string;
  protectionQuality: string;
  usability: string;
  evaluation: string;
};

const defaultData: SecurityTestResult[] = [
  {
    aiPlatform: 'Gemini',
    risksIdentified: '8個',
    protectionQuality: '極其詳細',
    usability: '中等',
    evaluation: '最全面',
  },
  {
    aiPlatform: 'Claude',
    risksIdentified: '5個',
    protectionQuality: '實用性強',
    usability: '高',
    evaluation: '最實用',
  },
  {
    aiPlatform: 'ChatGPT',
    risksIdentified: '4個',
    protectionQuality: '解釋清晰',
    usability: '高',
    evaluation: '最易懂',
  },
  {
    aiPlatform: '其他',
    risksIdentified: '1-2個',
    protectionQuality: '基礎提醒',
    usability: '低',
    evaluation: '不足',
  },
];

const columnHelper = createColumnHelper<SecurityTestResult>();

const columns = [
  columnHelper.accessor('aiPlatform', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">AI平台</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{info.getValue()}</span>,
  }),
  columnHelper.accessor('risksIdentified', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">發現風險點</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('protectionQuality', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">防護方案質量</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('usability', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">實用性</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('evaluation', {
    header: () => <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">評價</span>,
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),
];

export const SecurityAssessmentTestTable: React.FC = () => {
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} scope="col" className="px-4 py-3 text-left">
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
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
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
