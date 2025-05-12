import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "首頁 | Ian's Vibe Coding Blog",
  description: "分享技術心得、開發經驗，以及生活中的點點滴滴。使用 Next.js 15、React 和 MDX 構建的現代化部落格。",
  openGraph: {
    title: "首頁 | Ian's Vibe Coding Blog",
    description: "分享技術心得、開發經驗，以及生活中的點點滴滴。",
    type: "website",
    images: [{
      url: "/images/default-og-image.png",
      width: 1200,
      height: 630,
      alt: "Ian's Vibe Coding Blog - 首頁"
    }]
  },
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-0">
      <section className="relative mb-16 py-24 max-w-4xl mx-auto overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/hero-background.jpg"
            alt="Blog background"
            fill
            priority
            className="object-cover brightness-75"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            歡迎來到我的部落格
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            分享技術心得、開發經驗，以及生活中的點點滴滴。
            使用 Next.js 15、React 和 MDX 構建的現代化部落格。
          </p>
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            查看所有文章
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          功能特色
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/blog/mdx-blog-setup" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image 
                src="/images/mdx-blog-setup.jpg" 
                alt="MDX 支援" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">MDX 支援</h3>
              <p className="text-gray-600 mb-4">
                在 Markdown 中直接使用 React 組件，創造更豐富的內容體驗。
              </p>
              <span className="text-blue-600 font-medium">瞭解更多 →</span>
            </div>
          </Link>
          <Link href="/blog/typescript-best-practices" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image 
                src="/images/typescript-best-practices.jpg" 
                alt="TypeScript" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">TypeScript</h3>
              <p className="text-gray-600 mb-4">
                完整的類型定義，提供更好的開發體驗和程式碼品質。
              </p>
              <span className="text-blue-600 font-medium">瞭解更多 →</span>
            </div>
          </Link>
          <Link href="/blog/tailwind-css-tips" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image 
                src="/images/tailwind-css-tips.jpg" 
                alt="Tailwind CSS" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Tailwind CSS</h3>
              <p className="text-gray-600 mb-4">
                使用 Tailwind CSS 快速構建美觀的響應式界面。
              </p>
              <span className="text-blue-600 font-medium">瞭解更多 →</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
