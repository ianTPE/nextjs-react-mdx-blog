import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { serialize } from 'next-mdx-remote/serialize';
import MDXContent from '@/app/components/MDXContent';
import BlogPostContent from '@/app/components/BlogPostContent';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const mdxSource = await serialize(post.content);

  return (
    <BlogPostContent metadata={post.metadata}>
      <MDXContent source={mdxSource} />
    </BlogPostContent>
  );
}
