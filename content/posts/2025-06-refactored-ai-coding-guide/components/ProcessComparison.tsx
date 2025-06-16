"use client";

import React, { useState } from 'react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface ProcessMode {
  title: string;
  subtitle: string;
  theme: string;
  bgGradient: string;
  steps: ProcessStep[];
}

const ProcessComparison: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const processes: ProcessMode[] = [
    {
      title: "傳統模式",
      subtitle: "單腦運算的線性思維",
      theme: "text-slate-700",
      bgGradient: "from-slate-500 to-gray-600",
      steps: [
        {
          id: "traditional-1",
          title: "問題",
          description: "遭遇技術挑戰",
          icon: "❓",
          color: "text-red-600",
          bgColor: "bg-red-100"
        },
        {
          id: "traditional-2", 
          title: "思考",
          description: "個人腦力運算",
          icon: "🤔",
          color: "text-orange-600",
          bgColor: "bg-orange-100"
        },
        {
          id: "traditional-3",
          title: "解決方案",
          description: "單一方案輸出",
          icon: "💡",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100"
        },
        {
          id: "traditional-4",
          title: "實現",
          description: "直接執行方案",
          icon: "⚙️",
          color: "text-slate-600",
          bgColor: "bg-slate-100"
        }
      ]
    },
    {
      title: "共生模式",
      subtitle: "人機協同的分散式認知",
      theme: "text-blue-700",
      bgGradient: "from-blue-500 to-purple-600",
      steps: [
        {
          id: "symbiotic-1",
          title: "問題",
          description: "遭遇技術挑戰",
          icon: "❓",
          color: "text-red-600",
          bgColor: "bg-red-100"
        },
        {
          id: "symbiotic-2",
          title: "人機協同思考",
          description: "分散式認知推理",
          icon: "🤝",
          color: "text-blue-600",
          bgColor: "bg-blue-100"
        },
        {
          id: "symbiotic-3",
          title: "多方案評估",
          description: "並行方案比較",
          icon: "📊",
          color: "text-purple-600",
          bgColor: "bg-purple-100"
        },
        {
          id: "symbiotic-4",
          title: "最佳化實現",
          description: "動態調整執行",
          icon: "🚀",
          color: "text-green-600",
          bgColor: "bg-green-100"
        }
      ]
    }
  ];

  const renderArrow = (index: number, total: number, theme: string) => {
    if (index === total - 1) return null;
    
    return (
      <div className="flex items-center justify-center mx-2">
        <div className={`w-8 h-0.5 bg-gradient-to-r ${theme === 'text-slate-700' ? 'from-slate-400 to-slate-500' : 'from-blue-400 to-purple-500'} relative`}>
          <div className={`absolute right-0 top-0 w-0 h-0 border-l-4 ${theme === 'text-slate-700' ? 'border-l-slate-500' : 'border-l-purple-500'} border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1 -translate-y-1`}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-8 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">認知模式進化對比</h3>
        <p className="text-gray-600">從單腦運算到人機共生的智慧革命</p>
      </div>

      {/* Process Comparison */}
      <div className="space-y-8">
        {processes.map((process, processIndex) => (
          <div key={process.title} className="relative">
            {/* Process Header */}
            <div className={`bg-gradient-to-r ${process.bgGradient} text-white p-4 rounded-t-xl`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">{processIndex === 0 ? '🧠' : '🔗'}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl">{process.title}</h4>
                  <p className="text-sm opacity-90">{process.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-b-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {process.steps.map((step, stepIndex) => (
                  <React.Fragment key={step.id}>
                    <div 
                      className="flex flex-col items-center group cursor-pointer"
                      onMouseEnter={() => setHoveredStep(step.id)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {/* Step Circle */}
                      <div className={`relative w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 ${hoveredStep === step.id ? 'scale-110 shadow-xl' : ''}`}>
                        <span className="text-2xl">{step.icon}</span>
                        
                        {/* Pulse Animation for Active Step */}
                        {hoveredStep === step.id && (
                          <div className={`absolute inset-0 ${step.bgColor} rounded-full animate-ping opacity-30`}></div>
                        )}
                        
                        {/* Step Number */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{stepIndex + 1}</span>
                        </div>
                      </div>

                      {/* Step Info */}
                      <div className="mt-4 text-center max-w-32">
                        <div className={`font-bold text-sm ${step.color} mb-1`}>{step.title}</div>
                        <div className="text-xs text-gray-500 leading-tight">{step.description}</div>
                      </div>

                      {/* Hover Detail Card */}
                      {hoveredStep === step.id && (
                        <div className="absolute top-24 z-10 bg-white border border-gray-200 rounded-lg p-3 shadow-xl min-w-48">
                          <div className="text-sm">
                            <div className={`font-bold ${step.color} mb-1`}>{step.title}</div>
                            <div className="text-gray-700">{step.description}</div>
                            {step.id.includes('symbiotic') && (
                              <div className="mt-2 text-xs text-blue-600 bg-blue-50 rounded p-2">
                                💡 採用分散式認知網絡
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    {renderArrow(stepIndex, process.steps.length, process.theme)}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Process Characteristics */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>⚡</span>
                  {processIndex === 0 ? '特點' : '優勢'}
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {processIndex === 0 ? (
                    <>
                      <li>• 依賴個人經驗和知識</li>
                      <li>• 線性思考過程</li>
                      <li>• 單一解決方案</li>
                    </>
                  ) : (
                    <>
                      <li>• 人機智慧互補</li>
                      <li>• 並行評估多種方案</li>
                      <li>• 動態最佳化過程</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>{processIndex === 0 ? '⚠️' : '🎯'}</span>
                  {processIndex === 0 ? '限制' : '創新點'}
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {processIndex === 0 ? (
                    <>
                      <li>• 受個人認知邊界限制</li>
                      <li>• 容易陷入思維定式</li>
                      <li>• 決策風險集中</li>
                    </>
                  ) : (
                    <>
                      <li>• 突破個體認知限制</li>
                      <li>• 風險分散式決策</li>
                      <li>• 持續學習與優化</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Insight */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl border border-indigo-200">
        <div className="text-center">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center justify-center gap-2">
            <span>🔄</span>
            關鍵變化
          </h4>
          <p className="text-indigo-700 text-sm leading-relaxed">
            共生模式的核心不在於替代人類思考，而在於<strong>擴展認知維度</strong>。
            從「我思故我在」進化到「我們思故我們在」，
            這是人類智慧進化史上的重要分水嶺。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessComparison;