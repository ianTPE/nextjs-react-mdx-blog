"use client";

// 這個是barrel file，用於匯出所有圖表組件
// 必須標記為客戶端組件

import PlatformMarketDemandChart from './PlatformMarketDemandChart';
import LearningCurveChart from './LearningCurveChart';
import FreelanceIncomeChart from './FreelanceIncomeChart';
import MarketGrowthChart from './MarketGrowthChart';
import PlatformSkillRadarChart from './PlatformSkillRadarChart';

export {
  PlatformMarketDemandChart,
  LearningCurveChart,
  FreelanceIncomeChart,
  MarketGrowthChart,
  PlatformSkillRadarChart
};