"use client";

import React from 'react';

const CognitiveArchaeology: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-8 p-6 bg-gradient-to-br from-stone-50 to-amber-50 rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full border border-amber-200">
            <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">🏛️</span>
            </div>
            <h3 className="text-lg font-bold text-amber-800">[認知考古] WebSocket聊天室架構決策</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 問題界定 */}
          <div className="bg-white rounded-lg border border-red-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">📋</span>
                </div>
                <h4 className="font-bold text-lg">問題界定</h4>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-red-700">原始需求：</span>
                  <span className="text-gray-700">10萬併發用戶</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-red-700">技術約束：</span>
                  <span className="text-gray-700">團隊對Kubernetes不熟悉</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-red-700">時間約束：</span>
                  <span className="text-gray-700">3個月內上線</span>
                </div>
              </div>
            </div>
          </div>

          {/* 方案演進 */}
          <div className="bg-white rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">🔄</span>
                </div>
                <h4 className="font-bold text-lg">方案演進</h4>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <div>
                  <div className="font-semibold text-blue-700">Claude生成：</div>
                  <div className="text-gray-700 text-sm">事件驅動架構（理想狀態）</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 text-xs font-bold">2</span>
                </div>
                <div>
                  <div className="font-semibold text-orange-700">現實調整：</div>
                  <div className="text-gray-700 text-sm">改用Redis Cluster（團隊能力匹配）</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs font-bold">3</span>
                </div>
                <div>
                  <div className="font-semibold text-green-700">Aider實現：</div>
                  <div className="text-gray-700 text-sm">模組化設計保持可擴展性</div>
                </div>
              </div>
            </div>
          </div>

          {/* 知識盲點與解決 */}
          <div className="bg-white rounded-lg border border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">🔍</span>
                </div>
                <h4 className="font-bold text-lg">知識盲點與解決</h4>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-emerald-200 rounded-full"></div>
                  <span className="font-semibold text-emerald-800">Redis分片機制困惑</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-600">→ Codex解釋</span>
                  <span className="text-emerald-600">→ 手寫測試驗證</span>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-emerald-200 rounded-full"></div>
                  <span className="font-semibold text-emerald-800">心跳機制設計困惑</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-600">→ Codex情境化解釋</span>
                  <span className="text-emerald-600">→ 引入開源方案</span>
                </div>
              </div>
            </div>
          </div>

          {/* 風險預警 */}
          <div className="bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">⚠️</span>
                </div>
                <h4 className="font-bold text-lg">風險預警</h4>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-yellow-800">Redis單點故障風險</span>
                </div>
                <div className="text-sm text-yellow-700">
                  → 計畫引入哨兵模式
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-yellow-800">內存使用量估算</span>
                </div>
                <div className="text-sm text-yellow-700">
                  → 需要壓力測試驗證
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-6 p-4 bg-stone-100 rounded-lg border border-stone-200">
          <p className="text-sm text-stone-700 text-center italic">
            這種記錄不是為了滿足管理需求，而是為了在下次遇到類似問題時能快速調用過往經驗。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CognitiveArchaeology;