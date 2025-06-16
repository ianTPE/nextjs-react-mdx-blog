"use client";

import React, { useState } from 'react';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  color: string;
  bgColor: string;
}

interface Paradigm {
  title: string;
  subtitle: string;
  theme: string;
  bgGradient: string;
  focusArea: string;
  outcome: string;
  steps: LearningStep[];
}

const EducationParadigm: React.FC = () => {
  const [activeParadigm, setActiveParadigm] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const paradigms: Paradigm[] = [
    {
      title: "傳統模式",
      subtitle: "知識傳授為中心",
      theme: "text-slate-700",
      bgGradient: "from-slate-500 to-gray-600",
      focusArea: "技術知識積累",
      outcome: "獨立開發能力",
      steps: [
        {
          id: "trad-1",
          title: "語法",
          description: "學習程式語言基礎",
          details: [
            "變數、函數、迴圈",
            "資料型別與結構",
            "語法規則記憶"
          ],
          icon: "📝",
          color: "text-blue-600",
          bgColor: "bg-blue-100"
        },
        {
          id: "trad-2",
          title: "演算法",
          description: "掌握演算法思維",
          details: [
            "排序與搜尋算法",
            "動態規劃",
            "時間複雜度分析"
          ],
          icon: "🧮",
          color: "text-green-600",
          bgColor: "bg-green-100"
        },
        {
          id: "trad-3",
          title: "專案實作",
          description: "整合知識開發專案",
          details: [
            "從零開始建構",
            "獨立解決問題",
            "完整系統實現"
          ],
          icon: "🏗️",
          color: "text-purple-600",
          bgColor: "bg-purple-100"
        }
      ]
    },
    {
      title: "AI時代模式",
      subtitle: "思維訓練為核心",
      theme: "text-indigo-700",
      bgGradient: "from-indigo-500 to-purple-600",
      focusArea: "認知能力提升",
      outcome: "人機協作專家",
      steps: [
        {
          id: "ai-1",
          title: "問題分析",
          description: "分解複雜問題本質",
          details: [
            "需求理解與拆解",
            "約束條件識別",
            "目標優先級排序"
          ],
          icon: "🔍",
          color: "text-red-600",
          bgColor: "bg-red-100"
        },
        {
          id: "ai-2",
          title: "架構設計",
          description: "高層次系統規劃",
          details: [
            "模組化思維",
            "擴展性考量",
            "技術方案選擇"
          ],
          icon: "🎯",
          color: "text-blue-600",
          bgColor: "bg-blue-100"
        },
        {
          id: "ai-3",
          title: "AI協作",
          description: "人機協同開發",
          details: [
            "提示工程技巧",
            "代碼審查能力",
            "工具整合運用"
          ],
          icon: "🤝",
          color: "text-green-600",
          bgColor: "bg-green-100"
        },
        {
          id: "ai-4",
          title: "結果評估",
          description: "品質與效果檢驗",
          details: [
            "性能指標分析",
            "用戶反饋整合",
            "持續優化改進"
          ],
          icon: "📊",
          color: "text-purple-600",
          bgColor: "bg-purple-100"
        }
      ]
    }
  ];

  const currentParadigm = paradigms[activeParadigm];

  const renderArrow = (index: number, total: number) => {
    if (index === total - 1) return null;
    
    return (
      <div className="flex items-center justify-center mx-2">
        <div className={`w-8 h-0.5 bg-gradient-to-r ${activeParadigm === 0 ? 'from-slate-400 to-slate-500' : 'from-indigo-400 to-purple-500'} relative`}>
          <div className={`absolute right-0 top-0 w-0 h-0 border-l-4 ${activeParadigm === 0 ? 'border-l-slate-500' : 'border-l-purple-500'} border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1 -translate-y-1`}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-8 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">程式設計教育範式轉移</h3>
        <p className="text-gray-600">從知識傳授到思維訓練的革命</p>
      </div>

      {/* Paradigm Selector */}
      <div className="flex justify-center gap-4 mb-8">
        {paradigms.map((paradigm, index) => (
          <button
            key={index}
            onClick={() => setActiveParadigm(index)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeParadigm === index
                ? `bg-gradient-to-r ${paradigm.bgGradient} text-white shadow-lg transform scale-105`
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="text-center">
              <div className="font-bold">{paradigm.title}</div>
              <div className="text-xs opacity-90">{paradigm.subtitle}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Current Paradigm Display */}
      <div className="relative">
        {/* Paradigm Header */}
        <div className={`bg-gradient-to-r ${currentParadigm.bgGradient} text-white p-6 rounded-t-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">{activeParadigm === 0 ? '📚' : '🧠'}</div>
              <div className="font-bold text-lg">{currentParadigm.title}</div>
              <div className="text-sm opacity-90">{currentParadigm.subtitle}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-75">學習重點</div>
              <div className="font-semibold">{currentParadigm.focusArea}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-75">培養目標</div>
              <div className="font-semibold">{currentParadigm.outcome}</div>
            </div>
          </div>
        </div>

        {/* Learning Steps */}
        <div className="bg-white rounded-b-xl shadow-md p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {currentParadigm.steps.map((step, stepIndex) => (
              <React.Fragment key={step.id}>
                <div 
                  className="flex-1 max-w-64"
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Card */}
                  <div className={`relative bg-white border-2 ${hoveredStep === step.id ? 'border-indigo-300 shadow-xl scale-105' : 'border-gray-200'} rounded-xl p-4 transition-all duration-300 cursor-pointer`}>
                    {/* Step Icon */}
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <span className="text-2xl">{step.icon}</span>
                    </div>

                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{stepIndex + 1}</span>
                    </div>

                    {/* Step Content */}
                    <div className="text-center">
                      <h4 className={`font-bold text-lg ${step.color} mb-2`}>{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                      
                      {/* Step Details */}
                      <div className="space-y-1">
                        {step.details.map((detail, index) => (
                          <div key={index} className="text-xs text-gray-500 bg-gray-50 rounded px-2 py-1">
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    {hoveredStep === step.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl pointer-events-none"></div>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {renderArrow(stepIndex, currentParadigm.steps.length)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Analysis */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traditional Challenges */}
        <div className="bg-white rounded-lg p-6 border border-red-200">
          <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2">
            <span>⚠️</span>
            傳統模式挑戰
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>重記憶輕理解，容易形成僵化思維</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>缺乏問題分析能力，遇到新技術容易迷失</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>單兵作戰思維，難以適應協作開發</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>學習週期長，知識更新速度跟不上技術發展</span>
            </li>
          </ul>
        </div>

        {/* AI Era Advantages */}
        <div className="bg-white rounded-lg p-6 border border-green-200">
          <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
            <span>🚀</span>
            AI時代優勢
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>培養系統性思考，具備架構級視野</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>掌握人機協作技巧，提升開發效率</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>重視結果評估，形成持續改進思維</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>適應技術快速迭代，保持學習敏捷性</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200">
        <div className="text-center">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center justify-center gap-2">
            <span>💡</span>
            關鍵轉變
          </h4>
          <p className="text-blue-700 leading-relaxed">
            頂尖程式設計課程正在經歷範式轉移：從「<strong>語法 → 演算法 → 專案實作</strong>」
            轉向「<strong>問題分析 → 架構設計 → AI協作 → 結果評估</strong>」。
            這種轉變讓學習者在享受AI便利的同時，保持系統性思考能力。
          </p>
        </div>
      </div>

      {/* Stanford Example */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🎓</span>
          </div>
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">實例：Stanford CS106A 課程改革</p>
            <p>已引入「AI防沉迷」機制：學生使用Claude生成方案後，必須手繪架構圖並解釋設計邏輯。這確保學習者既能享受AI便利，又保持獨立思考能力。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationParadigm;