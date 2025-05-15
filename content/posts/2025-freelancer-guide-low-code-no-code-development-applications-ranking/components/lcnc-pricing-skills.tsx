'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components and plugins
Chart.register(...registerables, ChartDataLabels);

const PricingAndSkills = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const pricingData = [
    {
      category: 'MVP與快速原型開發',
      min: 3000,
      max: 15000,
      avg: 7500,
      color: '#4C9AFF',
      skills: ['界面設計', 'API整合', '原型設計', '用戶體驗', '市場驗證']
    },
    {
      category: '企業應用與流程自動化',
      min: 5000,
      max: 50000,
      avg: 20000,
      color: '#36B37E',
      skills: ['業務流程分析', 'API整合', '自動化規則設計', '數據處理', '系統整合']
    },
    {
      category: '內部工具與管理後台',
      min: 4000,
      max: 20000,
      avg: 10000,
      color: '#00B8D9',
      skills: ['數據模型設計', '工作流程設計', '權限管理', '表單設計', '數據可視化']
    },
    {
      category: '行動應用與跨平台部署',
      min: 5000,
      max: 25000,
      avg: 12000,
      color: '#6554C0',
      skills: ['響應式設計', '原生功能整合', '離線存儲', '推送通知', '跨平台兼容']
    },
    {
      category: '電商與客戶關係管理(CRM)',
      min: 6000,
      max: 30000,
      avg: 15000,
      color: '#FFAB00',
      skills: ['支付整合', '庫存管理', '客戶分析', '自動營銷流程', 'SEO優化']
    },
    {
      category: '數據分析與儀表板',
      min: 3000,
      max: 18000,
      avg: 8000,
      color: '#FF5630',
      skills: ['數據處理', '數據可視化', '報表設計', '數據分析', 'BI工具整合']
    }
  ];

  // 初始化和更新圖表
  useEffect(() => {
    if (!chartRef.current) return;

    // 如果已經有圖表實例，則銷毀它
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // 準備數據
    const categories = pricingData.map(item => item.category);
    const minValues = pricingData.map(item => item.min);
    const maxValues = pricingData.map(item => item.max);

    // 定義自定義工具提示
    const customTooltipHandler = (context: any) => {
      // 禁用 tooltip 的默認行為
      context.tooltip.options.enabled = false;

      const tooltipEl = document.getElementById('chartjs-tooltip');
      
      // 如果沒有找到元素，則創建一個
      if (!tooltipEl) {
        const div = document.createElement('div');
        div.id = 'chartjs-tooltip';
        div.style.opacity = '0';
        div.style.position = 'absolute';
        div.style.pointerEvents = 'none';
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.border = '1px solid #ddd';
        div.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        div.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(div);
      }

      const tooltipDiv = document.getElementById('chartjs-tooltip');
      if (!tooltipDiv) return;

      if (context.tooltip.opacity === 0) {
        tooltipDiv.style.opacity = '0';
        setActiveCategory(null);
        return;
      }

      const position = context.chart.canvas.getBoundingClientRect();
      const left = position.left + window.pageXOffset + context.tooltip.caretX;
      const top = position.top + window.pageYOffset + context.tooltip.caretY;

      // 顯示工具提示
      tooltipDiv.style.opacity = '1';
      tooltipDiv.style.left = left + 'px';
      tooltipDiv.style.top = top + 'px';

      if (!context.tooltip.dataPoints || context.tooltip.dataPoints.length === 0) return;

      const dataIndex = context.tooltip.dataPoints[0].dataIndex;
      const data = pricingData[dataIndex];
      setActiveCategory(data.category);

      // 設置工具提示的內容
      tooltipDiv.innerHTML = `
        <div>
          <p style="font-weight: bold; margin-bottom: 5px;">${data.category}</p>
          <p>價格範圍: $${data.min.toLocaleString()} - $${data.max.toLocaleString()}</p>
          <p>平均價格: $${data.avg.toLocaleString()}</p>
          <div style="margin-top: 10px;">
            <p style="font-weight: 600; margin-bottom: 5px;">核心技能要求:</p>
            <ul style="list-style-type: disc; margin-left: 15px;">
              ${data.skills.map(skill => `<li style="font-size: 0.875rem;">${skill}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    };

    // 創建新的圖表實例
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            label: '最低價格',
            data: minValues,
            backgroundColor: '#8884d8',
            opacity: 0.7,
            order: 2
          },
          {
            label: '最高價格',
            data: maxValues,
            backgroundColor: '#82ca9d',
            opacity: 0.7,
            order: 1
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: false, // 禁用默認工具提示
            external: customTooltipHandler
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 12
              }
            }
          },
          datalabels: {
            display: false // 關閉數據標籤顯示
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                yMin: 15000,
                yMax: 15000,
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  content: '高價值專案門檻',
                  enabled: true,
                  position: 'end',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'red',
                  font: {
                    weight: 'bold'
                  }
                }
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              callback: function(value, index) {
                // 限制文字長度或添加換行
                const label = categories[index];
                return label.length > 12 ? label.substring(0, 10) + '...' : label;
              },
              maxRotation: 45,
              minRotation: 45
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            },
            title: {
              display: true,
              text: '價格 (USD)',
              font: {
                size: 14
              }
            }
          }
        },
        animation: {
          duration: 1500
        },
        layout: {
          padding: {
            top: 20,
            right: 20,
            bottom: 40,
            left: 20
          }
        }
      }
    });

    // 清除函數
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const tooltipEl = document.getElementById('chartjs-tooltip');
      if (tooltipEl) {
        document.body.removeChild(tooltipEl);
      }
    };
  }, []); // 僅在組件掛載時運行一次

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-6">低代碼/無代碼應用領域專案價格範圍</h2>
      <div className="mb-10" style={{ height: '400px', position: 'relative' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-bold text-center mb-4">各領域所需技能與平台比較</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-300">應用領域</th>
                <th className="p-2 border border-gray-300">核心技能</th>
                <th className="p-2 border border-gray-300">推薦平台</th>
                <th className="p-2 border border-gray-300">入門難度</th>
              </tr>
            </thead>
            <tbody>
              <tr className={activeCategory === 'MVP與快速原型開發' ? 'bg-blue-50' : ''}>
                <td className="p-2 border border-gray-300 font-medium">MVP與快速原型開發</td>
                <td className="p-2 border border-gray-300">用戶界面設計、API整合、原型迭代</td>
                <td className="p-2 border border-gray-300">Bubble, Webflow, Softr</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐</td>
              </tr>
              <tr className={activeCategory === '企業應用與流程自動化' ? 'bg-blue-50' : 'bg-gray-50'}>
                <td className="p-2 border border-gray-300 font-medium">企業應用與流程自動化</td>
                <td className="p-2 border border-gray-300">業務流程分析、自動化規則設計、系統整合</td>
                <td className="p-2 border border-gray-300">Zapier, Make, OutSystems, Power Automate</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr className={activeCategory === '內部工具與管理後台' ? 'bg-blue-50' : ''}>
                <td className="p-2 border border-gray-300 font-medium">內部工具與管理後台</td>
                <td className="p-2 border border-gray-300">數據模型設計、工作流程設計、權限管理</td>
                <td className="p-2 border border-gray-300">Retool, Budibase, NocoBase</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr className={activeCategory === '行動應用與跨平台部署' ? 'bg-blue-50' : 'bg-gray-50'}>
                <td className="p-2 border border-gray-300 font-medium">行動應用與跨平台部署</td>
                <td className="p-2 border border-gray-300">響應式設計、原生功能整合、離線存儲</td>
                <td className="p-2 border border-gray-300">FlutterFlow, Adalo, Thunkable</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr className={activeCategory === '電商與客戶關係管理(CRM)' ? 'bg-blue-50' : ''}>
                <td className="p-2 border border-gray-300 font-medium">電商與客戶關係管理(CRM)</td>
                <td className="p-2 border border-gray-300">支付整合、庫存管理、客戶分析、自動營銷</td>
                <td className="p-2 border border-gray-300">Webflow+Foxy, Softr+Airtable, Jotform Store</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
              <tr className={activeCategory === '數據分析與儀表板' ? 'bg-blue-50' : 'bg-gray-50'}>
                <td className="p-2 border border-gray-300 font-medium">數據分析與儀表板</td>
                <td className="p-2 border border-gray-300">數據處理、可視化設計、報表設計</td>
                <td className="p-2 border border-gray-300">Airtable, Appsmith, Retool</td>
                <td className="p-2 border border-gray-300 text-center">⭐⭐⭐⭐</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          入門難度：⭐ = 最簡單，⭐⭐⭐⭐⭐ = 最複雜
        </div>
      </div>
    </div>
  );
};

export default PricingAndSkills;
