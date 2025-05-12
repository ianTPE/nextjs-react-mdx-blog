"use client";

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../types/blog';
import MotionCard from '@/components/animation/MotionCard';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCardAnimated({ post }: BlogCardProps) {
  return (
    <MotionCard className="h-full">
      <article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        {post.coverImage && (
          <div className="relative w-full h-48">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-2xl font-bold mb-2">
            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h2>
          <div className="text-gray-600 text-sm mb-4 flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative rounded-full overflow-hidden">
                <Image 
                  src="/images/author.png" 
                  alt={post.author}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <span>{post.author}</span>
            </div>
            <span className="mx-2">•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-4">
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              閱讀更多 →
            </Link>
          </div>
        </div>
      </article>
    </MotionCard>
  );
}
