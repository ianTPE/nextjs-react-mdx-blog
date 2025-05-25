'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function IncomeProgressionChart() {
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
        labels: ['初級 (0-6個月)', '中級 (6-12個月)', '高級 (12個月+)', '專家級 (24個月+)'],
        datasets: [{
          label: '最低時薪',
          data: [20, 40, 80, 100],
          backgroundColor: 'rgba(0, 123, 255, 0.6)',
          borderColor: '#007bff',
          borderWidth: 1
        }, {
          label: '最高時薪',
          data: [40, 80, 150, 200],
          backgroundColor: 'rgba(40, 167, 69, 0.6)',
          borderColor: '#28a745',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y + '/小時'
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value
              }
            }
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
      <h3 className="text-xl font-bold text-center mb-2">不同經驗階段的收入潛力</h3>
      <p className="text-sm text-gray-600 text-center mb-4">低代碼開發者時薪範圍（美元）</p>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm">💸 資深開發者時薪可達$150+，遠高於傳統自由職業</p>
      </div>
    </div>
  )
}
