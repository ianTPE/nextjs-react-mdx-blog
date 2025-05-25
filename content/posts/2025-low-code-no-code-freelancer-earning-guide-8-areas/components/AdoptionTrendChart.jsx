'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function AdoptionTrendChart() {
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
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [{
          label: '新應用採用低代碼比例',
          data: [25, 35, 45, 55, 65, 70, 75],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true
        }, {
          label: '公民開發者參與比例',
          data: [20, 30, 41, 50, 60, 70, 80],
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + '%'
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%'
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
      <h3 className="text-xl font-bold text-center mb-2">企業低代碼技術採用率趨勢</h3>
      <p className="text-sm text-gray-600 text-center mb-4">2020-2026年預測</p>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm">🚀 到2025年，70%的新應用將使用低代碼技術開發</p>
      </div>
    </div>
  )
}
