"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowDown } from "lucide-react"

const ProjectFlowChart = () => {
  const phases = [
    {
      title: "第一階段",
      color: "bg-blue-500",
      textColor: "text-white",
      badgeVariant: "default" as const,
      steps: ["需求分析", "技術選型", "架構設計", "專案結構"],
    },
    {
      title: "第二階段",
      color: "bg-red-500",
      textColor: "text-white",
      badgeVariant: "destructive" as const,
      steps: ["資料庫設計", "API 端點", "業務邏輯", "測試用例"],
    },
    {
      title: "第三階段",
      color: "bg-green-500",
      textColor: "text-white",
      badgeVariant: "default" as const,
      steps: ["單元測試", "API測試", "效能測試", "安全測試"],
    },
    {
      title: "第四階段",
      color: "bg-yellow-500",
      textColor: "text-black",
      badgeVariant: "secondary" as const,
      steps: ["CI/CD 配置", "容器化", "雲端部署", "監控日誌"],
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="relative">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="relative">
            {/* Phase Content */}
            <div className="space-y-4 py-6">
              {/* Phase Title */}
              <div className="text-center">
                <Badge variant={phase.badgeVariant} className="text-lg px-4 py-2">
                  {phase.title}
                </Badge>
              </div>

              {/* Phase Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {phase.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="relative">
                    <Card className="w-full">
                      <CardContent className="p-4">
                        <div
                          className={`${phase.color} ${phase.textColor} rounded-lg p-3 text-center font-medium text-sm`}
                        >
                          {step}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Arrow between steps (not after last step) */}
                    {stepIndex < phase.steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                        <div className="bg-white rounded-full p-1">
                          <ArrowRight className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                    )}

                    {/* Mobile: Arrow below each step except last */}
                    {stepIndex < phase.steps.length - 1 && (
                      <div className="md:hidden flex justify-center py-2">
                        <ArrowDown className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Curved connector to next phase */}
            {phaseIndex < phases.length - 1 && (
              <div className="relative h-24 w-full">
                {/* Desktop curved connector */}
                <div className="hidden md:block absolute inset-0">
                  <svg width="100%" height="100%" viewBox="0 0 400 150" className="overflow-visible">
                    <defs>
                      <marker
                        id={`arrowhead-${phaseIndex}`}
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                      </marker>
                    </defs>
                    <path
                      d="M 690 10 L 690 75 L -270 75 L -270 140"
                      stroke="#6b7280"
                      strokeWidth="2.5"
                      fill="none"
                      markerEnd={`url(#arrowhead-${phaseIndex})`}
                    />
                  </svg>
                </div>

                {/* Mobile simple connector */}
                <div className="md:hidden flex justify-center items-center h-full">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-px h-6 bg-gray-300"></div>
                    <ArrowDown className="h-5 w-5 text-gray-500" />
                    <div className="w-px h-6 bg-gray-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile optimization note */}
      <div className="text-xs text-gray-500 text-center mt-6 md:hidden">在手機上垂直顯示流程</div>
    </div>
  )
}

export default ProjectFlowChart