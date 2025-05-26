'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register all Chart.js components and plugins
Chart.register(...registerables, ChartDataLabels, annotationPlugin);

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

const MarketTrendsAndAdoption = () => {
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  
  const lineChartInstance = useRef<Chart | null>(null);
  const pieChartInstance = useRef<Chart | null>(null);
  const barChartInstance = useRef<Chart | null>(null);
  
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

  // 初始化和更新折線圖
  useEffect(() => {
    if (!lineChartRef.current) return;

    // 如果已經有圖表實例，則銷毀它
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }

    const ctx = lineChartRef.current.getContext('2d');
    if (!ctx) return;

    // 準備數據
    const years = marketGrowthData.map(item => item.year);
    const values = marketGrowthData.map(item => item.value);
    const isProjected = marketGrowthData.map(item => item.projected || false);

    // 創建新的圖表實例
    lineChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: '全球市場規模',
            data: values,
            borderColor: '#4C9AFF',
            backgroundColor: 'rgba(76, 154, 255, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: (context) => {
              const index = context.dataIndex;
              return isProjected[index] ? '#fac515' : '#4C9AFF';
            },
            pointRadius: 5,
            pointHoverRadius: 7,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                const value = context.raw as number;
                return `市場規模: $${value}B`;
              },
              title: function(tooltipItems) {
                return `${tooltipItems[0].label}年`;
              },
              footer: function(tooltipItems) {
                const index = tooltipItems[0].dataIndex;
                return isProjected[index] ? '(預測數據)' : '';
              }
            }
          },
          legend: {
            position: 'top',
          },
          datalabels: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: true
            },
            title: {
              display: true,
              text: '年份'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true
            },
            ticks: {
              callback: function(value) {
                return '$' + value + 'B';
              }
            },
            title: {
              display: !isMobile,
              text: '市場規模 (十億美元)',
              font: {
                size: 12
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        animation: {
          duration: 1500
        }
      }
    });

    return () => {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
    };
  }, [isMobile]); // 當移動設備狀態變化時重新創建圖表

  // 初始化和更新餅圖
  useEffect(() => {
    if (!pieChartRef.current) return;

    // 如果已經有圖表實例，則銷毀它
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }

    const ctx = pieChartRef.current.getContext('2d');
    if (!ctx) return;

    // 準備數據
    const labels = industryAdoptionData.map(item => item.name);
    const values = industryAdoptionData.map(item => item.value);
    const colors = industryAdoptionData.map((_, index) => COLORS[index % COLORS.length]);

    // 創建新的圖表實例
    pieChartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderColor: colors.map(color => color),
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number;
                const total = (context.chart.data.datasets[0].data.reduce((sum: number, val) => sum + (val as number), 0) as number);
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          },
          legend: {
            position: 'top' as const,
            labels: {
              boxWidth: 15,
              padding: 15,
              font: {
                size: isMobile ? 10 : 12
              }
            }
          },
          datalabels: {
            display: true,
            formatter: (value, context) => {
              const total = (context.chart.data.datasets[0].data.reduce((sum: number, val) => sum + (val as number), 0) as number);
              const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${percentage}%`;
            },
            color: '#fff',
            font: {
              weight: 'bold' as const,
              size: 12
            },
            textAlign: 'center' as const,
          }
        },
        layout: {
          padding: {
            top: 10,
            right: 10,
            bottom: 20,
            left: 10
          }
        },
        animation: {
          duration: 1500
        }
      }
    });

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [isMobile]);

  // 初始化和更新條形圖
  useEffect(() => {
    if (!barChartRef.current) return;

    // 如果已經有圖表實例，則銷毀它
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }

    const ctx = barChartRef.current.getContext('2d');
    if (!ctx) return;

    // 準備數據
    const labels = adoptionReasonsData.map(item => isMobile ? item.shortName : item.name);
    const values = adoptionReasonsData.map(item => item.value);
    const fullNames = adoptionReasonsData.map(item => item.name);

    // 創建新的圖表實例
    barChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '企業佔比',
            data: values,
            backgroundColor: '#00C49F',
            barThickness: 20,
            borderWidth: 1,
            borderColor: '#00A78D',
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return `企業佔比: ${value}%`;
              },
              title: (tooltipItems) => {
                // 在移動版本中顯示完整名稱
                if (isMobile) {
                  const index = tooltipItems[0].dataIndex;
                  return fullNames[index];
                }
                return tooltipItems[0].label;
              }
            }
          },
          legend: {
            display: false
          },
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end',
            formatter: function(value) {
              return value + '%';
            },
            color: '#333',
            font: {
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              display: true
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: isMobile ? 11 : 14
              }
            }
          }
        },
        layout: {
          padding: {
            top: 10,
            right: 30,
            bottom: 10,
            left: isMobile ? 10 : 20
          }
        },
        animation: {
          duration: 1500
        }
      }
    });

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [isMobile]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-8">低代碼/無代碼市場趨勢與採用情況</h2>
      
      <div className="mb-12">
        <h3 className="text-lg font-bold mb-4">全球低代碼/無代碼市場規模預測 (2020-2027)</h3>
        <div style={{ height: '300px', position: 'relative' }}>
          <canvas ref={lineChartRef}></canvas>
        </div>
        <div className="text-center text-sm text-gray-600 mt-2">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1"></span> 黃色點表示預測數據
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-4">低代碼/無代碼平台行業採用分佈</h3>
          <div style={{ height: '320px', position: 'relative' }}>
            <canvas ref={pieChartRef}></canvas>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">企業選擇低代碼/無代碼平台的主要原因</h3>
          <div style={{ height: '300px', position: 'relative' }}>
            <canvas ref={barChartRef}></canvas>
          </div>
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
