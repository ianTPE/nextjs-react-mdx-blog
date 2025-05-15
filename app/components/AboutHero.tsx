'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <motion.section 
      className="relative mb-12 pt-20 pb-20 max-w-4xl mx-auto rounded-xl overflow-hidden isolate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background image with improved styling */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/images/AboutHero.webp"
          alt="關於本站主圖"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          關於本站
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          這裡是 Ian 的現代化 React/MDX 部落格，專注於 AI 協作、極簡 coding 與彈性內容架構。
        </motion.p>
      </div>
    </motion.section>
  );
}
