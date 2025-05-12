import React, { ReactNode } from 'react';
// 安裝 Framer Motion 後解除註釋此行
// import { motion } from 'framer-motion';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
}

// 這是安裝 Framer Motion 後應該使用的版本
export default function MotionCardFramer({ children, className = '' }: MotionCardProps) {
  // 安裝 Framer Motion 後，使用下面的代碼替換 MotionCard.tsx 文件
  /*
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
  */
  
  // 這是臨時的 CSS 版本
  return (
    <div
      className={`transform transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
