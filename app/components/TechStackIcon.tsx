"use client";

import MotionCard from '@/components/animation/MotionCard';

interface TechStackIconProps {
  name: string;
  version: string;
  icon?: string; // 設為可選，保留向後兼容性
  color?: string; // 設為可選，保留向後兼容性
}

export default function TechStackIcon({ name, version }: TechStackIconProps) {
  return (
    <MotionCard>
      <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
        <div className="text-blue-500 text-3xl mb-2">
          {name === 'Next.js' && '⟲'}
          {name === 'React' && '⚛'}
          {name === 'Framer Motion' && '🎞️'}
          {name === 'TypeScript' && '𝓣'}
          {name === 'Tailwind CSS' && '🌊'}
          {name === 'MDX' && '📄'}
        </div>
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">{version}</div>
      </div>
    </MotionCard>
  );
}
