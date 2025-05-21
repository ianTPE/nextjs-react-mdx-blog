import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import BlogPostContentStatic from '@/app/components/BlogPostContent.static';
import MDXRenderer from './MDXRenderer';
import { Metadata } from 'next';
import { getPostComponents } from '@/lib/mdx-loader';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
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
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // 獲取該文章的自定義組件 - 現在應該只是一個物件，而不是函數
  const components = await getPostComponents(resolvedParams.slug);

  // 將 MDX 內容渲染成 React 元件
  return (
    <BlogPostContentStatic metadata={post.metadata}>
      <MDXRenderer 
        source={post.content} 
        components={components}
      />
    </BlogPostContentStatic>
  );
}