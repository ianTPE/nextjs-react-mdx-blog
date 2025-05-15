'use client';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const MarketTrendsAndAdoption = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 檢測視窗大小變化
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初始檢查
    checkIfMobile();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', checkIfMobile);
    
    // 清除監聽器
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // 市場增長預測數據
  const marketGrowthData = [
    { year: 2020, value: 13.2 },
    { year: 2021, value: 20.5 },
    { year: 2022, value: 31.7 },
    { year: 2023, value: 46.4 },
    { year: 2024, value: 65.8 },
    { year: 2025, value: 86.9 },
    { year: 2026, value: 114.3, projected: true },
    { year: 2027, value: 147.6, projected: true },
  ];

  // 行業採用分佈數據
  const industryAdoptionData = [
    { name: '金融與保險', value: 24 },
    { name: '醫療與健康', value: 19 },
    { name: '零售與電商', value: 17 },
    { name: '製造業', value: 12 },
    { name: '專業服務', value: 16 },
    { name: '其他行業', value: 12 },
  ];
  
  // 企業選擇低代碼/無代碼平台的原因數據 - 為移動設備提供簡短名稱
  const adoptionReasonsData = [
    { name: '開發速度提升', shortName: '開發速度', value: 89 },
    { name: '降低IT部門壓力', shortName: '降低IT壓力', value: 73 },
    { name: '成本效益', shortName: '成本效益', value: 68 },
    { name: '業務敏捷性提高', shortName: '業務敏捷', value: 64 },
    { name: '非技術人員賦能', shortName: '人員賦能', value: 59 },
    { name: '傳統開發人才短缺', shortName: '人才短缺', value: 52 },
  ];

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D',
    '#A4DE6C', '#D0ED57', '#83a6ed', '#8dd1e1', '#ffc658', '#d0ed57'
  ];

  // Define proper types for the tooltip props
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      unit?: string;
      payload: {
        description?: string;
      };
    }>;
    label?: string;
  }

  const CustomizedTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="text-sm font-bold">{`${payload[0].name}: ${payload[0].value}${payload[0].unit || ''}`}</p>
          {payload[0].payload.description && (
            <p className="text-xs text-gray-600 mt-1">{payload[0].payload.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-8">低代碼/無代碼市場趨勢與採用情況</h2>
      
      <div className="mb-12">
        <h3 className="text-lg font-bold mb-4">全球低代碼/無代碼市場規模預測 (2020-2027)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={marketGrowthData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis 
              tickFormatter={(value: number) => `$${value}B`} 
              label={isMobile ? undefined : { value: '市場規模 (十億美元)', angle: -90, position: 'insideLeft', offset: 0 }} 
            />
            <Tooltip formatter={(value: number) => [`$${value}B`, '市場規模']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="全球市場規模" 
              stroke="#4C9AFF" 
              strokeWidth={2}
              activeDot={{ r: 8 }} 
              dot={(props) => {
                if (props.payload.projected) {
                  return (
                    <svg x={props.cx - 5} y={props.cy - 5} width={10} height={10} fill="#4C9AFF" viewBox="0 0 10 10">
                      <circle cx="5" cy="5" r="5" strokeWidth="0" fill="#fac515" />
                    </svg>
                  );
                }
                return (
                  <svg x={props.cx - 5} y={props.cy - 5} width={10} height={10} fill="#4C9AFF" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" strokeWidth="0" />
                  </svg>
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-center text-sm text-gray-600 mt-2">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1"></span> 黃色點表示預測數據
        </div>
      </div>

      {/* Changed from grid with 2 columns to vertical stack */}
      <div className="grid grid-cols-1 gap-12 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-4">低代碼/無代碼平台行業採用分佈</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryAdoptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={isMobile ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => isMobile 
                    ? `${(percent * 100).toFixed(0)}%` 
                    : `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {industryAdoptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomizedTooltip />} />
                <Legend layout={isMobile ? "horizontal" : "vertical"} align={isMobile ? "center" : "right"} verticalAlign={isMobile ? "bottom" : "middle"} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">企業選擇低代碼/無代碼平台的主要原因</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={adoptionReasonsData}
              layout="vertical"
              margin={isMobile 
                ? { top: 5, right: 30, left: 75, bottom: 5 } 
                : { top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <YAxis 
                dataKey={isMobile ? "shortName" : "name"} 
                type="category" 
                width={isMobile ? 70 : 140}
                tick={{ fontSize: isMobile ? 11 : 14 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, '企業佔比']} 
                labelFormatter={(label) => {
                  // 在移動版中顯示完整名稱
                  if (isMobile) {
                    const fullItem = adoptionReasonsData.find(item => item.shortName === label);
                    return fullItem ? fullItem.name : label;
                  }
                  return label;
                }}
              />
              <Bar dataKey="value" name="企業佔比" fill="#00C49F" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-12 overflow-hidden">
        <h3 className="text-lg font-bold mb-4">各應用領域專業人才成長預測 (2025年比2023年)</h3>
        <div className="overflow-x-auto -mx-4 px-4"> {/* 負邊距技巧允許表格在小屏幕上水平滾動 */}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">應用領域</th>
                <th className="p-2 border border-gray-300">專業人才需求增長</th>
                <th className="p-2 border border-gray-300">平均時薪增長</th>
                <th className="p-2 border border-gray-300">市場競爭程度</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">MVP與快速原型開發</td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-32 rounded"></div>
                    <span className="ml-2">+85%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-24 rounded"></div>
                    <span className="ml-2">+40%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-center">中等</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border border-gray-300 font-medium">企業應用與流程自動化</td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-40 rounded"></div>
                    <span className="ml-2">+110%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-28 rounded"></div>
                    <span className="ml-2">+55%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-center">低</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">內部工具與管理後台</td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-28 rounded"></div>
                    <span className="ml-2">+75%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-20 rounded"></div>
                    <span className="ml-2">+35%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-center">中等</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border border-gray-300 font-medium">行動應用與跨平台部署</td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-24 rounded"></div>
                    <span className="ml-2">+65%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-16 rounded"></div>
                    <span className="ml-2">+30%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-center">高</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">電商與客戶關係管理(CRM)</td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-20 rounded"></div>
                    <span className="ml-2">+50%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-12 rounded"></div>
                    <span className="ml-2">+25%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-center">高</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border border-gray-300 font-medium">數據分析與儀表板</td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-16 rounded"></div>
                    <span className="ml-2">+45%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex items-center">
                    <div className="bg-green-500 h-4 w-12 rounded"></div>
                    <span className="ml-2">+20%</span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-center">中等</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          資料來源：整合多份市場報告及行業調查數據
        </div>
      </div>
    </div>
  );
};

export default MarketTrendsAndAdoption;
