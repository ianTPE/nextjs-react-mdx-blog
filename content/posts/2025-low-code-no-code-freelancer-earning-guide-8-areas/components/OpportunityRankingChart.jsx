'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function OpportunityRankingChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          '電商與會員平台',
          '內部工具與後台',
          '動態資料與表單',
          '行銷與品牌網站',
          '單頁應用與原型',
          '行動應用原型',
          '內容與部落格',
          '社區與會員站點'
        ],
        datasets: [{
          label: '機會評分',
          data: [95, 88, 82, 78, 72, 65, 58, 50],
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#ffce56',
            '#4bc0c0',
            '#9966ff',
            '#ff9f40',
            '#ff6384',
            '#c9cbcf'
          ],
          borderWidth: 0
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return '潛力評分: ' + context.parsed.x + '/100'
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-center mb-2">8大應用領域自由職業潛力評分</h3>
      <p className="text-sm text-gray-600 text-center mb-4">基於市場需求、項目預算、技術門檻綜合評估</p>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm">💰 電商與會員平台單項目預算最高，可達$15,000</p>
      </div>
    </div>
  )
}
