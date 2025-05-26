'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // For Pie charts
  type TooltipItem, // Added for typing tooltip context
  type ChartOptions, // Added for typing chart options
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Data definitions (copied from original)
const marketSizeData = [
  { year: '2023', value: 24.8, description: '2023年市場規模約248億美元' },
  { year: '2025', value: 37.39, description: '2025年預估市場規模約374億美元' },
  { year: '2028', value: 68, description: '2028年預估市場規模約680億美元' },
  { year: '2030', value: 120, description: '2030年預估市場規模約1200億美元' },
  { year: '2032', value: 264.4, description: '2032年預估市場規模約2644億美元' },
];

const platformTypes = [
  { name: '企業應用開發平台', value: 35, description: 'OutSystems, Mendix, Microsoft Power Apps' },
  { name: '工作流自動化平台', value: 30, description: 'Make (Integromat), n8n, Zapier' },
  { name: 'AI應用開發平台', value: 20, description: 'Dify, Coze, GPTBots' },
  { name: '數據整合平台', value: 15, description: 'Airtable, Notion, Coda' },
];

const applicationAreas = [
  { name: '大型企業', value: 45, description: '企業級低代碼平台提供端到端應用開發能力' },
  { name: '中小企業', value: 35, description: '快速開發應用以降低IT成本' },
  { name: '政府與公共部門', value: 10, description: '數字化轉型與改善公共服務' },
  { name: '個人開發者', value: 10, description: '獨立開發者和小型團隊' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const LowCodeMarketDiagramChartjs = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>低代碼/無代碼市場概況</h1>
        <p style={{ textAlign: 'center' }}>圖表載入中...</p>
      </div>
    );
  }

  // Bar Chart: Market Size Data
  const marketSizeChartData = {
    labels: marketSizeData.map(d => d.year),
    datasets: [
      {
        label: '市場規模 (十億美元)',
        data: marketSizeData.map(d => d.value),
        backgroundColor: '#8884d8',
        borderColor: '#8884d8',
        borderWidth: 1,
      },
    ],
  };

  const marketSizeChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false, // Original didn't have a title directly on chart
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y}十億美元`;
            }
            // Find description
            const dataPoint = marketSizeData[context.dataIndex];
            if (dataPoint?.description) {
              // Tooltips in Chart.js don't natively support multi-line like Recharts formatter returning an array
              // We can return an array of strings for Chart.js v3+ for multi-line tooltips
              return [label, dataPoint.description]; 
            }
            return label;
          },
        },
      }
    },
    scales: {
      x: {
        title: {
          display: false, // XAxis in Recharts didn't have a title, just dataKey
        }
      },
      y: {
        title: {
          display: true,
          text: '市場規模 (十億美元)',
        },
        beginAtZero: true,
      },
    },
  };

  // Platform Types Pie Chart Data
  const platformTypesChartData = {
    labels: platformTypes.map(p => p.name),
    datasets: [
      {
        label: '主要平台類型',
        data: platformTypes.map(p => p.value),
        backgroundColor: platformTypes.map((_p, index) => COLORS[index % COLORS.length]),
        borderColor: platformTypes.map((_p, index) => COLORS[index % COLORS.length]),
        borderWidth: 1,
      },
    ],
  };

  const platformTypesChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Using custom legend below
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const dataPoint = platformTypes[context.dataIndex];
            let label = dataPoint.name || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed}%`;
            }
            return [label, dataPoint.description];
          },
        },
      },
      // For displaying percentages directly on pie chart (requires chartjs-plugin-datalabels)
      // datalabels: {
      //   formatter: (value: any, ctx: any) => {
      //     let sum = 0;
      //     let dataArr = ctx.chart.data.datasets[0].data;
      //     dataArr.map((data: any) => {
      //       sum += data;
      //     });
      //     let percentage = ((value * 100) / sum).toFixed(0) + '%';
      //     return `${ctx.chart.data.labels[ctx.dataIndex]}: ${percentage}`;
      //   },
      //   color: '#fff',
      // }
    },
  };

  // Application Areas Pie Chart Data
  const applicationAreasChartData = {
    labels: applicationAreas.map(a => a.name),
    datasets: [
      {
        label: '應用領域分布',
        data: applicationAreas.map(a => a.value),
        backgroundColor: applicationAreas.map((_a, index) => COLORS[index % COLORS.length]),
        borderColor: applicationAreas.map((_a, index) => COLORS[index % COLORS.length]),
        borderWidth: 1,
      },
    ],
  };

  const applicationAreasChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Using custom legend below
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const dataPoint = applicationAreas[context.dataIndex];
            let label = dataPoint.name || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed}%`;
            }
            return [label, dataPoint.description];
          },
        },
      },
    },
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>低代碼/無代碼市場概況</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2>市場規模與增長趨勢</h2>
        <p style={{ color: '#666' }}>
          低代碼市場正以每年約30%的複合年增長率快速擴張，預計到2032年將達到2644億美元。
        </p>
        <div style={{ height: '300px' }}>
          <Bar options={marketSizeChartOptions} data={marketSizeChartData} />
        </div>
      </div>

      {/* Pie charts will be added here in the next step */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ width: '48%', minWidth: '300px' }}>
          <h2>主要平台類型</h2>
          <div style={{ height: '300px' }}>
            {/* Platform Types Pie Chart */}
            <Pie data={platformTypesChartData} options={platformTypesChartOptions} />
          </div>
          <div>
            {platformTypes.map((type, index) => (
              <div key={`legend-${type.name}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: COLORS[index % COLORS.length], marginRight: '8px' }} />
                <div><strong>{type.name}</strong>: {type.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '48%', minWidth: '300px' }}>
          <h2>應用領域分布</h2>
          <div style={{ height: '300px' }}>
            {/* Application Areas Pie Chart */}
            <Pie data={applicationAreasChartData} options={applicationAreasChartOptions} />
          </div>
          <div>
            {applicationAreas.map((area, index) => (
              <div key={`${area.name}-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: COLORS[index % COLORS.length], marginRight: '8px' }} />
                <div><strong>{area.name}</strong>: {area.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2>市場趨勢與機會</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#0088FE' }}>AI 集成</h3>
            <p>AI 與低代碼平台的深度整合，實現更智能的應用開發和自動化流程</p>
          </div>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#00C49F' }}>公民開發者</h3>
            <p>使非技術人員能夠參與應用開發，預計將維持21%的增長率到2028年</p>
          </div>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#FFBB28' }}>定制化需求</h3>
            <p>低代碼平台基礎上的專業定制服務將成為一個增長點</p>
          </div>
          <div style={{ flex: '1 1 200px', margin: '10px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#FF8042' }}>行業特化</h3>
            <p>針對特定行業的低代碼解決方案將持續受到需求</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LowCodeMarketDiagramChartjs;
