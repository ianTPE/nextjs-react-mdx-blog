import React from 'react';

import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative mb-12 py-20 max-w-4xl mx-auto rounded-xl overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/AboutHero.jpg"
          alt="關於本站主圖"
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">關於本站</h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow">
          這裡是 Ian 的現代化 React/TypeScript 部落格，專注於 AI 協作、極簡 coding 與彈性內容架構。
        </p>
      </div>
    </section>
  );
}

