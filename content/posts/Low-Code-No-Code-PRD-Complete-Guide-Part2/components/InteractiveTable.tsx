"use client";

import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

interface InteractiveTableProps<T extends Record<string, any>> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
}

function InteractiveTable<T extends Record<string, any>>({ 
  columns, 
  data, 
  className = "" 
}: InteractiveTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`overflow-x-auto my-6 ${className}`}>
      <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900"
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
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row, index) => (
            <tr 
              key={row.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="border border-gray-300 px-4 py-3 text-sm text-gray-700"
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
}

// TypeScript interfaces for common table data types
export interface VersionHistoryData {
  version: string;
  date: string;
  editor: string;
  changes: string;
  customerSignOff: string;
}

export interface KPIData {
  kpi: string;
  currentState: string;
  targetState: string;
  measurementMethod: string;
}

export interface RolePermissionData {
  feature: string;
  visitor: string;
  registeredUser: string;
  supportAgent: string;
  admin: string;
}

export interface DataFieldData {
  fieldName: string;
  type: string;
  required: string;
  exampleValue: string;
  businessRule: string;
  platformImplementation: string;
}

export interface InteractionEventData {
  interactionEvent: string;
  responseAction: string;
  errorHandling: string;
}

export interface BusinessRuleData {
  id: string;
  ruleDescription: string;
  implementationMethod: string;
}

export interface TestCaseData {
  caseId: string;
  testScenario: string;
  expectedResult: string;
  testResult: string;
}

export interface RiskData {
  riskDescription: string;
  probability: string;
  impact: string;
  mitigation: string;
}

export interface PlatformComparisonData {
  requirement: string;
  bubbleSolution: string;
  alternativeSolution: string;
  reasonForChoice: string;
}

export interface TermData {
  term: string;
  definition: string;
  example: string;
}

export interface IntegrationMappingData {
  systemField: string;
  stripeField: string;
  example: string;
}

export interface ProjectModuleData {
  moduleName: string;
  prdRequirementId: string;
  estimatedHours: string;
  quoteUsd: string;
  notes: string;
}

// 預定義的表格組件
export const VersionHistoryTable: React.FC<{ data: VersionHistoryData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<VersionHistoryData>[]>(() => [
    {
      accessorKey: 'version',
      header: '版本',
    },
    {
      accessorKey: 'date',
      header: '日期',
    },
    {
      accessorKey: 'editor',
      header: '修改人',
    },
    {
      accessorKey: 'changes',
      header: '變更說明',
    },
    {
      accessorKey: 'customerSignOff',
      header: '客戶確認簽字',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            value.includes('已確認') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {value}
          </span>
        );
      },
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const TermTable: React.FC<{ data: TermData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<TermData>[]>(() => [
    {
      accessorKey: 'term',
      header: '術語',
      cell: ({ getValue }) => (
        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'definition',
      header: '定義',
    },
    {
      accessorKey: 'example',
      header: '示例',
      cell: ({ getValue }) => (
        <code className="bg-blue-50 text-blue-700 px-1 py-0.5 rounded text-sm">
          {getValue() as string}
        </code>
      ),
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const KPITable: React.FC<{ data: KPIData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<KPIData>[]>(() => [
    {
      accessorKey: 'kpi',
      header: 'KPI',
    },
    {
      accessorKey: 'currentState',
      header: '當前狀態',
    },
    {
      accessorKey: 'targetState',
      header: '目標',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className="font-semibold text-blue-600">
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'measurementMethod',
      header: '測量方式',
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const PlatformComparisonTable: React.FC<{ data: PlatformComparisonData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<PlatformComparisonData>[]>(() => [
    {
      accessorKey: 'requirement',
      header: '需求',
    },
    {
      accessorKey: 'bubbleSolution',
      header: 'Bubble方案',
      cell: ({ getValue }) => (
        <span className="text-blue-700 font-medium">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'alternativeSolution',
      header: '替代方案（Airtable+Zapier）',
      cell: ({ getValue }) => (
        <span className="text-orange-700">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'reasonForChoice',
      header: '選擇理由',
      cell: ({ getValue }) => (
        <span className="text-green-700 font-medium">
          {getValue() as string}
        </span>
      ),
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const RolePermissionTable: React.FC<{ data: RolePermissionData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<RolePermissionData>[]>(() => [
    {
      accessorKey: 'feature',
      header: '功能',
    },
    {
      accessorKey: 'visitor',
      header: '訪客',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className={value === '✅' ? 'text-green-600' : 'text-red-600'}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'registeredUser',
      header: '客戶（註冊用戶）',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className={value.includes('✅') ? 'text-green-600' : 'text-red-600'}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'supportAgent',
      header: '客服',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className={value === '✅' ? 'text-green-600' : 'text-red-600'}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'admin',
      header: '管理員',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className={value === '✅' ? 'text-green-600' : 'text-red-600'}>
            {value}
          </span>
        );
      },
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const DataFieldTable: React.FC<{ data: DataFieldData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<DataFieldData>[]>(() => [
    {
      accessorKey: 'fieldName',
      header: '欄位名稱',
      cell: ({ getValue }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'type',
      header: '類型',
    },
    {
      accessorKey: 'required',
      header: '必填',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <span className={value === '✅' ? 'text-green-600' : 'text-gray-400'}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'exampleValue',
      header: '示例值',
      cell: ({ getValue }) => (
        <code className="bg-blue-50 text-blue-700 px-1 py-0.5 rounded text-xs">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'businessRule',
      header: '業務規則',
    },
    {
      accessorKey: 'platformImplementation',
      header: '平台實現方式',
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const InteractionEventTable: React.FC<{ data: InteractionEventData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<InteractionEventData>[]>(() => [
    {
      accessorKey: 'interactionEvent',
      header: '交互事件',
      cell: ({ getValue }) => (
        <span className="font-medium text-purple-700">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'responseAction',
      header: '響應動作',
    },
    {
      accessorKey: 'errorHandling',
      header: '錯誤處理',
      cell: ({ getValue }) => (
        <span className="text-red-600 text-sm">
          {getValue() as string}
        </span>
      ),
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const BusinessRuleTable: React.FC<{ data: BusinessRuleData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<BusinessRuleData>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ getValue }) => (
        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'ruleDescription',
      header: '規則描述',
    },
    {
      accessorKey: 'implementationMethod',
      header: '實現方式',
      cell: ({ getValue }) => (
        <code className="bg-blue-50 text-blue-800 px-1 py-0.5 rounded text-sm">
          {getValue() as string}
        </code>
      ),
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const IntegrationMappingTable: React.FC<{ data: IntegrationMappingData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<IntegrationMappingData>[]>(() => [
    {
      accessorKey: 'systemField',
      header: '系統字段',
      cell: ({ getValue }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'stripeField',
      header: 'Stripe字段',
      cell: ({ getValue }) => (
        <code className="bg-blue-50 text-blue-700 px-1 py-0.5 rounded text-sm">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'example',
      header: '示例',
      cell: ({ getValue }) => (
        <code className="bg-green-50 text-green-700 px-1 py-0.5 rounded text-sm">
          {getValue() as string}
        </code>
      ),
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const TestCaseTable: React.FC<{ data: TestCaseData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<TestCaseData>[]>(() => [
    {
      accessorKey: 'caseId',
      header: '用例ID',
      cell: ({ getValue }) => (
        <code className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-mono text-sm">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'testScenario',
      header: '測試場景',
    },
    {
      accessorKey: 'expectedResult',
      header: '預期結果',
    },
    {
      accessorKey: 'testResult',
      header: '測試結果',
      cell: ({ getValue }) => (
        <span className="font-mono text-lg">
          {getValue() as string}
        </span>
      ),
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const ProjectModuleTable: React.FC<{ data: ProjectModuleData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<ProjectModuleData>[]>(() => [
    {
      accessorKey: 'moduleName',
      header: '模塊',
    },
    {
      accessorKey: 'prdRequirementId',
      header: 'PRD需求ID',
      cell: ({ getValue }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
          {getValue() as string}
        </code>
      ),
    },
    {
      accessorKey: 'estimatedHours',
      header: '預估工時',
    },
    {
      accessorKey: 'quoteUsd',
      header: '報價(USD)',
      cell: ({ getValue }) => (
        <span className="font-semibold text-green-600">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'notes',
      header: '備注',
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

export const RiskTable: React.FC<{ data: RiskData[] }> = ({ data }) => {
  const columns = useMemo<ColumnDef<RiskData>[]>(() => [
    {
      accessorKey: 'riskDescription',
      header: '風險描述',
    },
    {
      accessorKey: 'probability',
      header: '概率',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        const colorClass = value === '高' ? 'bg-red-100 text-red-800' : 
                          value === '中' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800';
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'impact',
      header: '影響',
      cell: ({ getValue }) => {
        const value = getValue() as string;
        const colorClass = value === '高' ? 'bg-red-100 text-red-800' : 
                          value === '中' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800';
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: 'mitigation',
      header: '應對措施',
    },
  ], []);

  return <InteractiveTable columns={columns} data={data} />;
};

// 通用 InteractiveTable 導出
export default InteractiveTable;

// 導出所有類型
export type { InteractiveTableProps };