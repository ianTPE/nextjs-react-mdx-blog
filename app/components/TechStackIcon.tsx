"use client";

import Image from 'next/image';
import MotionCard from '@/components/animation/MotionCard';

interface TechStackIconProps {
  name: string;
  version: string;
  icon: string;
  color: string;
}

export default function TechStackIcon({ name, version, icon, color }: TechStackIconProps) {
  return (
    <MotionCard>
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${color} flex items-center justify-center p-2`}>
          <div className="text-white text-2xl font-bold">
            {name === 'Next.js' && '⟲'}
            {name === 'React' && '⚛'}
            {name === 'Framer Motion' && '🎞️'}
            {name === 'Tailwind CSS' && '🌊'}
            {name === 'MDX' && '📄'}
          </div>
        </div>
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">{version}</div>
      </div>
    </MotionCard>
  );
}
