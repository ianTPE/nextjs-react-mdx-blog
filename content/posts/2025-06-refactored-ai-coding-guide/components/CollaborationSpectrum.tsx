"use client";

import React, { useState } from 'react';

interface Scenario {
  id: string;
  title: string;
  phase: string;
  human: {
    role: string;
    tasks: string[];
    dominance: number; // 0-100
  };
  ai: {
    role: string;
    tasks: string[];
    dominance: number; // 0-100
  };
  color: string;
  bgGradient: string;
}

const CollaborationSpectrum: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string>('scenario1');

  const scenarios: Scenario[] = [
    {
      id: 'scenario1',
      title: '創意構思階段',
      phase: '構思',
      human: {
        role: '主導',
        tasks: ['概念創造', '價值判斷'],
        dominance: 75
      },
      ai: {
        role: '輔助',
        tasks: ['可行性分析', '資源評估'],
        dominance: 25
      },
      color: 'text-blue-600',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'scenario2',
      title: '實現執行階段',
      phase: '執行',
      human: {
        role: '監督',
        tasks: ['質量監督', '異常處理'],
        dominance: 30
      },
      ai: {
        role: '主導',
        tasks: ['代碼生成', '測試執行'],
        dominance: 70
      },
      color: 'text-purple-600',
      bgGradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'scenario3',
      title: '問題診斷階段',
      phase: '診斷',
      human: {
        role: '協同',
        tasks: ['直覺判斷', '經驗調用'],
        dominance: 50
      },
      ai: {
        role: '協同',
        tasks: ['數據分析', '模式識別'],
        dominance: 50
      },
      color: 'text-green-600',
      bgGradient: 'from-green-500 to-green-600'
    }
  ];

  const currentScenario = scenarios.find(s => s.id === activeScenario) || scenarios[0];

  return (
    <div className="w-full max-w-6xl mx-auto my-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">人機協作模式光譜</h3>
        <p className="text-gray-600">動態主導權轉移機制</p>
      </div>

      {/* Spectrum Visualization */}
      <div className="mb-8">
        <div className="relative">
          {/* Spectrum Bar */}
          <div className="h-6 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full shadow-inner mb-4"></div>
          
          {/* Labels */}
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              人類主導
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              協同決策
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              AI主導
            </span>
          </div>

          {/* Current Position Indicator */}
          <div 
            className="absolute top-0 w-4 h-6 bg-white border-2 border-gray-800 rounded-full shadow-lg transform -translate-x-2 transition-all duration-500"
            style={{ 
              left: `${currentScenario.human.dominance > currentScenario.ai.dominance 
                ? (100 - currentScenario.human.dominance) 
                : currentScenario.ai.dominance}%` 
            }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {currentScenario.title}
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setActiveScenario(scenario.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeScenario === scenario.id
                ? `bg-gradient-to-r ${scenario.bgGradient} text-white shadow-lg scale-105`
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            情境{scenarios.indexOf(scenario) + 1}：{scenario.title}
          </button>
        ))}
      </div>

      {/* Scenario Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Human Side */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-200">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">人類角色</h4>
                <div className="flex items-center gap-2">
                  <span className="text-blue-100">主導權：</span>
                  <span className="font-bold">{currentScenario.human.dominance}%</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {currentScenario.human.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${currentScenario.human.dominance}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                核心職責
              </h5>
              {currentScenario.human.tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Side */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-200">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">AI角色</h4>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-100">主導權：</span>
                  <span className="font-bold">{currentScenario.ai.dominance}%</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {currentScenario.ai.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${currentScenario.ai.dominance}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                核心職責
              </h5>
              {currentScenario.ai.tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-emerald-50 rounded-lg">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Balance Indicator */}
      <div className="mt-6 p-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">協作平衡度</div>
            <div className="flex items-center gap-2">
              {currentScenario.human.dominance === currentScenario.ai.dominance ? (
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <span>⚖️</span>
                  完美平衡
                </span>
              ) : currentScenario.human.dominance > currentScenario.ai.dominance ? (
                <span className="text-blue-600 font-bold flex items-center gap-1">
                  <span>👤</span>
                  人類主導 ({currentScenario.human.dominance - currentScenario.ai.dominance}%)
                </span>
              ) : (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span>🤖</span>
                  AI主導 ({currentScenario.ai.dominance - currentScenario.human.dominance}%)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800 text-center">
          <span className="font-semibold">💡 關鍵洞察：</span>
          未來的人機協作不是固定分工，而是根據情境動態調整主導權，實現最佳化的認知資源配置。
        </p>
      </div>
    </div>
  );
};

export default CollaborationSpectrum;