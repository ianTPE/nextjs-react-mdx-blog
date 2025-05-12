import React from 'react';

export default function AboutHero() {
  return (
    <section className="w-full py-12 md:py-20 text-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">關於本站</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        這裡是 Ian 的現代化 React/TypeScript 部落格，專注於 AI 協作、極簡 coding 與彈性內容架構。
      </p>
    </section>
  );
}
