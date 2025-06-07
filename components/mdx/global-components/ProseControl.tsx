'use client';

import React from 'react';

interface ProseWrapperProps {
  width?: 'narrow' | 'normal' | 'wide' | 'full';
  children?: React.ReactNode;  // 改為可選
  className?: string;
  [key: string]: unknown;
}

interface ProseControlProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

// 主要的 Prose 寬度控制組件
export const ProseWrapper: React.FC<ProseWrapperProps> = ({ 
  width = 'normal', 
  children,
  ...props
}) => {
  const getWidthClass = () => {
    switch (width) {
      case 'narrow':
        return 'max-w-[50ch]';
      case 'normal':
        return 'max-w-[65ch]';
      case 'wide':
        return 'max-w-[80ch]';
      case 'full':
        return 'max-w-none';
      default:
        return 'max-w-[65ch]';
    }
  };

  return (
    <div className={`not-prose ${getWidthClass()} mx-auto`} {...props}>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
};

// 突破寬度限制的容器
export const BreakoutContainer: React.FC<ProseControlProps> = ({ 
  children,
  ...props
}) => {
  return (
    <div className="not-prose -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 my-8" {...props}>
      <div className="w-full max-w-none overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

// 全寬組件包裝器
export const FullWidth: React.FC<ProseControlProps> = ({ 
  children,
  ...props
}) => {
  return (
    <div className="not-prose w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-8" {...props}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

// 中等寬度容器 (介於 prose 和全寬之間)
export const MediumWidth: React.FC<ProseControlProps> = ({ 
  children,
  ...props
}) => {
  return (
    <div className="not-prose -mx-4 sm:-mx-8 lg:-mx-16 my-8" {...props}>
      <div className="max-w-5xl mx-auto overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default {
  ProseWrapper,
  BreakoutContainer,
  FullWidth,
  MediumWidth
};