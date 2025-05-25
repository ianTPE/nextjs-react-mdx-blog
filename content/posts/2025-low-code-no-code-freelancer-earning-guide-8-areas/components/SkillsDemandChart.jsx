'use client'

import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function SkillsDemandChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Bubble邏輯設計', 'Retool後台搭建', 'Webflow開發', 'Airtable自動化', '其他平台'],
        datasets: [{
          data: [70, 60, 45, 35, 25],
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#ffce56',
            '#4bc0c0',
            '#9966ff'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': 年增長 ' + context.parsed + '%'
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
      <h3 className="text-xl font-bold text-center mb-2">2025年最熱門低代碼技能需求</h3>
      <p className="text-sm text-gray-600 text-center mb-4">基於Upwork職位增長率分析</p>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm">🔥 Bubble邏輯設計需求年增長70%，成為最熱門技能</p>
      </div>
    </div>
  )
}
