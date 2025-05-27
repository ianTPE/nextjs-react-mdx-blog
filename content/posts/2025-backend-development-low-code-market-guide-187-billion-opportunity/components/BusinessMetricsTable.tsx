import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

interface BusinessMetrics {
  metric: string;
  mvp: string;
  pmf: string;
  scale: string;
  improvement: string;
}

const data: BusinessMetrics[] = [
  {
    metric: '月活躍用戶',
    mvp: '50',
    pmf: '1,800',
    scale: '35,000',
    improvement: '700x 增長'
  },
  {
    metric: '客戶留存率',
    mvp: '60%',
    pmf: '85%',
    scale: '94%',
    improvement: '+34 百分點'
  },
  {
    metric: '平均客單價',
    mvp: '$50',
    pmf: '$120',
    scale: '$280',
    improvement: '5.6x 增長'
  },
  {
    metric: '客戶獲取成本',
    mvp: '$200',
    pmf: '$80',
    scale: '$65',
    improvement: '67% 降低'
  },
  {
    metric: '系統可用性',
    mvp: '95%',
    pmf: '99.5%',
    scale: '99.9%',
    improvement: '+4.9 百分點'
  },
  {
    metric: 'API 回應時間',
    mvp: '800ms',
    pmf: '200ms',
    scale: '50ms',
    improvement: '94% 改善'
  }
];

const columnHelper = createColumnHelper<BusinessMetrics>();

const getStageColor = (stage: 'mvp' | 'pmf' | 'scale') => {
  switch (stage) {
    case 'mvp':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'pmf':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'scale':
      return 'bg-green-50 text-green-700 border-green-200';
  }
};

const getImprovementColor = (improvement: string) => {
  if (improvement.includes('降低') || improvement.includes('改善')) {
    return 'bg-green-100 text-green-800 border-green-300';
  } else {
    return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

const columns = [
  columnHelper.accessor('metric', {
    header: '關鍵指標',
    cell: (info) => (
      <div className="font-medium text-gray-900 py-3 px-2">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('mvp', {
    header: 'MVP 階段',
    cell: (info) => (
      <div className={`py-3 px-3 rounded text-center font-semibold border ${getStageColor('mvp')}`}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('pmf', {
    header: 'PMF 階段',
    cell: (info) => (
      <div className={`py-3 px-3 rounded text-center font-semibold border ${getStageColor('pmf')}`}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('scale', {
    header: '規模化階段',
    cell: (info) => (
      <div className={`py-3 px-3 rounded text-center font-semibold border ${getStageColor('scale')}`}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('improvement', {
    header: '總體改善',
    cell: (info) => (
      <div className={`py-3 px-3 rounded text-center font-bold border ${getImprovementColor(info.getValue())}`}>
        {info.getValue()}
      </div>
    ),
  }),
];

const BusinessMetricsTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 my-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          核心商業指標演進分析
        </h3>
        <p className="text-sm text-gray-600">
          從 MVP 到獨角獸：HR 科技新創公司 36 個月發展歷程的關鍵數據
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
                    className="text-center py-4 px-2 font-semibold text-gray-900 bg-gray-50"
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
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-600 text-xl">🚀</span>
            <h4 className="font-semibold text-red-900">MVP 階段 (0-6個月)</h4>
          </div>
          <p className="text-sm text-red-800 mb-2">
            <strong>技術棧：</strong>Bubble + Airtable + Zapier
          </p>
          <p className="text-sm text-red-700">
            專注於快速驗證產品概念，用戶增長和留存是核心指標
          </p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-yellow-600 text-xl">📈</span>
            <h4 className="font-semibold text-yellow-900">PMF 階段 (6-18個月)</h4>
          </div>
          <p className="text-sm text-yellow-800 mb-2">
            <strong>技術棧：</strong>Supabase + Next.js + Vercel
          </p>
          <p className="text-sm text-yellow-700">
            找到產品市場契合點，優化用戶體驗和商業模式
          </p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-green-600 text-xl">🏆</span>
            <h4 className="font-semibold text-green-900">規模化階段 (18-36個月)</h4>
          </div>
          <p className="text-sm text-green-800 mb-2">
            <strong>技術棧：</strong>微服務 + Kubernetes + GraphQL
          </p>
          <p className="text-sm text-green-700">
            大規模增長，企業級功能，系統性能和可靠性是關鍵
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-1">💡</div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-2">關鍵成功因素</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <strong>技術策略：</strong>
                <ul className="mt-1 space-y-1">
                  <li>• MVP：速度優先，低程式碼工具快速驗證</li>
                  <li>• PMF：平衡性能與靈活性</li>
                  <li>• 規模化：企業級架構，現代化技術棧</li>
                </ul>
              </div>
              <div>
                <strong>商業重點：</strong>
                <ul className="mt-1 space-y-1">
                  <li>• 持續的產品創新和用戶體驗優化</li>
                  <li>• 數據驅動的增長策略</li>
                  <li>• 技術債務的有效管理（每Sprint 20%時間）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMetricsTable;