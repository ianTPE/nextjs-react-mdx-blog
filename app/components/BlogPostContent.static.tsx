import Image from 'next/image';
import type { PostMeta } from '@/types/post';
import { authors } from '../data/authors';

interface BlogPostContentProps {
  metadata: PostMeta;
  children: React.ReactNode;
}

// 根據作者名稱獲取頭像
function getAuthorAvatar(authorName: string): string {
  // 查找作者ID
  const authorEntry = Object.entries(authors).find(([_, author]) => 
    author.name === authorName || ('chineseName' in author && author.chineseName === authorName)
  );
  
  // 如果找到作者，返回其頭像；否則返回默認頭像
  return authorEntry ? authorEntry[1].avatar : '/images/author.webp';
}

export default function BlogPostContentStatic({ metadata, children }: BlogPostContentProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
        {metadata.coverImage && (
          <div
            className="relative w-full h-72 mb-6 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-102"
          >
            <Image 
              src={metadata.coverImage} 
              alt={metadata.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <Image 
                src={getAuthorAvatar(metadata.author || 'Unknown')} 
                alt={metadata.author || 'Unknown'}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span>{metadata.author || 'Unknown'}</span>
          </div>
          <span>•</span>
          <time dateTime={metadata.date}>
            {new Date(metadata.date).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        {metadata.summary && (
          <p className="text-gray-600 text-lg mb-4">{metadata.summary}</p>
        )}
        <div className="flex gap-2 flex-wrap">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </article>
  );
}
