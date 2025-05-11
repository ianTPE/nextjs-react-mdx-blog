import { BlogMetadata } from '../types/blog';

interface BlogPostContentProps {
  metadata: BlogMetadata;
  children: React.ReactNode;
}

export default function BlogPostContent({ metadata, children }: BlogPostContentProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        {metadata.coverImage && (
          <img 
            src={metadata.coverImage} 
            alt={metadata.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <span>{metadata.author}</span>
          <span>•</span>
          <time dateTime={metadata.date}>
            {new Date(metadata.date).toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
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
