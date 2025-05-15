"use client";

import React from 'react';

const LinearCoreArchitecture: React.FC = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4 text-center">AI + PRD + DevOps 核心架構</h3>
      <div className="relative w-full max-w-4xl mx-auto overflow-x-auto">
        <svg viewBox="0 0 800 200" className="w-full">
          {/* 背景和漸變定義 */}
          <defs>
            <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
            </marker>
          </defs>
          
          {/* 主要流程框 */}
          <rect x="50" y="50" width="140" height="60" rx="8" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" />
          <text x="120" y="85" textAnchor="middle" className="text-base font-medium">用戶數據</text>
          
          <rect x="240" y="50" width="140" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <text x="310" y="85" textAnchor="middle" className="text-base font-medium">AI 分析引擎</text>
          
          <rect x="430" y="50" width="140" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
          <text x="500" y="85" textAnchor="middle" className="text-base font-medium">智能 PRD</text>
          
          <rect x="620" y="50" width="140" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="690" y="85" textAnchor="middle" className="text-base font-medium">DevOps 自動化</text>
          
          {/* 底部反饋框 */}
          <rect x="240" y="140" width="330" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
          <text x="405" y="165" textAnchor="middle" className="text-base font-medium">理營數據反饋</text>
          
          {/* 前向箭頭 */}
          <line x1="190" y1="80" x2="230" y2="80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="380" y1="80" x2="420" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="570" y1="80" x2="610" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* 反饋箭頭 */}
          <path d="M 120 110 L 120 140 L 230 140" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" />
          <path d="M 580 140 L 690 140 L 690 110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default LinearCoreArchitecture;
