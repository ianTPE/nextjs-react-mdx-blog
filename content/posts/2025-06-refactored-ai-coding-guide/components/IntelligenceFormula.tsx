"use client";

import React, { useState, useEffect } from 'react';

interface Factor {
  id: string;
  name: string;
  description: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  color: string;
  icon: string;
}

const IntelligenceFormula: React.FC = () => {
  const [factors, setFactors] = useState<Factor[]>([
    {
      id: 'human',
      name: '人類直覺判斷',
      description: '基於經驗和洞察力的快速決策能力',
      value: 0.8,
      min: 0.1,
      max: 1.0,
      unit: '',
      color: 'blue',
      icon: '🧠'
    },
    {
      id: 'ai',
      name: 'AI生成能力',
      description: '機器學習模型的生成和分析能力',
      value: 0.9,
      min: 0.1,
      max: 1.0,
      unit: '',
      color: 'green',
      icon: '🤖'
    },
    {
      id: 'environment',
      name: '環境約束條件',
      description: '技術、資源、時間等外在限制因素',
      value: 0.7,
      min: 0.1,
      max: 1.0,
      unit: '',
      color: 'yellow',
      icon: '🌍'
    },
    {
      id: 'time',
      name: '時間動態係數',
      description: '時間壓力對決策品質的影響',
      value: 0.6,
      min: 0.1,
      max: 1.0,
      unit: '',
      color: 'purple',
      icon: '⏰'
    }
  ]);

  const [totalIntelligence, setTotalIntelligence] = useState<number>(0);

  useEffect(() => {
    const result = factors.reduce((acc, factor) => acc * factor.value, 1);
    setTotalIntelligence(result);
  }, [factors]);

  const updateFactor = (id: string, newValue: number) => {
    setFactors(prev => prev.map(factor => 
      factor.id === id ? { ...factor, value: newValue } : factor
    ));
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500',
        light: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-500',
        light: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200'
      },
      yellow: {
        bg: 'bg-yellow-500',
        light: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-200'
      },
      purple: {
        bg: 'bg-purple-500',
        light: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-200'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getIntelligenceLevel = (value: number) => {
    if (value >= 0.7) return { level: '優異', color: 'text-green-600', emoji: '🚀' };
    if (value >= 0.5) return { level: '良好', color: 'text-blue-600', emoji: '👍' };
    if (value >= 0.3) return { level: '中等', color: 'text-yellow-600', emoji: '⚖️' };
    return { level: '需改善', color: 'text-red-600', emoji: '⚠️' };
  };

  const intelligenceLevel = getIntelligenceLevel(totalIntelligence);

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">分佈式認知理論 3.0</h3>
        <p className="text-gray-600">智慧輸出的四要素複合函數</p>
      </div>

      {/* Formula Display */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-8 border border-gray-200">
        <div className="text-center">
          <div className="text-lg font-mono text-gray-700 mb-4 flex items-center justify-center flex-wrap gap-2">
            <span className="font-bold text-xl text-gray-800">智慧</span>
            <span className="text-2xl text-gray-500">=</span>
            {factors.map((factor, index) => (
              <React.Fragment key={factor.id}>
                <span className={`px-3 py-1 rounded-full ${getColorClasses(factor.color).light} ${getColorClasses(factor.color).text} font-semibold`}>
                  {factor.name}
                </span>
                {index < factors.length - 1 && <span className="text-xl text-gray-500">×</span>}
              </React.Fragment>
            ))}
          </div>
          
          {/* Result Display */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">{intelligenceLevel.emoji}</span>
              <div>
                <div className="text-sm text-gray-600">當前智慧輸出</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {(totalIntelligence * 100).toFixed(1)}%
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${intelligenceLevel.color}`}>
                    {intelligenceLevel.level}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {factors.map((factor) => {
          const colors = getColorClasses(factor.color);
          return (
            <div key={factor.id} className={`bg-white rounded-lg border ${colors.border} shadow-md overflow-hidden`}>
              <div className={`${colors.light} p-4 border-b ${colors.border}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center text-white text-lg`}>
                    {factor.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold ${colors.text}`}>{factor.name}</h4>
                    <p className="text-xs text-gray-600">{factor.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">影響係數</span>
                  <span className={`font-bold ${colors.text}`}>
                    {factor.value.toFixed(2)}
                  </span>
                </div>
                
                {/* Slider */}
                <div className="relative">
                  <input
                    type="range"
                    min={factor.min}
                    max={factor.max}
                    step={0.1}
                    value={factor.value}
                    onChange={(e) => updateFactor(factor.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, ${colors.bg} 0%, ${colors.bg} ${factor.value * 100}%, #e5e7eb ${factor.value * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>弱 ({factor.min})</span>
                    <span>強 ({factor.max})</span>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${colors.bg} h-3 rounded-full transition-all duration-300`}
                      style={{ width: `${factor.value * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analysis Section */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span>
          實時分析
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">關鍵洞察</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {totalIntelligence >= 0.7 ? (
                <>
                  <li>• 四個要素達到良好平衡</li>
                  <li>• 智慧輸出處於最佳狀態</li>
                  <li>• 適合承擔複雜技術挑戰</li>
                </>
              ) : totalIntelligence >= 0.5 ? (
                <>
                  <li>• 部分要素需要優化</li>
                  <li>• 可以處理中等複雜度任務</li>
                  <li>• 建議加強薄弱環節</li>
                </>
              ) : (
                <>
                  <li>• 多個要素需要改善</li>
                  <li>• 智慧輸出有限</li>
                  <li>• 建議重新配置資源</li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-700 mb-2">優化建議</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {factors
                .filter(f => f.value < 0.7)
                .slice(0, 3)
                .map(factor => (
                  <li key={factor.id}>
                    • 提升{factor.name}（當前 {(factor.value * 100).toFixed(0)}%）
                  </li>
                ))}
              {factors.filter(f => f.value < 0.7).length === 0 && (
                <li>• 所有要素都處於良好狀態！</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800 text-center">
          <span className="font-semibold">💡 核心理念：</span>
          現代程式開發的智慧輸出不再是線性疊加，而是四個要素的複合函數。當任何一個要素失衡，整個系統的智慧輸出都會急劇下降。
        </p>
      </div>
    </div>
  );
};

export default IntelligenceFormula;