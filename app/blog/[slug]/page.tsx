import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import BlogPostContentStatic from '@/app/components/BlogPostContent.static';
import MDXRenderer from './MDXRenderer';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {};
  }

  const { metadata } = post;
  const ogImage = metadata.coverImage || '/images/default-og-image.webp';
  
  return {
    title: `${metadata.title} | Citrine.top`,
    description: metadata.excerpt,
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
      type: 'article',
      publishedTime: metadata.date,
      authors: [metadata.author],
      tags: metadata.tags,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: metadata.title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.excerpt,
      images: [ogImage]
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // 將 MDX 內容渲染成 React 元件
  // 不在服務端加載組件，而是讓 MDXRenderer 在客戶端處理
  return (
    <BlogPostContentStatic metadata={post.metadata}>
      <MDXRenderer 
        source={post.content} 
        slug={resolvedParams.slug}
      />
    </BlogPostContentStatic>
  );
}