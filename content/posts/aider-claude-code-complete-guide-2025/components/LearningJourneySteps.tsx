"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Terminal, 
  FolderOpen, 
  GitBranch, 
  Rocket,
  Settings,
  Code2,
  Users,
  Cpu,
  Workflow,
  Building2,
  Sparkles,
  Github
} from "lucide-react";

// -----------------------------------------------------------------------------
//  Types
// -----------------------------------------------------------------------------

type StepLevel = "beginner" | "intermediate" | "expert";

interface LearningStep {
  name: string;
  level: StepLevel;
  difficulty: number; // 1-5, where 1 is easiest
  icon: FC<{ className?: string }>;
  description?: string;
}

interface StepSectionInfo {
  title: string;
  subtitle: string;
  color: string; // Tailwind color class
  bgGradient: string;
  steps: LearningStep[];
  stageNumber: number;
}

// -----------------------------------------------------------------------------
//  Data
// -----------------------------------------------------------------------------

const beginnerSteps: LearningStep[] = [
  { 
    name: "環境安裝", 
    level: "beginner", 
    difficulty: 1,
    icon: Terminal,
    description: "安裝必要的開發工具"
  },
  { 
    name: "基礎操作", 
    level: "beginner", 
    difficulty: 2,
    icon: Code2,
    description: "學習基本指令與操作"
  },
  { 
    name: "簡單專案", 
    level: "beginner", 
    difficulty: 3,
    icon: Rocket,
    description: "建立第一個小專案"
  },
  { 
    name: "版本控制", 
    level: "beginner", 
    difficulty: 2,
    icon: GitBranch,
    description: "Git 基礎與版本管理"
  },
];

const intermediateSteps: LearningStep[] = [
  { 
    name: "多檔案管理", 
    level: "intermediate", 
    difficulty: 2,
    icon: FolderOpen,
    description: "處理複雜專案結構"
  },
  { 
    name: "模型調優", 
    level: "intermediate", 
    difficulty: 1,
    icon: Settings,
    description: "優化 AI 模型參數"
  },
  { 
    name: "IDE 整合", 
    level: "intermediate", 
    difficulty: 2,
    icon: Cpu,
    description: "整合開發環境設定"
  },
  { 
    name: "團隊協作", 
    level: "intermediate", 
    difficulty: 1,
    icon: Users,
    description: "多人協作工作流程"
  },
];

const expertSteps: LearningStep[] = [
  { 
    name: "工作流自動化", 
    level: "expert", 
    difficulty: 1,
    icon: Workflow,
    description: "建立自動化流程"
  },
  { 
    name: "企業部署", 
    level: "expert", 
    difficulty: 2,
    icon: Building2,
    description: "大規模應用部署"
  },
  { 
    name: "客製開發", 
    level: "expert", 
    difficulty: 1,
    icon: Sparkles,
    description: "開發客製化功能"
  },
  { 
    name: "開源貢獻", 
    level: "expert", 
    difficulty: 2,
    icon: Github,
    description: "參與開源社群"
  },
];

// -----------------------------------------------------------------------------
//  Components
// -----------------------------------------------------------------------------

const DifficultyIndicator: FC<{ difficulty: number; color: string }> = ({ difficulty, color }) => {
  const percentage = ((5 - difficulty + 1) / 5) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">上手難度</span>
        <span className={`font-medium text-${color}-600 dark:text-${color}-400`}>
          {difficulty === 1 ? "極易" : difficulty === 2 ? "容易" : difficulty === 3 ? "中等" : difficulty === 4 ? "困難" : "極難"}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

const StepCard: FC<LearningStep & { color: string; bgGradient: string }> = ({ 
  name, 
  difficulty, 
  icon: Icon, 
  description,
  color,
  bgGradient 
}) => (
  <Card className="group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20 overflow-hidden">
    <div className={`h-1 bg-gradient-to-r ${bgGradient}`} />
    <CardHeader className="pb-3">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <DifficultyIndicator difficulty={difficulty} color={color} />
    </CardContent>
  </Card>
);

const StageIndicator: FC<{ stage: number; title: string; color: string }> = ({ stage, title, color }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${color}-100 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 font-bold text-lg`}>
      {stage}
    </div>
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  </div>
);

const StepSection: FC<StepSectionInfo> = ({ 
  title, 
  subtitle, 
  steps, 
  color, 
  bgGradient,
  stageNumber 
}) => (
  <section className="space-y-4">
    <StageIndicator stage={stageNumber} title={title} color={color} />
    <p className="text-sm text-muted-foreground -mt-2 ml-[52px]">{subtitle}</p>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <StepCard key={step.name} {...step} color={color} bgGradient={bgGradient} />
      ))}
    </div>
  </section>
);

const LearningJourneySteps: FC = () => {
  const sections: StepSectionInfo[] = [
    {
      title: "初學者階段",
      subtitle: "基礎概念理解 (預計 1-2 週)",
      color: "blue",
      bgGradient: "from-blue-400 to-blue-600",
      steps: beginnerSteps,
      stageNumber: 1
    },
    {
      title: "中級階段",
      subtitle: "進階技巧與整合 (預計 2-4 週)",
      color: "purple",
      bgGradient: "from-purple-400 to-purple-600",
      steps: intermediateSteps,
      stageNumber: 2
    },
    {
      title: "高級階段",
      subtitle: "專業應用與創新 (預計 4 週以上)",
      color: "red",
      bgGradient: "from-red-400 to-red-600",
      steps: expertSteps,
      stageNumber: 3
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6">
      {/* Header */}
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          AI 程式設計工具學習路徑
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          循序漸進掌握 AI 輔助編程技能。每個階段都有明確的學習目標和難度指標，
          幫助您有效規劃學習進度。
        </p>
      </header>

      {/* Learning Path */}
      <div className="space-y-10">
        {sections.map((section, index) => (
          <div key={section.title}>
            <StepSection {...section} />
            {index < sections.length - 1 && (
              <div className="flex justify-center mt-8">
                <div className="h-8 w-0.5 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/40" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Tips */}
      <div className="mt-12 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-center text-muted-foreground">
          💡 提示：難度指標顯示每個技能的上手速度。進度條越滿，代表越容易快速掌握。
        </p>
      </div>
    </div>
  );
};

export default LearningJourneySteps;