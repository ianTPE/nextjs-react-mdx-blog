import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import BlogPostContent from '@/app/components/BlogPostContent';
import ClientMDXContent from './ClientMDXContent';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {};
  }

  const { metadata } = post;
  const ogImage = metadata.coverImage || '/images/default-og-image.png';
  
  return {
    title: `${metadata.title} | My Blog`,
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

export default async function BlogPostPage(
  { params }: Props
) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <BlogPostContent metadata={post.metadata}>
      <ClientMDXContent content={post.content} />
    </BlogPostContent>
  );
}
