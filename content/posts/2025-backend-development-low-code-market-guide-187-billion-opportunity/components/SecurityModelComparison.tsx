import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

interface SecurityModel {
  element: string;
  traditional: string;
  zeroTrust: string;
}

const data: SecurityModel[] = [
  {
    element: '信任基礎',
    traditional: '網路邊界',
    zeroTrust: '身份驗證',
  },
  {
    element: '預設假設',
    traditional: '內網安全',
    zeroTrust: '永不信任',
  },
  {
    element: '訪問控制',
    traditional: '一次驗證',
    zeroTrust: '持續驗證',
  },
  {
    element: '監控範圍',
    traditional: '邊界流量',
    zeroTrust: '所有流量',
  },
  {
    element: '資料保護',
    traditional: '週邊防護',
    zeroTrust: '端到端加密',
  },
];

const columnHelper = createColumnHelper<SecurityModel>();

const columns = [
  columnHelper.accessor('element', {
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
      <div className="bg-red-50 text-red-700 py-3 px-2 rounded border border-red-200">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('zeroTrust', {
    header: '零信任模型',
    cell: (info) => (
      <div className="bg-green-50 text-green-700 py-3 px-2 rounded border border-green-200">
        {info.getValue()}
      </div>
    ),
  }),
];

const SecurityModelComparison = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900"
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-4 py-3 text-sm"
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

export default SecurityModelComparison;
