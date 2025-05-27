'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface LazySectionProps {
  id?: string;
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

/**
 * LazySection 組件 - 使用 IntersectionObserver 實現懶加載內容
 * 只有當用戶滾動到組件附近時才會顯示內容
 */
const LazySection: React.FC<LazySectionProps> = ({
  id,
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '200px 0px',
  className = '',
}) => {
  // 引用 DOM 元素
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // 追蹤客戶端渲染和可見狀態
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // 標記現在是在客戶端
    setIsClient(true);
    
    // 創建 IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 當元素進入視口時，設為可見並停止觀察
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    // 開始觀察元素
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // 清理觀察器
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // 在服務器端渲染時返回佔位內容
  if (!isClient) {
    return (
      <div id={id} ref={sectionRef} className={className}>
        {placeholder || <div className="h-40 flex items-center justify-center">Loading...</div>}
      </div>
    );
  }
  
  // 在客戶端根據可見性渲染內容
  return (
    <div id={id} ref={sectionRef} className={className}>
      {isVisible ? (
        children
      ) : (
        placeholder || <div className="h-40 flex items-center justify-center">Loading...</div>
      )}
    </div>
  );
};

export default LazySection;
