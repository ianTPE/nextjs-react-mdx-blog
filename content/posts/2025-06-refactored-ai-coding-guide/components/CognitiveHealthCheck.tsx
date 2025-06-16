"use client";

import React, { useState } from 'react';

interface CheckItem {
  id: string;
  text: string;
  checked: boolean;
}

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  items: CheckItem[];
}

const CognitiveHealthCheck: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([
    {
      title: "獨立除錯能力",
      icon: "🔧",
      color: "text-red-700",
      bgColor: "from-red-500 to-red-600",
      items: [
        { id: "debug1", text: "能在不使用AI的情況下分析錯誤日誌", checked: false },
        { id: "debug2", text: "能手動追蹤複雜的執行流程", checked: false },
        { id: "debug3", text: "能識別性能瓶頸的根本原因", checked: false }
      ]
    },
    {
      title: "架構設計能力",
      icon: "🏗️",
      color: "text-blue-700",
      bgColor: "from-blue-500 to-blue-600",
      items: [
        { id: "arch1", text: "能在白板上繪製系統架構圖", checked: false },
        { id: "arch2", text: "能預測設計決策的長期影響", checked: false },
        { id: "arch3", text: "能進行技術方案的利弊分析", checked: false }
      ]
    },
    {
      title: "學習適應能力",
      icon: "🧠",
      color: "text-green-700",
      bgColor: "from-green-500 to-green-600",
      items: [
        { id: "learn1", text: "能快速理解新技術的核心概念", checked: false },
        { id: "learn2", text: "能將新知識整合到既有認知框架", checked: false },
        { id: "learn3", text: "能識別知識體系中的矛盾和衝突", checked: false }
      ]
    }
  ]);

  const toggleCheck = (categoryIndex: number, itemIndex: number) => {
    setCategories(prev => {
      const newCategories = [...prev];
      newCategories[categoryIndex].items[itemIndex].checked = 
        !newCategories[categoryIndex].items[itemIndex].checked;
      return newCategories;
    });
  };

  const getProgressStats = () => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedItems = categories.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.checked).length, 0
    );
    const percentage = Math.round((checkedItems / totalItems) * 100);
    return { total: totalItems, checked: checkedItems, percentage };
  };

  const stats = getProgressStats();

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-6 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
          <h3 className="text-xl font-bold">每月認知健檢表</h3>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>整體進度</span>
            <span>{stats.checked}/{stats.total} ({stats.percentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, categoryIndex) => (
          <div key={category.title} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Category Header */}
            <div className={`bg-gradient-to-r ${category.bgColor} text-white p-4`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">{category.title}</h4>
                  <div className="text-sm opacity-90">
                    {category.items.filter(item => item.checked).length}/{category.items.length} 完成
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="p-4 space-y-3">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleCheck(categoryIndex, itemIndex)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      item.checked 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      {item.checked && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className={`text-sm leading-relaxed transition-colors duration-200 ${
                    item.checked 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Category Progress */}
            <div className="px-4 pb-4">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${category.bgColor} h-2 rounded-full transition-all duration-500`}
                  style={{ 
                    width: `${(category.items.filter(item => item.checked).length / category.items.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">建議使用方式：</p>
            <p>定期（建議每月）檢視這些能力指標，誠實評估自己的認知狀態。這不是考試，而是幫助你維持技術主權的自我監控工具。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveHealthCheck;