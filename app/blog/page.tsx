import BlogCard from '../components/BlogCard';
import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "所有文章 | Citrine.top",
  description: "瀏覽我的所有技術文章，包含 Next.js、React、TypeScript、Tailwind CSS 等主題。",
  openGraph: {
    title: "所有文章 | Citrine.top",
    description: "瀏覽我的所有技術文章，包含 Next.js、React、TypeScript、Tailwind CSS 等主題。",
    type: "website",
    images: [{
      url: "/images/default-og-image.webp",
      width: 1200,
      height: 630,
      alt: "Citrine.top - 所有文章"
    }]
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">所有文章</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
