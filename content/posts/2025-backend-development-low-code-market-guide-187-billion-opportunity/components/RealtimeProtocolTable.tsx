import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

interface ProtocolComparison {
  aspect: string;
  websocket: string;
  sse: string;
  webrtc: string;
}

const data: ProtocolComparison[] = [
  {
    aspect: '通訊方向',
    websocket: '雙向',
    sse: '單向（伺服器到客戶端）',
    webrtc: '點對點雙向'
  },
  {
    aspect: '連接開銷',
    websocket: '中等',
    sse: '低',
    webrtc: '高'
  },
  {
    aspect: '適用場景',
    websocket: '聊天、遊戲',
    sse: '通知、資料推送',
    webrtc: '音視頻通話'
  },
  {
    aspect: '瀏覽器支援',
    websocket: '廣泛',
    sse: '廣泛',
    webrtc: '現代瀏覽器'
  },
  {
    aspect: '實現複雜度',
    websocket: '中等',
    sse: '簡單',
    webrtc: '複雜'
  }
];

const columnHelper = createColumnHelper<ProtocolComparison>();

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case '簡單':
      return 'text-green-600 bg-green-50';
    case '中等':
      return 'text-yellow-600 bg-yellow-50';
    case '複雜':
      return 'text-red-600 bg-red-50';
    case '廣泛':
      return 'text-green-600 bg-green-50';
    case '現代瀏覽器':
      return 'text-yellow-600 bg-yellow-50';
    case '雙向':
    case '點對點雙向':
      return 'text-blue-600 bg-blue-50';
    case '單向（伺服器到客戶端）':
      return 'text-purple-600 bg-purple-50';
    case '低':
      return 'text-green-600 bg-green-50';
    case '中等':
      return 'text-yellow-600 bg-yellow-50';
    case '高':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const columns = [
  columnHelper.accessor('aspect', {
    header: '協議類型',
    cell: (info) => (
      <div className="font-medium text-gray-900 py-3 px-2">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('websocket', {
    header: 'WebSocket',
    cell: (info) => (
      <div className={`py-3 px-2 rounded text-center font-medium ${getComplexityColor(info.getValue())}`}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('sse', {
    header: 'Server-Sent Events',
    cell: (info) => (
      <div className={`py-3 px-2 rounded text-center font-medium ${getComplexityColor(info.getValue())}`}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('webrtc', {
    header: 'WebRTC',
    cell: (info) => (
      <div className={`py-3 px-2 rounded text-center font-medium ${getComplexityColor(info.getValue())}`}>
        {info.getValue()}
      </div>
    ),
  }),
];

const RealtimeProtocolTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200 my-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          即時通訊協議技術對比
        </h3>
        <p className="text-sm text-gray-600">
          WebSocket、Server-Sent Events、WebRTC 三大即時通訊技術的特性對比
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
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-blue-600 font-semibold mb-2">🔌 WebSocket</div>
          <p className="text-sm text-blue-800">
            最通用的雙向即時通訊方案，適合聊天、協作工具、即時遊戲等場景
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-purple-600 font-semibold mb-2">📡 Server-Sent Events</div>
          <p className="text-sm text-purple-800">
            輕量級單向推送，完美適合通知、即時資料更新、監控儀表板
          </p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-green-600 font-semibold mb-2">🎥 WebRTC</div>
          <p className="text-sm text-green-800">
            點對點通訊專家，音視頻通話、檔案傳輸、遊戲對戰的首選技術
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealtimeProtocolTable;