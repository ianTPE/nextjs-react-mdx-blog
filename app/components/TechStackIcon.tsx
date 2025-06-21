"use client";

import { FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiMdx, SiTailwindcss } from 'react-icons/si';
import MotionCard from '@/components/animation/MotionCard';
import { ReactNode } from 'react';

interface TechStackIconProps {
  name: string;
  version: string;
  icon: ReactNode;
}

const iconMap: { [key: string]: ReactNode } = {
  'Next.js': <SiNextdotjs className="text-black" />,
  'React': <FaReact className="text-blue-500" />,
  'Framer Motion': <SiFramer className="text-purple-600" />,
  'Tailwind CSS': <SiTailwindcss className="text-teal-500" />,
  'MDX': <SiMdx className="text-yellow-500" />,
};

export default function TechStackIcon({ name, version }: Omit<TechStackIconProps, 'icon'>) {
  const icon = iconMap[name];

  return (
    <MotionCard>
      <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
        <div className="text-4xl mb-3 mx-auto flex justify-center">
          {icon}
        </div>
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">{version}</div>
      </div>
    </MotionCard>
  );
}
