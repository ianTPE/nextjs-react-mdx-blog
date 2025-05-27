"use client";

import { FC } from "react";
import { Badge } from "@/components/ui/badge"; // Kept in case you use it elsewhere, but not in StepCard
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"; // Added TooltipProvider
import { CheckCircle, Circle } from "lucide-react";

// -----------------------------------------------------------------------------
//  Types
// -----------------------------------------------------------------------------

type StepLevel = "beginner" | "intermediate" | "expert";

type StepRating = 3 | 4 | 5; // keep the original 3–5 scale (at least 3 filled dots)

interface LearningStep {
  name: string;
  level: StepLevel; // Still useful for data structure, even if not shown on card
  rating: StepRating;
}

interface StepSectionInfo { // For cleaner data passing
  title: string;
  subtitle: string;
  accent: string; // Tailwind color e.g. "blue", "purple", "red"
  steps: LearningStep[];
}

// -----------------------------------------------------------------------------
//  Helpers
// -----------------------------------------------------------------------------

// chineseLevelText is no longer used directly in StepCard's badge,
// but kept here if you need it for other purposes or dynamic section titles.
const chineseLevelText: Record<StepLevel, string> = {
  beginner: "新手",
  intermediate: "中級",
  expert: "專家",
};

const accentRing = (accent: string) =>
  `ring-2 ring-${accent}-300 dark:ring-${accent}-700/60`;

// -----------------------------------------------------------------------------
//  Components
// -----------------------------------------------------------------------------

const StepCard: FC<LearningStep & { accent: string }> = ({ name, rating, accent }) => (
  <Card
    className={`flex flex-col gap-3 ${accentRing(accent)} hover:shadow-lg transition-shadow`}
  >
    <CardHeader className="pb-2 pt-4"> {/* Adjusted padding slightly */}
      <CardTitle className="text-base font-medium leading-snug tracking-tight">
        {name}
      </CardTitle>
      {/* Badge removed from here for cleaner card, section title provides level context */}
    </CardHeader>
    <CardContent className="pb-4 flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= rating;
        return (
          <Tooltip key={n} delayDuration={0}>
            <TooltipTrigger className="focus:outline-none">
              {filled ? (
                <CheckCircle className={`h-4 w-4 text-${accent}-500`} />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              {filled ? "上手相對快速" : "需投入較多時間掌握"}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </CardContent>
  </Card>
);

const StepSection: FC<StepSectionInfo> = ({ title, subtitle, steps, accent }) => (
  <section className="space-y-3"> {/* Reduced space-y slightly */}
    <div className="mb-3"> {/* Group title and subtitle */}
      <h3 className="text-lg font-semibold text-foreground/90">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      }}
    >
      {steps.map((step) => (
        <StepCard key={step.name} {...step} accent={accent} />
      ))}
    </div>
  </section>
);

const LearningJourneySteps: FC = () => {
  const beginnerSection: StepSectionInfo = {
    title: "初學者階段",
    subtitle: "基礎概念理解 (預計 1-2 週)",
    accent: "blue",
    steps: [
      { name: "環境安裝", level: "beginner", rating: 5 },
      { name: "基礎操作", level: "beginner", rating: 4 },
      { name: "簡單專案", level: "beginner", rating: 3 },
      { name: "版本控制", level: "beginner", rating: 4 },
    ]
  };

  const intermediateSection: StepSectionInfo = {
    title: "中級階段",
    subtitle: "進階技巧與整合 (預計 2-4 週)",
    accent: "purple",
    steps: [
      { name: "多檔案管理", level: "intermediate", rating: 4 },
      { name: "模型調優", level: "intermediate", rating: 5 },
      { name: "IDE 整合", level: "intermediate", rating: 4 },
      { name: "團隊協作", level: "intermediate", rating: 5 },
    ]
  };

  const expertSection: StepSectionInfo = {
    title: "高級階段",
    subtitle: "專業應用與創新 (預計 4 週以上)",
    accent: "red",
    steps: [
      { name: "工作流自動化", level: "expert", rating: 5 },
      { name: "企業部署", level: "expert", rating: 4 },
      { name: "客製開發", level: "expert", rating: 5 },
      { name: "開源貢獻", level: "expert", rating: 4 },
    ]
  };

  return (
    // Wrap with TooltipProvider if not already present at a higher level in your app
    <TooltipProvider>
      <div className="space-y-8 p-4 md:p-6"> {/* Added some padding */}
        <header className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">AI 程式設計工具學習路徑</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            評分說明：實心圓 (●) 越多，代表該技能越容易快速上手。
            空心圓 (○) 表示需要投入更多時間與實戰經驗來精通。
          </p>
        </header>

        <StepSection {...beginnerSection} />
        <StepSection {...intermediateSection} />
        <StepSection {...expertSection} />

        {/* The original image showed "第一階段：基礎概念理解 (1-2 週)" below the beginner cards.
            This is now integrated as a subtitle for each section.
            If you had other text below the entire component, it would go here.
        */}
      </div>
    </TooltipProvider>
  );
};

export default LearningJourneySteps;