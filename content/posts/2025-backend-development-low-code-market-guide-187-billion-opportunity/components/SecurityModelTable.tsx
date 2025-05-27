import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

interface SecurityModelComparison {
  aspect: string;
  traditional: string;
  zeroTrust: string;
}

const data: SecurityModelComparison[] = [
  {
    aspect: '信任基礎',
    traditional: '網路邊界',
    zeroTrust: '身份驗證'
  },
  {
    aspect: '預設假設',
    traditional: '內網安全',
    zeroTrust: '永不信任'
  },
  {
    aspect: '訪問控制',
    traditional: '一次驗證',
    zeroTrust: '持續驗證'
  },
  {
    aspect: '監控範圍',
    traditional: '邊界流量',
    zeroTrust: '所有流量'
  },
  {
    aspect: '資料保護',
    traditional: '週邊防護',
    zeroTrust: '端到端加密'
  }
];

const columnHelper = createColumnHelper<SecurityModelComparison>();

const columns = [
  columnHelper.accessor('aspect', {
    header: '安全要素',
    cell: (info) => (
      <div className="font-medium text-gray-900 py-3 px-2">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('traditional', {
    header: '傳統模型',
    cell: (info) => (
      <div className="text-orange-600 py-3 px-2 bg-orange-50 rounded border border-orange-200">
        <div className="flex items-center space-x-2">
          <span className="text-orange-500">⚠️</span>
          <span className="font-medium">{info.getValue()}</span>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('zeroTrust', {
    header: '零信任模型',
    cell: (info) => (
      <div className="text-green-600 py-3 px-2 bg-green-50 rounded border border-green-200">
        <div className="flex items-center space-x-2">
          <span className="text-green-500">🔒</span>
          <span className="font-medium">{info.getValue()}</span>
        </div>
      </div>
    ),
  }),
];

const SecurityModelTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 my-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          傳統安全模型 vs 零信任安全架構
        </h3>
        <p className="text-sm text-gray-600">
          企業安全架構的根本性變革，展示零信任模型的核心優勢
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
      
      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded border border-orange-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-orange-500 text-xl">⚠️</span>
              <h4 className="font-semibold text-orange-900">傳統模型風險</h4>
            </div>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• 內網突破後無限制橫向移動</li>
              <li>• 邊界防護一旦失效全面失守</li>
              <li>• 遠端工作時代適應性差</li>
              <li>• 內部威脅檢測能力不足</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded border border-green-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-green-500 text-xl">🔒</span>
              <h4 className="font-semibold text-green-900">零信任優勢</h4>
            </div>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• 最小權限原則持續執行</li>
              <li>• 每次存取都需要驗證</li>
              <li>• 完整的行為分析和監控</li>
              <li>• 適應現代分散式架構</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-1">🎯</div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">實施建議</p>
            <p className="text-sm text-blue-800">
              從身份識別管理開始，循序漸進實施零信任架構。優先保護關鍵資產，
              逐步將所有系統納入零信任框架。預期 12-18 個月完成完整轉型。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityModelTable;