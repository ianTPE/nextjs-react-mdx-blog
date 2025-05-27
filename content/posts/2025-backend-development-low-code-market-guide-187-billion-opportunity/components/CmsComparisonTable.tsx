import React from 'react';
import DataTable from './DataTable';

const CmsComparisonTable: React.FC = () => {
  const data = [
    {
      item: '架構耦合度',
      traditional: '前後端緊密耦合',
      headless: '完全解耦'
    },
    {
      item: '前端技術選擇',
      traditional: '受限於 CMS 模板',
      headless: '任意前端框架'
    },
    {
      item: '性能',
      traditional: '受模板引擎限制',
      headless: '可高度優化'
    },
    {
      item: '安全性',
      traditional: '攻擊面較大',
      headless: '後端隱藏，更安全'
    },
    {
      item: '擴展性',
      traditional: '垂直擴展為主',
      headless: '水平擴展容易'
    },
    {
      item: '開發體驗',
      traditional: '依賴 CMS 生態',
      headless: '現代開發工具鏈'
    }
  ];

  const columns = [
    {
      header: '比較項目',
      accessorKey: 'item',
    },
    {
      header: '傳統 CMS',
      accessorKey: 'traditional',
    },
    {
      header: 'Headless CMS',
      accessorKey: 'headless',
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title="傳統 CMS vs Headless CMS 對比"
      description="基於2025年技術生態系統評估"
    />
  );
};

export default CmsComparisonTable;
