'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type IntegrationData = {
  area: string;
  tools: string; // Will be split by <br/>
  examples: string; // Will be split by <br/>
  points: string; // Will be split by <br/>
};

const defaultData: IntegrationData[] = [
  {
    area: 'AI 需求分析',
    tools: 'GPT-4<br/>BERT<br/>MonkeyLearn<br/>AWS Comprehend',
    examples:
      '從非結構化文本提取需求關鍵詞<br/>情感分析與主題聚類<br/>自動生成用戶故事',
    points: '需要高質量標註數據<br/>定期微調模型參數',
  },
  {
    area: '智能編碼',
    tools: 'GitHub Copilot<br/>Tabnine<br/>Amazon CodeWhisperer',
    examples:
      '根據 PRD 描述生成代碼片段<br/>自動補全測試用例<br/>安全最佳實踐建議',
    points: '需配合代碼審查<br/>設置合規性檢查點',
  },
  {
    area: '自適應流水線',
    tools: 'Harness AI<br/>Azure ML Pipelines<br/>Jenkins X',
    examples: '動態選擇測試範圍<br/>預測部署風險<br/>自動回滾決策',
    points: '建立完整監控指標<br/>設定風險閾值',
  },
  {
    area: '智能運維',
    tools: 'Moogsoft（AIOps）<br/>Google Cloud AIOps<br/>Datadog AI',
    examples: '日誌異常檢測<br/>自動故障根因分析<br/>預測性告警',
    points: '統一日誌格式<br/>建立知識庫',
  },
  {
    area: '數據閉環',
    tools: 'Elasticsearch + Kibana<br/>MLflow<br/>Snowflake',
    examples: '用戶行為分析<br/>模型訓練追蹤<br/>數據湖管理',
    points: '確保數據一致性<br/>實施隱私保護',
  },
];

const columnHelper = createColumnHelper<IntegrationData>();

// Helper to render multi-line content
const renderMultiLine = (text: string) => {
  return text.split('<br/>').map((line, index) => (
    <p key={`line-${index}-${line.substring(0, 10)}`} className={index === 0 ? '' : 'mt-1'}>{line}</p>
  ));
};

const columns = [
  columnHelper.accessor('area', {
    header: () => <span className="font-bold">領域</span>,
    cell: info => <span className="font-bold">{info.getValue()}</span>,
    size: 150,
    meta: { width: '15%' },
  }),
  columnHelper.accessor('tools', {
    header: () => <span className="font-bold">技術/工具</span>,
    cell: info => renderMultiLine(info.getValue()),
    size: 200,
    meta: { width: '25%' },
  }),
  columnHelper.accessor('examples', {
    header: () => <span className="font-bold">功能範例</span>,
    cell: info => renderMultiLine(info.getValue()),
    size: 300,
    meta: { width: '35%' },
  }),
  columnHelper.accessor('points', {
    header: () => <span className="font-bold">實施要點</span>,
    cell: info => renderMultiLine(info.getValue()),
    size: 200,
    meta: { width: '25%' },
  }),
];

export const AiDevOpsIntegrationTable: React.FC = () => {
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

export default AiDevOpsIntegrationTable;
