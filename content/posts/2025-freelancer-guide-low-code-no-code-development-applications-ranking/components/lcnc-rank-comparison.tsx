'use client';
import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, ZAxis, Label } from 'recharts';

const LcncRankComparison = () => {
  // 定義不同來源的排名數據
  const rankingData = [
    { category: 'MVP與快速原型開發', source1: 1, source2: 5, source3: 6, source4: 3, avgRank: 3.75, consensus: 'Mixed' },
    { category: '企業應用與流程自動化', source1: 6, source2: 2, source3: 1, source4: 1, avgRank: 2.5, consensus: 'High for Top 3' },
    { category: '內部工具與管理後台', source1: 4, source2: 3, source3: 2, source4: 2, avgRank: 2.75, consensus: 'High for Top 3' },
    { category: '行動應用與跨平台部署', source1: 2, source2: 4, source3: 4, source4: 4, avgRank: 3.5, consensus: 'Medium' },
    { category: '電商與客戶關係管理(CRM)', source1: 5, source2: 6, source3: 5, source4: 5, avgRank: 5.25, consensus: 'High' },
    { category: '數據分析與儀表板', source1: 3, source2: 1, source3: 3, source4: 6, avgRank: 3.25, consensus: 'Mixed' },
  ];

  // 為散點圖準備數據
  const prepareScatterData = () => {
    const result = [];
    
    for (const item of rankingData) {
      const baseData = {
        category: item.category,
        avgRank: item.avgRank,
        consensus: item.consensus
      };
      
      result.push({
        ...baseData,
        source: 'Source 1',
        rank: item.source1,
        color: getColorForCategory(item.category)
      });
      
      result.push({
        ...baseData,
        source: 'Source 2',
        rank: item.source2,
        color: getColorForCategory(item.category)
      });
      
      result.push({
        ...baseData,
        source: 'Source 3',
        rank: item.source3,
        color: getColorForCategory(item.category)
      });
      
      result.push({
        ...baseData,
        source: 'Source 4',
        rank: item.source4,
        color: getColorForCategory(item.category)
      });
    }
    
    return result;
  };

  // 定義所有合法的類別鍵
  type CategoryKey =
    | 'MVP與快速原型開發'
    | '企業應用與流程自動化'
    | '內部工具與管理後台'
    | '行動應用與跨平台部署'
    | '電商與客戶關係管理(CRM)'
    | '數據分析與儀表板';

  // 為每個類別分配顏色
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


  const scatterData = prepareScatterData();

  interface ScatterDataPoint {
    category: string;
    source: string;
    rank: number;
    avgRank: number;
    consensus: string;
    // Add other fields if needed
  }

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: ScatterDataPoint }[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-bold">{data.category}</p>
          <p>來源: {data.source}</p>
          <p>排名: {data.rank}</p>
          <p>平均排名: {data.avgRank.toFixed(2)}</p>
          <p>共識程度: {data.consensus}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">低代碼/無代碼應用領域排名差異對照</h2>
      <p className="text-center text-sm text-gray-600 mb-8">
        分析四個不同來源的排名差異，展示排名分佈與共識程度
      </p>

      <div className="mb-10">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="category" 
              dataKey="source" 
              name="來源" 
              allowDuplicatedCategory={false}
            >
              <Label value="排名來源" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="rank" 
              name="排名" 
              domain={[0.5, 6.5]} 
              reversed={true}
              ticks={[1, 2, 3, 4, 5, 6]}
            >
              <Label value="排名位置 (1為最高)" angle={-90} position="insideLeft" />
            </YAxis>
            <ZAxis 
              type="number" 
              dataKey="avgRank" 
              range={[60, 300]} 
              name="平均排名" 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {rankingData.map((entry) => (
              <Scatter 
                key={entry.category} 
                name={entry.category} 
                data={scatterData.filter(item => item.category === entry.category)} 
                fill={getColorForCategory(entry.category)} 
                line={{ stroke: getColorForCategory(entry.category), strokeWidth: 1 }}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
        <div className="text-center text-sm text-gray-600">
          注：氣泡大小表示排名平均值，排名越高(1)氣泡越大；相同顏色的點代表同一應用領域在不同來源的排名
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
        <div className="text-center text-sm text-gray-600 mt-4">
          最終排名基於各來源的平均排名計算，共識程度表示不同來源間的一致性
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4">排名差異原因分析</h3>
        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium">市場區域差異</span>：不同地區對特定應用領域的需求可能有所不同，例如北美市場對MVP開發需求較高，而亞洲市場可能更注重企業應用</li>
            <li><span className="font-medium">評估標準不同</span>：不同來源可能關注不同的評估因素，如專案規模、市場數量、技術需求等</li>
            <li><span className="font-medium">行業快速發展</span>：低代碼/無代碼市場發展迅速，短期內的市場變化可能導致評估差異</li>
            <li><span className="font-medium">資料收集時間差異</span>：各來源所依據的數據收集時間不同，可能導致市場變化未被同步反映</li>
            <li><span className="font-medium">專家視角不同</span>：技術專家可能更重視技術複雜度，而市場分析師可能更關注商業潛力</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LcncRankComparison;
