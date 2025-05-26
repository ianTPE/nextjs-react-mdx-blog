"use client";

import dynamic from 'next/dynamic';

// Dynamically import chart components with no SSR
export const DynamicCoreArchitecture = dynamic(
  () => import('./CoreArchitecture'),
  { ssr: false }
);

export const DynamicTechStackChart = dynamic(
  () => import('./TechStackChartChartjs'),
  { ssr: false }
);

export const DynamicIndustryDistributionPieChart = dynamic(
  () => import('./IndustryDistributionPieChart'),
  { ssr: false }
);

export const DynamicIndustryMaturityMatrix = dynamic(
  () => import('./IndustryMaturityMatrix'),
  { ssr: false }
);

export const DynamicKeyIndicatorCards = dynamic(
  () => import('./KeyIndicatorCards'),
  { ssr: false }
);

export const DynamicBenefitRadarChart = dynamic(
  () => import('./BenefitRadarChart'),
  { ssr: false }
);

export const DynamicROITrendChart = dynamic(
  () => import('./ROITrendChart'),
  { ssr: false }
);

export const DynamicImplementationRoadmap = dynamic(
  () => import('./ImplementationRoadmap'),
  { ssr: false }
);