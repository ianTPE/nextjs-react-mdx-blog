import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "關於我 | My Blog",
  description: "我是 Ian Chen，一位熱愛技術的全端開發者。專注於 React、Next.js、TypeScript 等現代前端技術。",
  openGraph: {
    title: "關於我 | My Blog",
    description: "我是 Ian Chen，一位熱愛技術的全端開發者。專注於 React、Next.js、TypeScript 等現代前端技術。",
    type: "profile",
    images: [{
      url: "/images/author.png", // 使用作者照片作為關於頁面的 OG 圖片
      width: 1200,
      height: 1200,
      alt: "Ian Chen"
    }]
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">關於我</h1>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src="/images/author.png" 
              alt="Ian Chen" 
              fill 
              sizes="(max-width: 768px) 192px, 192px"
              className="object-cover"
              priority
            />
          </div>
          
          <div className="prose prose-lg">
          <p className="mb-6">
            歡迎來到我的部落格！我是 Ian Chen，一位熱愛技術的全端開發者。
            專注於 React、Next.js、TypeScript 等現代前端技術，同時也對後端開發和系統設計有濃厚興趣。
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">技術專長</h2>
          <ul className="list-disc list-inside mb-6">
            <li>前端：React, Next.js, TypeScript, Tailwind CSS</li>
            <li>後端：Node.js, Express, PostgreSQL, MongoDB</li>
            <li>工具：Git, Docker, CI/CD, AWS</li>
            <li>其他：系統設計、效能優化、團隊協作</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">為什麼寫部落格？</h2>
          <p className="mb-6">
            我相信知識的分享是技術進步的重要推動力。透過寫作，不僅可以幫助他人解決問題，
            更能加深自己對技術的理解。在這個部落格中，我會分享：
          </p>
          
          <ul className="list-disc list-inside mb-6">
            <li>技術教學和最佳實踐</li>
            <li>專案開發經驗分享</li>
            <li>新技術的探索和評測</li>
            <li>程式設計思維和方法論</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">聯絡我</h2>
          <p className="mb-6">
            如果你有任何問題或建議，歡迎透過以下方式聯絡我：
          </p>
          
          <ul className="list-disc list-inside mb-6">
            <li>Email: ian@example.com</li>
            <li>GitHub: <a href="https://github.com/ianchen" className="text-blue-600 hover:underline">@ianchen</a></li>
            <li>Twitter: <a href="https://twitter.com/ianchen" className="text-blue-600 hover:underline">@ianchen</a></li>
            <li>LinkedIn: <a href="https://linkedin.com/in/ianchen" className="text-blue-600 hover:underline">Ian Chen</a></li>
          </ul>
          
          <p className="mb-6">
            感謝你的閱讀，希望這個部落格能為你帶來價值！
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
