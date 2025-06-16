"use client";

import React, { useState } from 'react';

interface MemoryNode {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface MemoryCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  nodes: MemoryNode[];
}

const ProjectMemoryMap: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('architecture');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const memoryCategories: MemoryCategory[] = [
    {
      id: 'architecture',
      title: '架構決策歷史',
      description: 'AI工具協作的設計演進軌跡',
      icon: '🏗️',
      color: 'text-blue-700',
      bgGradient: 'from-blue-500 to-blue-600',
      nodes: [
        {
          id: 'claude-design',
          title: 'Claude的設計推理軌跡',
          description: '記錄Claude生成的架構方案和設計邏輯',
          items: [
            '初始架構概念生成',
            '技術選型推理過程',
            '擴展性考量因素',
            '風險評估與權衡'
          ],
          icon: '🧠',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        },
        {
          id: 'aider-constraints',
          title: 'Aider的實現約束記錄',
          description: '追蹤Aider執行過程中的限制與調整',
          items: [
            '實現細節的技術約束',
            '代碼重構的邊界條件',
            '測試覆蓋率要求',
            '性能優化的權衡點'
          ],
          icon: '⚙️',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        },
        {
          id: 'codex-network',
          title: 'Codex的概念解釋網絡',
          description: '建立技術概念間的關聯知識圖譜',
          items: [
            '核心概念定義與關聯',
            '最佳實踐模式庫',
            '常見陷阱與解決方案',
            '學習路徑推薦系統'
          ],
          icon: '🕸️',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        }
      ]
    },
    {
      id: 'cognitive',
      title: '認知模式識別',
      description: '開發者行為與思維模式分析',
      icon: '🧭',
      color: 'text-green-700',
      bgGradient: 'from-green-500 to-green-600',
      nodes: [
        {
          id: 'dev-patterns',
          title: '開發者偏好模式',
          description: '識別個人編程習慣與偏好傾向',
          items: [
            '代碼風格偏好分析',
            '問題解決路徑傾向',
            '工具使用頻率統計',
            '學習新技術的節奏'
          ],
          icon: '👤',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        },
        {
          id: 'error-zones',
          title: '錯誤頻發區域',
          description: '標記容易出現問題的技術領域',
          items: [
            '高頻錯誤類型統計',
            '問題根因分析記錄',
            '修復方案效果追蹤',
            '預防措施建議庫'
          ],
          icon: '🎯',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        },
        {
          id: 'learning-rhythm',
          title: '學習節奏分析',
          description: '追蹤知識吸收與技能提升模式',
          items: [
            '學習曲線建模',
            '知識保留率分析',
            '技能遷移效果評估',
            '最佳學習時機預測'
          ],
          icon: '📈',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      ]
    },
    {
      id: 'team-wisdom',
      title: '團隊智慧積累',
      description: '集體經驗與最佳實踐沉澱',
      icon: '🏆',
      color: 'text-purple-700',
      bgGradient: 'from-purple-500 to-purple-600',
      nodes: [
        {
          id: 'success-patterns',
          title: '成功模式抽取',
          description: '提煉高效開發模式的共同特徵',
          items: [
            '成功項目的關鍵因素',
            '高效協作模式總結',
            '技術決策成功案例',
            '問題解決最佳路徑'
          ],
          icon: '✨',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        },
        {
          id: 'failure-lessons',
          title: '失敗經驗歸納',
          description: '從挫折中提取寶貴的學習資源',
          items: [
            '失敗模式識別與分類',
            '風險警示信號庫',
            '復盤改進行動清單',
            '預防性措施建議'
          ],
          icon: '🔄',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        },
        {
          id: 'best-practices',
          title: '最佳實踐演化',
          description: '持續優化的實踐標準與方法論',
          items: [
            '實踐標準版本控制',
            '方法論演進軌跡',
            '團隊共識形成過程',
            '實踐效果量化評估'
          ],
          icon: '🚀',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🗂️</span>
          </div>
          <h3 className="not-prose text-xl font-bold">項目記憶圖譜</h3>
        </div>
        <p className="text-gray-600 mt-3">AI工具間的語義記憶共享與集體智慧湧現</p>
      </div>

      {/* Memory Tree Structure */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {memoryCategories.map((category, categoryIndex) => (
          <div key={category.id} className="border-b border-gray-200 last:border-b-0">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className={`w-full p-4 text-left transition-all duration-300 hover:bg-gray-50 ${
                expandedCategory === category.id ? `bg-gradient-to-r ${category.bgGradient} text-white` : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    expandedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${expandedCategory === category.id ? 'text-white' : category.color}`}>
                      {category.title}
                    </h4>
                    <p className={`text-sm ${expandedCategory === category.id ? 'text-white/90' : 'text-gray-600'}`}>
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  expandedCategory === category.id ? 'rotate-90' : ''
                }`}>
                  <span className={expandedCategory === category.id ? 'text-white' : 'text-gray-400'}>▶</span>
                </div>
              </div>
            </button>

            {/* Category Content */}
            {expandedCategory === category.id && (
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.nodes.map((node) => (
                    <div
                      key={node.id}
                      className={`${node.bgColor} ${node.borderColor} border rounded-lg p-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
                        hoveredNode === node.id ? 'scale-105 shadow-lg' : ''
                      }`}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Node Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          hoveredNode === node.id ? 'bg-white shadow-md' : 'bg-white/70'
                        }`}>
                          <span className="text-sm">{node.icon}</span>
                        </div>
                        <h5 className={`font-semibold ${node.color} text-sm`}>{node.title}</h5>
                      </div>

                      {/* Node Description */}
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">{node.description}</p>

                      {/* Node Items */}
                      <div className="space-y-2">
                        {node.items.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                              hoveredNode === node.id ? 'bg-indigo-500' : 'bg-gray-400'
                            }`}></div>
                            <span className="text-xs text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Connection Lines */}
                      {hoveredNode === node.id && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="w-full h-full border-2 border-indigo-400 rounded-lg opacity-50"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insights Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-blue-200">
          <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
            <span>🔗</span>
            語義記憶共享
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>Aider、Claude、Codex共享統一項目記憶庫</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>跨工具的上下文連續性保持</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>決策軌跡的完整可追溯性</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 border border-green-200">
          <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
            <span>🌟</span>
            集體智慧湧現
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>模式識別準確性呈指數級提升</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>解決方案多樣性顯著增加</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>創新路徑發現速度加快</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800 text-center">
          <span className="font-semibold">🚀 未來願景：</span>
          當多個開發者的AI工具開始共享記憶時，會產生超越個體的「集體智慧湧現」——
          這是人類智慧進化的下一個里程碑。
        </p>
      </div>
    </div>
  );
};

export default ProjectMemoryMap;