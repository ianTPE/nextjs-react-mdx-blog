import React from 'react';

const ImplementationRoadmap = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-4 text-center">AI+PRD+DevOps 實施路線圖</h3>
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 1000 400" className="w-full min-w-[800px]">
          {/* 背景網格 */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1000" height="400" fill="url(#grid)" />
          
          {/* 時間軸 */}
          <line x1="100" y1="50" x2="900" y2="50" stroke="#374151" strokeWidth="2" />
          {['0', '3個月', '6個月', '9個月', '12個月', '15個月', '18個月'].map((label, i) => (
            <g key={i}>
              <line x1={100 + i * 120} y1="45" x2={100 + i * 120} y2="55" stroke="#374151" strokeWidth="2" />
              <text x={100 + i * 120} y="35" textAnchor="middle" className="text-sm">{label}</text>
            </g>
          ))}
          
          {/* 階段一：基礎建設 */}
          <rect x="120" y="80" width="280" height="30" rx="5" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <text x="260" y="100" textAnchor="middle" className="text-sm font-semibold">第一階段：基礎建設</text>
          
          <rect x="120" y="120" width="120" height="25" rx="3" fill="#93c5fd" />
          <text x="180" y="137" textAnchor="middle" className="text-xs">數據治理體系</text>
          
          <rect x="250" y="150" width="100" height="25" rx="3" fill="#60a5fa" />
          <text x="300" y="167" textAnchor="middle" className="text-xs">AI平台搭建</text>
          
          <rect x="120" y="180" width="240" height="25" rx="3" fill="#3b82f6" />
          <text x="240" y="197" textAnchor="middle" className="text-xs">團隊培訓</text>
          
          {/* 階段二：試點實施 */}
          <rect x="380" y="80" width="240" height="30" rx="5" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
          <text x="500" y="100" textAnchor="middle" className="text-sm font-semibold">第二階段：試點實施</text>
          
          <rect x="380" y="120" width="60" height="25" rx="3" fill="#86efac" />
          <text x="410" y="137" textAnchor="middle" className="text-xs">試點選擇</text>
          
          <rect x="450" y="150" width="100" height="25" rx="3" fill="#4ade80" />
          <text x="500" y="167" textAnchor="middle" className="text-xs">PRD智能化</text>
          
          <rect x="560" y="180" width="100" height="25" rx="3" fill="#22c55e" />
          <text x="610" y="197" textAnchor="middle" className="text-xs">DevOps增強</text>
          
          {/* 階段三：規模化推廣 */}
          <rect x="640" y="80" width="220" height="30" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="750" y="100" textAnchor="middle" className="text-sm font-semibold">第三階段：規模化推廣</text>
          
          <rect x="670" y="120" width="120" height="25" rx="3" fill="#fcd34d" />
          <text x="730" y="137" textAnchor="middle" className="text-xs">全面推廣</text>
          
          <rect x="700" y="150" width="160" height="25" rx="3" fill="#fbbf24" />
          <text x="780" y="167" textAnchor="middle" className="text-xs">持續優化</text>
          
          <rect x="720" y="180" width="100" height="25" rx="3" fill="#f59e0b" />
          <text x="770" y="197" textAnchor="middle" className="text-xs">卓越中心</text>
        </svg>
      </div>
    </div>
  );
};

export default ImplementationRoadmap;