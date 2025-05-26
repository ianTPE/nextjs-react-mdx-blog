"use client";

import type { FC } from 'react';

type StepLevel = 'beginner' | 'intermediate' | 'expert';
type StepRating = 3 | 4 | 5;

interface LearningStep {
  name: string;
  level: StepLevel;
  rating: StepRating;
}

interface StepSectionProps {
  title: string;
  steps: LearningStep[];
}

const StepSection: FC<StepSectionProps> = ({ title, steps }) => {
  const getLevelColor = (level: StepLevel) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-purple-500';
      case 'expert':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelText = (level: StepLevel) => {
    switch (level) {
      case 'beginner':
        return '新手';
      case 'intermediate':
        return '中級開發者';
      case 'expert':
        return '專家';
      default:
        return '';
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={`${step.level}-${step.name}`} className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
            <div className={`w-2 h-12 ${getLevelColor(step.level)} rounded-full mr-3`} />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <span className="font-medium dark:text-white">{step.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{getLevelText(step.level)}</span>
              </div>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-4 h-4 ${star <= step.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LearningJourneySteps: FC = () => {
  const beginnerSteps: LearningStep[] = [
    { name: '環境安裝', level: 'beginner', rating: 5 },
    { name: '基礎操作', level: 'beginner', rating: 4 },
    { name: '簡單專案', level: 'beginner', rating: 3 },
    { name: '版本控制', level: 'beginner', rating: 4 },
  ];

  const intermediateSteps: LearningStep[] = [
    { name: '多檔案管理', level: 'intermediate', rating: 4 },
    { name: '模型調優', level: 'intermediate', rating: 5 },
    { name: 'IDE整合', level: 'intermediate', rating: 4 },
    { name: '團隊協作', level: 'intermediate', rating: 5 },
  ];

  const expertSteps: LearningStep[] = [
    { name: '工作流自動化', level: 'expert', rating: 5 },
    { name: '企業部署', level: 'expert', rating: 4 },
    { name: '客製開發', level: 'expert', rating: 5 },
    { name: '開源貢獻', level: 'expert', rating: 4 },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-lg my-8">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">AI 程式設計工具學習路徑</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">星級評分：⭐⭐⭐(基礎) 到 ⭐⭐⭐⭐⭐(精通) 表示技能熟練度</p>
      
      <StepSection title="初學者階段" steps={beginnerSteps} />
      <StepSection title="中級階段" steps={intermediateSteps} />
      <StepSection title="高級階段" steps={expertSteps} />
    </div>
  );
};

export default LearningJourneySteps;
