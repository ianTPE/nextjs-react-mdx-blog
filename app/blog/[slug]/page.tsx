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

  const ogImage = post.coverImage || '/images/default-og-image.webp';
  
  return {
    title: `${post.title} | Citrine.top`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Unknown'],
      tags: post.tags,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: post.title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
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

  let postComponents = {};
  try {
    postComponents = await import(`@/content/posts/${resolvedParams.slug}/components/index`);
  } catch {
    // No custom components for this post, which is fine.
  }

  return (
    <BlogPostContentStatic metadata={post} headings={post.headings}>
      <MDXRenderer 
        source={post.source} 
        components={postComponents}
      />
    </BlogPostContentStatic>
  );
}
