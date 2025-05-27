import React from 'react';
import DataTable from './DataTable';

const PricingStrategyTable: React.FC = () => {
  const data = [
    {
      service: '簡單流程自動化',
      priceRange: '$300-$800',
      description: '如表單提交通知、簡單資料同步',
      timeframe: '1-3天',
    },
    {
      service: '中等複雜度流程',
      priceRange: '$800-$2000',
      description: '如多步驟審批流程、客戶資料整合',
      timeframe: '3-7天',
    },
    {
      service: '複雜企業級流程',
      priceRange: '$2000-$5000',
      description: '如ERP整合、多系統資料協同',
      timeframe: '1-3週',
    },
    {
      service: 'API開發與整合',
      priceRange: '$1500-$6000',
      description: '自定義API設計、第三方系統整合',
      timeframe: '1-4週',
    },
    {
      service: 'Headless CMS實施',
      priceRange: '$2000-$8000',
      description: '內容模型設計、前後端整合、多語言支援',
      timeframe: '2-6週',
    },
    {
      service: '資料分析與報表',
      priceRange: '$1200-$4000',
      description: '商業智能儀表板、自動化報表',
      timeframe: '1-3週',
    },
    {
      service: '培訓服務',
      priceRange: '$50-$100/小時',
      description: '團隊培訓、技術知識轉移',
      timeframe: '依需求而定',
    },
    {
      service: '維護合約',
      priceRange: '$100-$500/月',
      description: '定期維護、問題排解、小型更新',
      timeframe: '持續服務',
    }
  ];

  const columns = [
    {
      header: '服務項目',
      accessorKey: 'service',
    },
    {
      header: '價格範圍',
      accessorKey: 'priceRange',
    },
    {
      header: '服務說明',
      accessorKey: 'description',
    },
    {
      header: '實施週期',
      accessorKey: 'timeframe',
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title="低程式碼後端開發服務定價策略"
      description="基於全球自由工作平台的市場行情及專案複雜度分析 (2025年資料)"
    />
  );
};

export default PricingStrategyTable;
