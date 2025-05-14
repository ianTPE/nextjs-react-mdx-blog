"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    
    // 模擬 API 呼叫，實際可替換為你的訂閱 API
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // 5秒後重置狀態
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">訂閱最新文章</h2>
        <p className="max-w-md mx-auto text-blue-100">
          訂閱我的電子報，不錯過任何技術文章和更新。絕不濫發郵件，隨時可取消訂閱。
        </p>
      </div>
      
      {status === 'success' ? (
        <motion.div 
          className="bg-white text-blue-600 p-4 rounded-lg text-center mx-auto max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-medium text-lg">訂閱成功！</p>
          <p className="text-gray-600 text-sm mt-1">感謝訂閱，期待與你分享更多精彩內容。</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex bg-white p-1 rounded-lg shadow-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="你的電子郵件"
              className="w-full px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`px-6 rounded-r-lg font-medium ${
                status === 'loading'
                  ? 'bg-gray-400'
                  : 'bg-indigo-900 hover:bg-indigo-800'
              } transition-colors whitespace-nowrap`}
            >
              {status === 'loading' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  處理中...
                </span>
              ) : (
                '訂閱'
              )}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
