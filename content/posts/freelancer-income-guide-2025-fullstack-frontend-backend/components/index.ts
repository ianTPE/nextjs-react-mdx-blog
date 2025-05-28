import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// 導出圖表組件
export { default as MarketGrowthComparisonChart } from './MarketGrowthComparisonChart';
export { default as JobSatisfactionChart } from './JobSatisfactionChart';
export { default as LowCodeMarketTrendChart } from './LowCodeMarketTrendChart';
export { default as EmploymentGrowthForecastChart } from './EmploymentGrowthForecastChart';
export { default as TechDirectionScoreChart } from './TechDirectionScoreChart';
export { default as IncomePotentialComparisonChart } from './IncomePotentialComparisonChart';
export { default as MarketDriversChart } from './MarketDriversChart';

// 也導出原始圖表組件，以便在MDX中直接使用
export { Bar, Line, Doughnut, Radar };