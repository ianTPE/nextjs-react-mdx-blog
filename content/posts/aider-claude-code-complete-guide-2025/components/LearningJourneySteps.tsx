"use client";

import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, Circle } from "lucide-react";

// -----------------------------------------------------------------------------
//  Types
// -----------------------------------------------------------------------------

type StepLevel = "beginner" | "intermediate" | "expert";

type StepRating = 3 | 4 | 5; // keep the original 3–5 scale

interface LearningStep {
  name: string;
  level: StepLevel;
  rating: StepRating;
}

interface StepSectionProps {
  title: string;
  steps: LearningStep[];
  accent: string; // Tailwind color e.g. "blue", "purple", "red"
}

// -----------------------------------------------------------------------------
//  Helpers
// -----------------------------------------------------------------------------

const chineseLevelText: Record<StepLevel, string> = {
  beginner: "新手", // ✨
  intermediate: "中級", // ⚙️
  expert: "專家", // 🚀
};

const accentRing = (accent: string) =>
  `ring-2 ring-${accent}-300 dark:ring-${accent}-700/60`;

// -----------------------------------------------------------------------------
//  Components
// -----------------------------------------------------------------------------

const StepCard: FC<LearningStep & { accent: string }> = ({ name, rating, level, accent }) => (
  <Card
    className={`flex flex-col gap-3 ${accentRing(accent)} hover:shadow-lg transition-shadow`}
  >
    <CardHeader className="pb-0">
      <CardTitle className="text-base font-medium leading-snug tracking-tight">
        {name}
      </CardTitle>
      <Badge
        variant="secondary"
        className={`mt-2 bg-${accent}-500/10 text-${accent}-700 dark:text-${accent}-300 capitalize`}
      >
        {chineseLevelText[level]}
      </Badge>
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
            <TooltipContent>{filled ? "易用" : "尚需練習"}</TooltipContent>
          </Tooltip>
        );
      })}
    </CardContent>
  </Card>
);

const StepSection: FC<StepSectionProps> = ({ title, steps, accent }) => (
  <section className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground/90">{title}</h3>

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
  const beginnerSteps: LearningStep[] = [
    { name: "環境安裝", level: "beginner", rating: 5 },
    { name: "基礎操作", level: "beginner", rating: 4 },
    { name: "簡單專案", level: "beginner", rating: 3 },
    { name: "版本控制", level: "beginner", rating: 4 },
  ];

  const intermediateSteps: LearningStep[] = [
    { name: "多檔案管理", level: "intermediate", rating: 4 },
    { name: "模型調優", level: "intermediate", rating: 5 },
    { name: "IDE 整合", level: "intermediate", rating: 4 },
    { name: "團隊協作", level: "intermediate", rating: 5 },
  ];

  const expertSteps: LearningStep[] = [
    { name: "工作流自動化", level: "expert", rating: 5 },
    { name: "企業部署", level: "expert", rating: 4 },
    { name: "客製開發", level: "expert", rating: 5 },
    { name: "開源貢獻", level: "expert", rating: 4 },
  ];

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">AI 程式設計工具學習路徑</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          滿分 5 顆圓點代表「上手快速」，圓點越少表示需要更多實戰經驗。
        </p>
      </header>

      <StepSection title="初學者階段" accent="blue" steps={beginnerSteps} />
      <StepSection title="中級階段" accent="purple" steps={intermediateSteps} />
      <StepSection title="高級階段" accent="red" steps={expertSteps} />
    </div>
  );
};

export default LearningJourneySteps;
