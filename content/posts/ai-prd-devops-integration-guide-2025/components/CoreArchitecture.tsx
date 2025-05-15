"use client";

import React from 'react';

const CoreArchitecture = () => (
  <div className="w-full p-6 bg-white rounded-lg shadow-lg mb-8">
    <h3 className="text-xl font-bold mb-4 text-center">AI + PRD + DevOps 核心架構</h3>
    <div className="relative w-full max-w-4xl mx-auto">
      <svg viewBox="0 0 800 400" className="w-full">
        {/* 背景裝飾 */}
        <defs>
          <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* 中心圓形 */}
        <circle cx="400" cy="200" r="80" fill="url(#gradientBg)" stroke="#6366f1" strokeWidth="3" filter="url(#shadow)" />
        <text x="400" y="190" textAnchor="middle" className="text-lg font-bold">AI 引擎</text>
        <text x="400" y="210" textAnchor="middle" className="text-sm">智能決策核心</text>
        
        {/* 三個主要組件 */}
        {/* PRD 組件 */}
        <rect x="50" y="150" width="160" height="100" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" filter="url(#shadow)" />
        <text x="130" y="185" textAnchor="middle" className="text-base font-semibold">智能 PRD</text>
        <text x="130" y="205" textAnchor="middle" className="text-sm">需求自動生成</text>
        <text x="130" y="225" textAnchor="middle" className="text-sm">優先級預測</text>
        
        {/* DevOps 組件 */}
        <rect x="590" y="150" width="160" height="100" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" filter="url(#shadow)" />
        <text x="670" y="185" textAnchor="middle" className="text-base font-semibold">DevOps 自動化</text>
        <text x="670" y="205" textAnchor="middle" className="text-sm">CI/CD 優化</text>
        <text x="670" y="225" textAnchor="middle" className="text-sm">智能部署</text>
        
        {/* 運營數據 組件 */}
        <rect x="320" y="300" width="160" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" filter="url(#shadow)" />
        <text x="400" y="330" textAnchor="middle" className="text-base font-semibold">運營數據</text>
        <text x="400" y="350" textAnchor="middle" className="text-sm">性能指標反饋</text>
        
        {/* 箭頭連接 */}
        <path d="M 210 200 Q 300 150 320 200" fill="none" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <path d="M 480 200 Q 500 150 590 200" fill="none" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <path d="M 670 250 Q 600 300 480 340" fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <path d="M 320 340 Q 200 300 130 250" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
        
        {/* 箭頭定義 */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
          </marker>
        </defs>
        
        {/* 流程標籤 */}
        <text x="265" y="140" textAnchor="middle" className="text-sm font-medium">需求分析</text>
        <text x="535" y="140" textAnchor="middle" className="text-sm font-medium">自動交付</text>
        <text x="580" y="310" textAnchor="middle" className="text-sm font-medium">數據收集</text>
        <text x="220" y="310" textAnchor="middle" className="text-sm font-medium">模型優化</text>
      </svg>
    </div>
  </div>
);

export default CoreArchitecture;