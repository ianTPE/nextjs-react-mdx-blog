"use client";

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/mdx';
import MotionCard from '@/components/animation/MotionCard';
import { authors } from '@/app/data/authors';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCardAnimated({ post }: BlogCardProps) {
  // 根據作者名稱獲取頭像
  function getAuthorAvatar(authorName: string): string {
    // 查找作者ID
    const authorEntry = Object.entries(authors).find(([_, author]) => 
      author.name === authorName || ('chineseName' in author && author.chineseName === authorName)
    );
    
    // 如果找到作者，返回其頭像；否則返回默認頭像
    return authorEntry ? authorEntry[1].avatar : '/images/author.webp';
  }
  return (
    <MotionCard className="h-full">
      <article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        {post.coverImage && (
          <div className="relative">
            <div className="relative w-full h-48">
              <Image 
                src={post.coverImage} 
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute top-0 right-0 mt-3 mr-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {post.tags[0] || "文章"}
              </span>
            </div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-bold mb-2 line-clamp-2">
            <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center">
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <Image 
                src={getAuthorAvatar(post.author)} 
                alt={post.author}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="ml-2">
              <span className="text-sm text-gray-800">{post.author}</span>
              <time dateTime={post.date} className="text-xs text-gray-500 block">
                {new Date(post.date).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </div>
            <Link 
              href={`/blog/${post.slug}`}
              className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              閱讀 →
            </Link>
          </div>
        </div>
      </article>
    </MotionCard>
  );
}
