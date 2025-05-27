import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

interface CmsComparison {
  aspect: string;
  traditional: string;
  headless: string;
}

const data: CmsComparison[] = [
  {
    aspect: '架構耦合度',
    traditional: '前後端緊密耦合',
    headless: '完全解耦'
  },
  {
    aspect: '前端技術選擇',
    traditional: '受限於 CMS 模板',
    headless: '任意前端框架'
  },
  {
    aspect: '性能',
    traditional: '受模板引擎限制',
    headless: '可高度優化'
  },
  {
    aspect: '安全性',
    traditional: '攻擊面較大',
    headless: '後端隱藏，更安全'
  },
  {
    aspect: '擴展性',
    traditional: '垂直擴展為主',
    headless: '水平擴展容易'
  },
  {
    aspect: '開發體驗',
    traditional: '依賴 CMS 生態',
    headless: '現代開發工具鏈'
  }
];

const columnHelper = createColumnHelper<CmsComparison>();

const columns = [
  columnHelper.accessor('aspect', {
    header: '比較項目',
    cell: (info) => (
      <div className="font-medium text-gray-900 py-3 px-2">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('traditional', {
    header: '傳統 CMS',
    cell: (info) => (
      <div className="text-red-600 py-3 px-2 bg-red-50 rounded">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('headless', {
    header: 'Headless CMS',
    cell: (info) => (
      <div className="text-green-600 py-3 px-2 bg-green-50 rounded">
        {info.getValue()}
      </div>
    ),
  }),
];

const CmsComparisonTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 my-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          傳統 CMS vs Headless CMS 對比
        </h3>
        <p className="text-sm text-gray-600">
          技術架構差異分析，展示 Headless CMS 的核心優勢
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2 border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className="text-left py-4 px-2 font-semibold text-gray-900 bg-gray-50"
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
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id} 
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-1">💡</div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">核心洞察</p>
            <p className="text-sm text-blue-800">
              Headless CMS 在技術架構上的全面優勢，使其成為現代企業數位轉型的首選方案。
              特別適合需要多通路內容分發、高性能要求、和現代開發流程的項目。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsComparisonTable;