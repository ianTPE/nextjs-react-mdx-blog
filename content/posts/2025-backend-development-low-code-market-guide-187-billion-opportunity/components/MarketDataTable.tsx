import React from 'react';
import DataTable from './DataTable';

const MarketDataTable: React.FC = () => {
  const data = [
    {
      category: '低程式碼開發平台',
      marketSize2020: 132,
      marketSize2025: 455,
      cagr: '28.1%',
      notes: '企業數位轉型的主要推動力',
    },
    {
      category: '無程式碼AI平台',
      marketSize2020: 11,
      marketSize2025: 248,
      cagr: '38.2%',
      notes: '從2024年的49億美元增長到2029年的248億美元',
    },
    {
      category: 'Headless CMS',
      marketSize2020: 3.2,
      marketSize2025: 21.4,
      cagr: '22.15%',
      notes: '從2024年的8.51億美元增長到2031年的36.81億美元',
    },
    {
      category: '工作流程自動化',
      marketSize2020: 40.3,
      marketSize2025: 121.9,
      cagr: '14.8%',
      notes: '預計2030年達到362.5億美元',
    },
    {
      category: '即時資料處理',
      marketSize2020: 15.2,
      marketSize2025: 47.8,
      cagr: '25.7%',
      notes: 'IoT和邊緣運算驅動快速增長',
    },
  ];

  const columns = [
    {
      header: '類別',
      accessorKey: 'category',
    },
    {
      header: '2020年市場規模(億美元)',
      accessorKey: 'marketSize2020',
      cell: (info: any) => `$${info.getValue()}億`,
    },
    {
      header: '2025年市場規模(億美元)',
      accessorKey: 'marketSize2025',
      cell: (info: any) => `$${info.getValue()}億`,
    },
    {
      header: '複合年增長率',
      accessorKey: 'cagr',
    },
    {
      header: '備註',
      accessorKey: 'notes',
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title="全球低程式碼/無程式碼市場規模與成長率"
      description="資料來源：Gartner, Forrester Research, IDC (2025年資料為預測值)"
    />
  );
};

export default MarketDataTable;
