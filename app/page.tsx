import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import BlogCard from './components/BlogCard';
import { getAllPosts } from '@/lib/mdx';
import MotionCard from '@/components/animation/MotionCard';
import MotionContainer from '@/components/animation/MotionContainer';

export const metadata: Metadata = {
  title: "Ian's Vibe Coding Blog",
  description: "分享技術心得、開發經驗，以及生活中的點點滴滴。使用 Next.js 15、React 和 MDX 構建的現代化部落格。",
  openGraph: {
    title: "Ian's Vibe Coding Blog",
    description: "分享技術心得、開發經驗，以及生活中的點點滴滴。",
    type: "website",
    images: [{
      url: "/images/default-og-image.png",
      width: 1200,
      height: 630,
      alt: "Ian's Vibe Coding Blog"
    }]
  },
};

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3); // 只顯示最近的3篇文章
  
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

      {/* 最新文章區塊 */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">查看所有文章 →</Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <MotionContainer className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </MotionContainer>
        ) : (
          <p className="text-gray-600 text-center py-12">目前還沒有文章。待續！</p>
        )}
      </section>

      {/* 技術棧區塊 */}
      <section className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">技術棧</h2>
        <MotionContainer className="grid grid-cols-2 md:grid-cols-5 gap-4" delay={0.3}>
          <MotionCard>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-blue-500 text-3xl mb-2">⟲</div>
              <div className="font-semibold">Next.js</div>
              <div className="text-gray-500 text-sm">v15.3.2</div>
            </div>
          </MotionCard>
          
          <MotionCard>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-blue-500 text-3xl mb-2">⚛</div>
              <div className="font-semibold">React</div>
              <div className="text-gray-500 text-sm">v19</div>
            </div>
          </MotionCard>
          
          <MotionCard>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-blue-500 text-3xl mb-2">🎞️</div>
              <div className="font-semibold">Framer Motion</div>
              <div className="text-gray-500 text-sm">v12.10.5</div>
            </div>
          </MotionCard>
          
          <MotionCard>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-blue-500 text-3xl mb-2">🌊</div>
              <div className="font-semibold">Tailwind CSS</div>
              <div className="text-gray-500 text-sm">v4</div>
            </div>
          </MotionCard>
          
          <MotionCard>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-blue-500 text-3xl mb-2">📄</div>
              <div className="font-semibold">MDX</div>
              <div className="text-gray-500 text-sm">v3</div>
            </div>
          </MotionCard>
        </MotionContainer>
      </section>
    </div>
  );
}
