'use client';
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from 'chart.js';
import type { ChartData, ChartOptions, TooltipItem, ScatterDataPoint as ChartJScatterDataPoint } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale
);

const rankingData = [
  { category: 'MVP與快速原型開發', source1: 1, source2: 5, source3: 6, source4: 3, avgRank: 3.75, consensus: 'Mixed' },
  { category: '企業應用與流程自動化', source1: 6, source2: 2, source3: 1, source4: 1, avgRank: 2.5, consensus: 'High for Top 3' },
  { category: '內部工具與管理後台', source1: 4, source2: 3, source3: 2, source4: 2, avgRank: 2.75, consensus: 'High for Top 3' },
  { category: '行動應用與跨平台部署', source1: 2, source2: 4, source3: 4, source4: 4, avgRank: 3.5, consensus: 'Medium' },
  { category: '電商與客戶關係管理(CRM)', source1: 5, source2: 6, source3: 5, source4: 5, avgRank: 5.25, consensus: 'High' },
  { category: '數據分析與儀表板', source1: 3, source2: 1, source3: 3, source4: 6, avgRank: 3.25, consensus: 'Mixed' },
];

type CategoryKey =
  | 'MVP與快速原型開發'
  | '企業應用與流程自動化'
  | '內部工具與管理後台'
  | '行動應用與跨平台部署'
  | '電商與客戶關係管理(CRM)'
  | '數據分析與儀表板';

const colorMap: Record<CategoryKey, string> = {
  'MVP與快速原型開發': '#4C9AFF',
  '企業應用與流程自動化': '#36B37E',
  '內部工具與管理後台': '#00B8D9',
  '行動應用與跨平台部署': '#6554C0',
  '電商與客戶關係管理(CRM)': '#FFAB00',
  '數據分析與儀表板': '#FF5630',
};

const getColorForCategory = (category: CategoryKey | string) => {
  return colorMap[category as CategoryKey] || '#000000';
};

interface ExtendedScatterDataPoint extends ChartJScatterDataPoint {
  category: string;
  sourceName: string; // e.g. 'Source 1'
  consensus: string;
  avgRankVal: number; // Original avgRank for tooltip
}

const LcncRankComparisonChartjs = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sources = ['Source 1', 'Source 2', 'Source 3', 'Source 4'];

  const chartDatasets: import('chart.js').ChartDataset<'scatter', ExtendedScatterDataPoint[]>[] = rankingData.map(item => {
    const dataForCategory: ExtendedScatterDataPoint[] = [];
    sources.forEach((source, sourceIndex) => {
      const rank = item[source.toLowerCase().replace(' ', '') as keyof typeof item] as number;
      if (rank !== undefined) {
        dataForCategory.push({
          x: sourceIndex, // Use numerical index for x-axis
          y: rank,
          category: item.category,
          sourceName: source,
          consensus: item.consensus,
          avgRankVal: item.avgRank,
        });
      }
    });

    return {
      type: 'scatter' as const, // Explicitly define the dataset type
      label: item.category,
      data: dataForCategory,
      backgroundColor: getColorForCategory(item.category),
      borderColor: getColorForCategory(item.category),
      pointRadius: (context) => { // Adjust point size based on avgRank
        const raw = context.raw as ExtendedScatterDataPoint;
        if (raw && typeof raw.avgRankVal === 'number') {
          // Scale radius: lower avgRank (better) = larger radius
          // Example scaling: maxRadius 15, minRadius 5. Ranks 1-6
          const scaledRadius = 15 - (raw.avgRankVal - 1) * (10 / 5);
          return Math.max(5, scaledRadius);
        }
        return 6; // Default radius
      },
      pointHoverRadius: (context) => {
        const raw = context.raw as ExtendedScatterDataPoint;
        if (raw && typeof raw.avgRankVal === 'number') {
          const scaledRadius = 15 - (raw.avgRankVal - 1) * (10 / 5);
          return Math.max(5, scaledRadius) + 2; // Slightly larger on hover
        }
        return 8;
      }
    };
  });

  const data: ChartData<'scatter', ExtendedScatterDataPoint[]> = {
    datasets: chartDatasets,
  };

  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear', // Using numerical index for sources
        position: 'bottom',
        title: {
          display: true,
          text: '排名來源',
        },
        ticks: {
          stepSize: 1,
          callback: (value) => {
            return sources[value as number] || '';
          }
        },
        min: -0.5,
        max: sources.length - 0.5,
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: '排名位置 (1為最高)',
        },
        reverse: true,
        min: 0.5,
        max: 6.5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        display: false, // Hide overlapping data labels on the chart
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'scatter'>) => {
            const raw = context.raw as ExtendedScatterDataPoint;
            if (!raw) return '';
            let label = `${raw.category || context.dataset.label}:
`;
            label += `  來源: ${raw.sourceName}
`;
            label += `  排名: ${raw.y}
`;
            label += `  平均排名: ${raw.avgRankVal?.toFixed(2)}
`;
            label += `  共識程度: ${raw.consensus}`;
            return label.split('\n');
          },
        },
      },
    },
  };

  if (!isMounted) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-center mb-4">低代碼/無代碼應用領域排名差異對照</h2>
            <p className="text-center text-sm text-gray-600 mb-8">
                分析四個不同來源的排名差異，展示排名分佈與共識程度
            </p>
            <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 mb-10">
                <p>載入圖表...</p>
            </div>
             {/* Table remains the same */}
        </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">低代碼/無代碼應用領域排名差異對照</h2>
      <p className="text-center text-sm text-gray-600 mb-8">
        分析四個不同來源的排名差異，展示排名分佈與共識程度
      </p>

      <div className="mb-10">
        <div className="w-full h-[400px]">
          <Scatter data={data} options={options} />
        </div>
        <div className="text-center text-sm text-gray-600 mt-2">
          注：氣泡大小表示排名平均值，排名越低(值小)氣泡越大；相同顏色的點代表同一應用領域在不同來源的排名
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">各應用領域排名對照表</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">應用領域</th>
                <th className="p-2 border border-gray-300">來源1</th>
                <th className="p-2 border border-gray-300">來源2</th>
                <th className="p-2 border border-gray-300">來源3</th>
                <th className="p-2 border border-gray-300">來源4</th>
                <th className="p-2 border border-gray-300">平均排名</th>
                <th className="p-2 border border-gray-300">共識程度</th>
                <th className="p-2 border border-gray-300">最終排名</th>
              </tr>
            </thead>
            <tbody>
              {rankingData.sort((a, b) => a.avgRank - b.avgRank).map((item, index) => (
                <tr key={item.category} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="p-2 border border-gray-300 font-medium" style={{ borderLeft: `4px solid ${getColorForCategory(item.category)}` }}>
                    {item.category}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">{item.source1}</td>
                  <td className="p-2 border border-gray-300 text-center">{item.source2}</td>
                  <td className="p-2 border border-gray-300 text-center">{item.source3}</td>
                  <td className="p-2 border border-gray-300 text-center">{item.source4}</td>
                  <td className="p-2 border border-gray-300 text-center font-bold">{item.avgRank.toFixed(2)}</td>
                  <td className="p-2 border border-gray-300 text-center">
                    {item.consensus === 'High' && <span className="text-green-600">高</span>}
                    {item.consensus === 'High for Top 3' && <span className="text-green-600">高 (前三)</span>}
                    {item.consensus === 'Medium' && <span className="text-yellow-600">中等</span>}
                    {item.consensus === 'Mixed' && <span className="text-red-600">差異大</span>}
                  </td>
                  <td className="p-2 border border-gray-300 text-center font-bold">{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LcncRankComparisonChartjs;
