"use client";

import React from 'react';

const WorkflowReactFlow: React.FC = () => (
  <div className="w-full p-6 bg-white rounded-lg shadow-lg mb-8">
    <h3 className="text-xl font-bold mb-4 text-center">Aider + Claude Code 協同工作流程</h3>
    <div className="relative w-full max-w-6xl mx-auto overflow-x-auto">
      <svg viewBox="0 0 1200 800" className="w-full min-w-[800px]">
        {/* 背景装饰和定义 */}
        <defs>
          <linearGradient id="aiderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="claudeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ee5a52', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="combinedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2ecc71', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#27ae60', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="completeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f1c40f', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f39c12', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
          </marker>
          <marker id="greenArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#27ae60" />
          </marker>
          <marker id="redArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#e74c3c" />
          </marker>
        </defs>
        
        {/* 开始节点 */}
        <rect x="500" y="20" width="120" height="50" rx="8" fill="white" stroke="#1a202c" strokeWidth="2" filter="url(#shadow)" />
        <text x="560" y="40" textAnchor="middle" className="text-sm font-medium" fill="#1a202c">開始新專案</text>
        
        {/* 决策节点 */}
        <ellipse cx="560" cy="130" rx="60" ry="40" fill="#fff5f5" stroke="#e53e3e" strokeWidth="2" filter="url(#shadow)" />
        <text x="560" y="135" textAnchor="middle" className="text-sm font-medium" fill="#e53e3e">任務類型？</text>
        
        {/* Aider 路径 */}
        <rect x="50" y="250" width="130" height="50" rx="8" fill="url(#aiderGradient)" stroke="none" filter="url(#shadow)" />
        <text x="115" y="270" textAnchor="middle" className="text-sm font-medium" fill="white">使用 Aider.chat</text>
        
        <rect x="50" y="350" width="110" height="50" rx="8" fill="white" stroke="#667eea" strokeWidth="2" />
        <text x="105" y="375" textAnchor="middle" className="text-xs" fill="#667eea">多輪對話迭代</text>
        
        <rect x="50" y="450" width="110" height="50" rx="8" fill="white" stroke="#667eea" strokeWidth="2" />
        <text x="105" y="475" textAnchor="middle" className="text-xs" fill="#667eea">快速驗證想法</text>
        
        <ellipse cx="105" cy="570" rx="55" ry="30" fill="#fff5f5" stroke="#e53e3e" strokeWidth="2" />
        <text x="105" y="575" textAnchor="middle" className="text-xs" fill="#e53e3e">需要深度開發？</text>
        
        {/* Claude Code 路径 */}
        <rect x="450" y="250" width="140" height="50" rx="8" fill="url(#claudeGradient)" stroke="none" filter="url(#shadow)" />
        <text x="520" y="270" textAnchor="middle" className="text-sm font-medium" fill="white">使用 Claude Code</text>
        
        <rect x="450" y="350" width="120" height="50" rx="8" fill="white" stroke="#ff6b6b" strokeWidth="2" />
        <text x="510" y="375" textAnchor="middle" className="text-xs" fill="#ff6b6b">深度程式碼理解</text>
        
        <rect x="450" y="450" width="120" height="50" rx="8" fill="white" stroke="#ff6b6b" strokeWidth="2" />
        <text x="510" y="475" textAnchor="middle" className="text-xs" fill="#ff6b6b">多檔案協同編輯</text>
        
        <rect x="450" y="550" width="100" height="50" rx="8" fill="white" stroke="#ff6b6b" strokeWidth="2" />
        <text x="500" y="575" textAnchor="middle" className="text-xs" fill="#ff6b6b">自動化測試</text>
        
        <rect x="600" y="550" width="120" height="50" rx="8" fill="white" stroke="#ff6b6b" strokeWidth="2" />
        <text x="660" y="575" textAnchor="middle" className="text-xs" fill="#ff6b6b">Git 工作流整合</text>
        
        <rect x="600" y="450" width="110" height="50" rx="8" fill="white" stroke="#ff6b6b" strokeWidth="2" />
        <text x="655" y="475" textAnchor="middle" className="text-xs" fill="#ff6b6b">自動建立 PR</text>
        
        {/* 组合使用路径 */}
        <rect x="850" y="250" width="100" height="50" rx="8" fill="url(#combinedGradient)" stroke="none" filter="url(#shadow)" />
        <text x="900" y="275" textAnchor="middle" className="text-sm font-medium" fill="white">組合使用</text>
        
        <rect x="850" y="350" width="130" height="50" rx="8" fill="white" stroke="#2ecc71" strokeWidth="2" />
        <text x="915" y="375" textAnchor="middle" className="text-xs" fill="#2ecc71">Aider 處理探索階段</text>
        
        <rect x="850" y="450" width="140" height="50" rx="8" fill="white" stroke="#2ecc71" strokeWidth="2" />
        <text x="920" y="475" textAnchor="middle" className="text-xs" fill="#2ecc71">Claude Code 處理實現階段</text>
        
        <rect x="850" y="550" width="120" height="50" rx="8" fill="white" stroke="#2ecc71" strokeWidth="2" />
        <text x="910" y="575" textAnchor="middle" className="text-xs" fill="#2ecc71">兩者協同維護</text>
        
        {/* 完成任务节点 */}
        <rect x="500" y="720" width="100" height="50" rx="8" fill="url(#completeGradient)" stroke="none" filter="url(#shadow)" />
        <text x="550" y="745" textAnchor="middle" className="text-sm font-semibold" fill="#2c3e50">完成任務</text>
        
        {/* 连接线 */}
        
        {/* 从开始到决策 */}
        <path d="M 560 70 L 560 90" fill="none" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* 从决策到三个选项 */}
        <path d="M 520 140 Q 300 180 115 250" fill="none" stroke="#667eea" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 560 170 L 520 250" fill="none" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 600 140 Q 750 180 900 250" fill="none" stroke="#2ecc71" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Aider 路径内部连接 */}
        <path d="M 115 300 L 115 350" fill="none" stroke="#667eea" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 105 400 L 105 450" fill="none" stroke="#667eea" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 105 500 L 105 540" fill="none" stroke="#667eea" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* 从 Aider 决策点到 Claude Code */}
        <path d="M 160 570 Q 300 520 450 275" fill="none" stroke="#27ae60" strokeWidth="2" markerEnd="url(#greenArrow)" />
        <text x="300" y="520" textAnchor="middle" className="text-xs font-medium" fill="#27ae60">是</text>
        
        {/* 从 Aider 决策点到完成 */}
        <path d="M 105 600 Q 300 680 500 745" fill="none" stroke="#e74c3c" strokeWidth="2" markerEnd="url(#redArrow)" />
        <text x="300" y="650" textAnchor="middle" className="text-xs font-medium" fill="#e74c3c">否</text>
        
        {/* Claude Code 路径内部连接 */}
        <path d="M 520 300 L 510 350" fill="none" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 510 400 L 510 450" fill="none" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 510 500 L 500 550" fill="none" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 550 575 L 600 575" fill="none" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 660 550 L 655 500" fill="none" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* Claude Code 到完成 */}
        <path d="M 655 500 Q 580 620 550 720" fill="none" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* 组合使用路径内部连接 */}
        <path d="M 900 300 L 915 350" fill="none" stroke="#2ecc71" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 915 400 L 920 450" fill="none" stroke="#2ecc71" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 920 500 L 910 550" fill="none" stroke="#2ecc71" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* 组合使用到完成 */}
        <path d="M 910 600 Q 750 680 600 745" fill="none" stroke="#2ecc71" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        {/* 标签 */}
        <text x="300" y="200" textAnchor="middle" className="text-xs font-medium" fill="#667eea">快速原型</text>
        <text x="540" y="200" textAnchor="middle" className="text-xs font-medium" fill="#ff6b6b">複雜開發</text>
        <text x="750" y="200" textAnchor="middle" className="text-xs font-medium" fill="#2ecc71">混合任務</text>
        
      </svg>
    </div>
    
    {/* 流程说明 */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-700 mb-2">探索與原型階段（Aider 主導）</h4>
        <ul className="text-blue-600 space-y-1">
          <li>• 快速想法驗證和原型開發</li>
          <li>• 多輪對話迭代改進程式碼邏輯</li>
          <li>• 靈活切換不同 AI 模型</li>
        </ul>
      </div>
      
      <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
        <h4 className="font-semibold text-red-700 mb-2">深度開發與重構階段（Claude Code 主導）</h4>
        <ul className="text-red-600 space-y-1">
          <li>• 深度程式碼庫理解能力進行大規模重構</li>
          <li>• 自動化測試編寫和 bug 修復</li>
          <li>• 整合 Git 工作流，自動建立 PR</li>
        </ul>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
        <h4 className="font-semibold text-green-700 mb-2">維護與最佳化階段（兩者協同）</h4>
        <ul className="text-green-600 space-y-1">
          <li>• Aider 處理日常小修改和功能調整</li>
          <li>• Claude Code 負責程式碼品質改進</li>
          <li>• 定期相依性更新和安全補丁</li>
        </ul>
      </div>
    </div>
  </div>
);

export default WorkflowReactFlow;