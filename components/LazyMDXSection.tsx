'use client';

import React from 'react';
import LazySection from './LazySection';

interface LazyMDXSectionProps {
  id?: string;
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

/**
 * LazyMDXSection 組件 - 專門為 MDX 內容設計的懶加載組件
 * 提供標題作為佔位元素，當用戶滾動到附近時才加載完整內容
 */
const LazyMDXSection: React.FC<LazyMDXSectionProps> = ({
  id,
  title,
  level = 2,
  children,
  className = '',
}) => {
  // 根據標題級別生成對應的標題元素
  const renderHeading = () => {
    switch(level) {
      case 1: return <h1 id={id}>{title}</h1>;
      case 2: return <h2 id={id}>{title}</h2>;
      case 3: return <h3 id={id}>{title}</h3>;
      case 4: return <h4 id={id}>{title}</h4>;
      case 5: return <h5 id={id}>{title}</h5>;
      case 6: return <h6 id={id}>{title}</h6>;
      default: return <h2 id={id}>{title}</h2>;
    }
  };

  // 生成佔位內容 - 只顯示標題，確保導航功能正常
  const placeholder = (
    <div className="py-4">
      {renderHeading()}
      <div className="animate-pulse mt-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2.5" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );

  return (
    <LazySection
      id={id}
      placeholder={placeholder}
      className={className}
      rootMargin="300px 0px"
    >
      <div>
        {renderHeading()}
        {children}
      </div>
    </LazySection>
  );
};

export default LazyMDXSection;
