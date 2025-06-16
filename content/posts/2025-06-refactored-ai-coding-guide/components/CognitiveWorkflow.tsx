"use client";

import React from 'react';

const CognitiveWorkflow: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          認知工作流程
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          {/* Step 1: 認知模糊 */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-white rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">?</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-semibold text-gray-800 text-sm">認知模糊</div>
              <div className="text-xs text-gray-600 mt-1">混沌狀態</div>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-12 h-0.5 bg-gradient-to-r from-red-400 to-blue-500 relative">
              <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-blue-500 border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1 -translate-y-1"></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 font-medium">暴力切割</div>
          </div>

          {/* Step 2: Claude爆破 */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-white font-bold text-lg">C</div>
                <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4">
                <div className="w-full h-full bg-orange-400 rounded-full animate-bounce"></div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-semibold text-gray-800 text-sm">Claude爆破</div>
              <div className="text-xs text-gray-600 mt-1">架構生成</div>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 relative">
              <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-green-500 border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1 -translate-y-1"></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 font-medium">概念重構</div>
          </div>

          {/* Step 3: Codex解析 */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-white font-bold text-lg">&lt;/&gt;</div>
              </div>
              <div className="absolute top-0 right-0 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-semibold text-gray-800 text-sm">Codex解析</div>
              <div className="text-xs text-gray-600 mt-1">概念透鏡</div>
            </div>
          </div>

          {/* Arrow 3 */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-12 h-0.5 bg-gradient-to-r from-green-500 to-purple-500 relative">
              <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-purple-500 border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1 -translate-y-1"></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 font-medium">精準執行</div>
          </div>

          {/* Step 4: Aider精修 */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-white font-bold text-lg">A</div>
                <div className="absolute inset-2 border border-purple-300 rounded-full"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">✓</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-semibold text-gray-800 text-sm">Aider精修</div>
              <div className="text-xs text-gray-600 mt-1">意圖保真</div>
            </div>
          </div>
        </div>

        {/* Bottom description */}
        <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 text-center italic">
            從混沌到秩序的認知整理過程：Claude負責在概念混沌中開闢可能性，Codex將這些可能性轉化為可理解的知識圖譜，Aider則確保最終實現的精確性。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CognitiveWorkflow;