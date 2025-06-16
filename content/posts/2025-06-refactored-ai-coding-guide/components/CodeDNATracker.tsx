"use client";

import React, { useState } from 'react';

const CodeDNATracker: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl shadow-2xl overflow-hidden">
      {/* Header with DNA helix animation */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <div className="text-white text-lg">🧬</div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">[演化標記] 支付模塊策略模式實現</h3>
            <p className="text-green-100 text-sm">自解釋型代碼的 DNA 追蹤系統</p>
          </div>
        </div>
      </div>

      {/* DNA Metadata Tags */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span className="text-blue-300 font-medium">設計基因:</span>
            <span className="text-gray-300">Claude-Architecture-v3.2</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span className="text-purple-300 font-medium">實現變異:</span>
            <span className="text-gray-300">Aider-Refactor-20250616-1430</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-green-300 font-medium">概念溯源:</span>
            <span className="text-gray-300">Codex-Explanation-StrategyPattern-Basic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-yellow-300 font-medium">風險評級:</span>
            <span className="text-yellow-200">Medium (影響5個下游模組)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></span>
            <span className="text-red-300 font-medium">維護預警:</span>
            <span className="text-red-200">JWT密鑰將於2025-12-15過期</span>
          </div>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <div className="p-6 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
            <code>
{`class PaymentStrategy(metaclass=AutoEvolution):`}
            </code>
          </pre>
        </div>

        {/* Evolution Timeline */}
        <div className="px-6 pb-6">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 mb-4"
          >
            <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
            <span className="font-medium">查看進化軌跡與認知標記</span>
          </button>

          {isExpanded && (
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-4 backdrop-blur-sm">
              {/* Evolution Timeline */}
              <div>
                <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                  <span>📈</span>
                  進化軌跡
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      v1
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-300">單一PayPal整合</div>
                      <div className="text-blue-400 text-xs">(Claude設計)</div>
                    </div>
                  </div>
                  <div className="ml-4 w-0.5 h-4 bg-gray-600"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      v2
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-300">策略模式重構</div>
                      <div className="text-purple-400 text-xs">(Aider實施)</div>
                    </div>
                  </div>
                  <div className="ml-4 w-0.5 h-4 bg-gray-600"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      v3
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-300">新增LinePay支持</div>
                      <div className="text-green-400 text-xs">(Codex指導)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-4">
                <h4 className="text-orange-300 font-semibold mb-3 flex items-center gap-2">
                  <span>🧠</span>
                  認知標記
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Complexity Meter */}
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-300 text-sm mb-2">設計複雜度</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full" style={{width: '70%'}}></div>
                      </div>
                      <span className="text-yellow-400 text-sm font-bold">7/10</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">需要設計模式基礎</div>
                  </div>

                  {/* Maintenance Meter */}
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-300 text-sm mb-2">維護難度</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <span className="text-green-400 text-sm font-bold">4/10</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">結構清晰，易於擴展</div>
                  </div>

                  {/* Innovation Meter */}
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-gray-300 text-sm mb-2">創新程度</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="text-blue-400 text-sm font-bold">6/10</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">標準模式的創新應用</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-700 px-6 py-3 text-xs text-gray-400 border-t border-gray-600">
        <div className="flex items-center justify-between">
          <span>💡 這種「代碼 DNA」標記讓每個模組都攜帶完整的進化歷史信息</span>
          <span className="text-cyan-400">AutoEvolution v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default CodeDNATracker;