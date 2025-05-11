import Link from 'next/link';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <div className="text-gray-600 text-sm mb-4">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
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
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          閱讀更多 →
        </Link>
      </div>
    </article>
  );
}
