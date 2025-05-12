import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number; // 延遲時間，單位為秒
}

export default function MotionContainer({ 
  children, 
  className = '', 
  delay = 0 
}: MotionContainerProps) {
  
  // 容器動畫
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}
