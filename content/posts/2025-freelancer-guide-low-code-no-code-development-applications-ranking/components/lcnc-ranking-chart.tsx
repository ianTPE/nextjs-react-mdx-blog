'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

// 天青色的十六進制代碼
const TIAN_QING_COLOR = '#88CCCA';

const data = [
  {
    name: 'MVP與快速原型開發',
    score: 90,
    description: '初創企業和創新項目對快速驗證概念的需求龐大',
    color: TIAN_QING_COLOR
  },
  {
    name: '企業應用與流程自動化',
    score: 85,
    description: '企業數位轉型推動大量流程自動化需求',
    color: TIAN_QING_COLOR
  },
  {
    name: '內部工具與管理後台',
    score: 75,
    description: '企業需要定制化內部系統提升效率',
    color: TIAN_QING_COLOR
  },
  {
    name: '行動應用與跨平台部署',
    score: 65,
    description: '行動應用需求持續但開發複雜度較高',
    color: TIAN_QING_COLOR
  },
  {
    name: '電商與客戶關係管理(CRM)',
    score: 60,
    description: '競爭激烈且通常需要長期合作關係',
    color: TIAN_QING_COLOR
  },
  {
    name: '數據分析與儀表板',
    score: 55,
    description: '企業通常傾向於內部處理敏感數據',
    color: TIAN_QING_COLOR
  }
];

// 為移動設備創建簡短的名稱
const getMobileName = (name: string) => {
  const nameMap: Record<string, string> = {
    'MVP與快速原型開發': 'MVP原型',
    '企業應用與流程自動化': '企業自動化',
    '內部工具與管理後台': '內部工具',
    '行動應用與跨平台部署': '行動應用',
    '電商與客戶關係管理(CRM)': '電商與CRM',
    '數據分析與儀表板': '數據分析'
  };
  return nameMap[name] || name;
};

const LcncRankingChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
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

  // 初始化和更新圖表
  useEffect(() => {
    if (!chartRef.current) return;

    // 如果已經有圖表實例，則銷毀它
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // 根據設備選擇適當的標籤
    const labels = data.map(item => isMobile ? getMobileName(item.name) : item.name);
    const scores = data.map(item => item.score);
    const colors = data.map(item => item.color);

    // 創建新的圖表實例
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '前景評分',
          data: scores,
          backgroundColor: colors,
          borderColor: colors.map(color => color),
          borderWidth: 1,
        }]
      },
      options: {
        indexAxis: 'y', // 確保條形圖是水平的
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            grid: {
              display: true,
              drawTicks: true,
            },
            ticks: {
              callback: function(value) {
                return value + '';
              }
            }
          },
          y: {
            grid: {
              display: false,
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function(context) {
                // 取得原始數據中的完整名稱
                const index = context[0].dataIndex;
                return data[index].name;
              },
              label: function(context) {
                // 顯示前景評分
                const score = context.raw as number;
                return `前景評分: ${score}/100`;
              },
              afterLabel: function(context) {
                // 顯示描述
                const index = context.dataIndex;
                return data[index].description;
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
              return value;
            },
            font: {
              weight: 'bold'
            }
          }
        },
        layout: {
          padding: {
            top: 20,
            right: 50,
            bottom: 5,
            left: isMobile ? 10 : 20
          }
        },
        animation: {
          duration: 1500
        }
      }
    });

    // 清除函數
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isMobile]); // 當移動設備狀態變化時重新創建圖表

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-6">低代碼/無代碼應用領域：自由工作者前景排名</h2>
      <div className="mb-8" style={{ height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="text-center text-sm text-gray-600">
        *評分基於市場需求、專案特性和自由工作適合度綜合評估
      </div>
    </div>
  );
};

export default LcncRankingChart;
