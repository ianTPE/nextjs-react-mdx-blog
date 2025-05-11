import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import BlogPostContent from '@/app/components/BlogPostContent';
import ClientMDXContent from './ClientMDXContent';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <BlogPostContent metadata={post.metadata}>
      <ClientMDXContent content={post.content} />
    </BlogPostContent>
  );
}
