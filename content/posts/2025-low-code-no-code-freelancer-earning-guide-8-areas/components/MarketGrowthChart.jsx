'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function MarketGrowthChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2019', '2021', '2023', '2025', '2027', '2030'],
        datasets: [{
          label: '市場規模',
          data: [10, 24.83, 45.67, 65, 120, 187],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#007bff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return '市場規模: $' + context.parsed.y + 'B'
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value + 'B'
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
      <h3 className="text-xl font-bold text-center mb-2">低代碼市場規模爆炸性增長</h3>
      <p className="text-sm text-gray-600 text-center mb-4">2019-2030年全球市場規模預測（單位：十億美元）</p>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm">📈 年複合增長率高達31%，預計2030年將達到1,870億美元</p>
      </div>
    </div>
  )
}
