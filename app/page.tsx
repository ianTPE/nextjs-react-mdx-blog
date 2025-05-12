import Link from 'next/link';
import { Metadata } from 'next';
import BlogCardAnimated from './components/BlogCardAnimated';
import { getAllPosts } from '@/lib/mdx';
import MotionCard from '@/components/animation/MotionCard';
import MotionContainer from '@/components/animation/MotionContainer';
import HomeHero from '@/components/animation/HomeHero';

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
      {/* 使用新的 HomeHero 組件替換原來的靜態 hero 部分 */}
      <HomeHero />

      {/* 最新文章區塊 */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">查看所有文章 →</Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <MotionContainer className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCardAnimated key={post.slug} post={post} />
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
