import React from 'react';
import DataTable from './DataTable';

const EnterpriseAdoptionTable: React.FC = () => {
  const data = [
    {
      metric: '企業採用率',
      value: '84%',
      impact: '減輕IT部門壓力並加快產品上市時間',
      year: '2025'
    },
    {
      metric: '使用低程式碼開發的新應用',
      value: '70%',
      impact: '相比2020年的不到25%大幅增長',
      year: '2025'
    },
    {
      metric: '大型企業使用多個低程式碼工具',
      value: '75%',
      impact: '平均每家企業使用至少四個低程式碼開發工具',
      year: '2025'
    },
    {
      metric: '已啟動公民開發者計劃的企業',
      value: '41%',
      impact: '另有20%正在規劃中',
      year: '2024'
    },
    {
      metric: '開發速度提升',
      value: '10倍',
      impact: '開發時間縮短90%',
      year: '2025'
    },
    {
      metric: '平均業務價值增長',
      value: '440萬美元',
      impact: '三年內每家公司從應用程式中獲得的價值',
      year: '2024-2027'
    }
  ];

  const columns = [
    {
      header: '指標',
      accessorKey: 'metric',
    },
    {
      header: '數值',
      accessorKey: 'value',
    },
    {
      header: '影響',
      accessorKey: 'impact',
    },
    {
      header: '參考年份',
      accessorKey: 'year',
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title="企業低程式碼採用現況與效益分析"
      description="資料來源：Forrester Research, Gartner, McKinsey Digital (2025)"
    />
  );
};

export default EnterpriseAdoptionTable;
