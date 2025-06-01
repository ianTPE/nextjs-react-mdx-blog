"use client";

// 導出所有表格組件
export {
  default as InteractiveTable,
  VersionHistoryTable,
  TermTable,
  KPITable,
  PlatformComparisonTable,
  RolePermissionTable,
  DataFieldTable,
  InteractionEventTable,
  BusinessRuleTable,
  IntegrationMappingTable,
  TestCaseTable,
  ProjectModuleTable,
  RiskTable,
} from './InteractiveTable';

// 導出所有類型
export type {
  InteractiveTableProps,
  VersionHistoryData,
  TermData,
  KPIData,
  PlatformComparisonData,
  RolePermissionData,
  DataFieldData,
  InteractionEventData,
  BusinessRuleData,
  IntegrationMappingData,
  TestCaseData,
  ProjectModuleData,
  RiskData,
} from './InteractiveTable';