import React, { ReactNode } from 'react';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
}

export default function MotionCardStatic({ children, className = '' }: MotionCardProps) {
  return (
    <div
      className={`transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
