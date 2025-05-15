import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import BlogCardAnimated from './components/BlogCardAnimated';
import MotionCard from '@/components/animation/MotionCard';
import MotionContainer from '@/components/animation/MotionContainer';
import HomeHero from '@/components/animation/HomeHero';
import FeaturedPost from './components/FeaturedPost';
import NewsletterSignup from './components/NewsletterSignup';
import TechStackIcon from './components/TechStackIcon';

export const metadata: Metadata = {
  title: "Ian's Vibe Coding Blog",
  description: "分享技術心得、開發經驗，以及生活中的點點滴滴。使用 Next.js 15、React 和 MDX 構建的現代化部落格。",
  openGraph: {
    title: "Ian's Vibe Coding Blog",
    description: "分享技術心得、開發經驗，以及生活中的點點滴滴。",
    type: "website",
    images: [{
      url: "/images/default-og-image.webp",
      width: 1200,
      height: 630,
      alt: "Ian's Vibe Coding Blog"
    }]
  },
};

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3); // 只顯示最近的3篇文章
  const featuredPost = allPosts.length > 0 ? allPosts[0] : null; // 首篇為精選文章
  
  return (
    <div className="container mx-auto px-4 py-0">
      {/* 使用新的 HomeHero 組件 */}
      <HomeHero />

      {/* 精選文章區塊 */}
      {featuredPost && (
        <section className="max-w-5xl mx-auto mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">精選文章</h2>
          </div>
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* 最新文章區塊 */}
      <section className="max-w-5xl mx-auto mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">最新文章</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium group flex items-center">
            查看所有文章 
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Link>
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

      {/* 技術棧區塊 - 改進版 */}
      <section className="max-w-5xl mx-auto mb-16 py-12 bg-gray-50 rounded-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">技術棧</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">本部落格使用以下現代化前端技術構建</p>
        </div>
        <MotionContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4" delay={0.3}>
          <TechStackIcon 
            name="Next.js" 
            version="v15.3.2" 
            icon="/images/nextjs-icon.svg" 
            color="bg-black"
          />
          <TechStackIcon 
            name="React" 
            version="v19" 
            icon="/images/react-icon.svg" 
            color="bg-blue-500"
          />
          <TechStackIcon 
            name="Framer Motion" 
            version="v12.10.5" 
            icon="/images/framer-icon.svg" 
            color="bg-purple-600"
          />
          <TechStackIcon 
            name="Tailwind CSS" 
            version="v4" 
            icon="/images/tailwind-icon.svg" 
            color="bg-teal-500"
          />
          <TechStackIcon 
            name="MDX" 
            version="v3" 
            icon="/images/mdx-icon.svg" 
            color="bg-yellow-500"
          />
        </MotionContainer>
      </section>

      {/* 訂閱區塊 */}
      <section className="max-w-4xl mx-auto mb-16">
        <NewsletterSignup />
      </section>
    </div>
  );
}
