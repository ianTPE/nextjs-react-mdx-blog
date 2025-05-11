import { BlogMetadata } from '@/app/types/blog';

export const postsMetadata: Record<string, BlogMetadata> = {
  'getting-started-with-nextjs': {
    title: '開始使用 Next.js 14',
    date: '2024-05-10',
    excerpt: '學習如何使用 Next.js 14 建立現代化的 React 應用程式，包含 App Router、Server Components 等最新功能。',
    author: 'Ian Chen',
    tags: ['Next.js', 'React', 'TypeScript'],
    coverImage: undefined
  },
  'mdx-blog-setup': {
    title: '使用 MDX 建立部落格',
    date: '2024-05-11',
    excerpt: '了解如何整合 MDX 到 Next.js 專案中，讓您可以在 Markdown 中使用 React 組件。',
    author: 'Ian Chen',
    tags: ['MDX', 'Next.js', 'Blog'],
    coverImage: undefined
  },
  'typescript-best-practices': {
    title: 'TypeScript 最佳實踐',
    date: '2024-05-12',
    excerpt: '探索 TypeScript 開發中的最佳實踐，包括類型定義、泛型使用和常見陷阱。',
    author: 'Ian Chen',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    coverImage: undefined
  },
  'tailwind-css-tips': {
    title: 'Tailwind CSS 進階技巧',
    date: '2024-05-13',
    excerpt: '深入了解 Tailwind CSS 的進階使用技巧，包括自定義類別、組件化和效能優化。',
    author: 'Ian Chen',
    tags: ['Tailwind CSS', 'CSS', 'Frontend'],
    coverImage: undefined
  }
};

// 獲取所有文章的 slugs
export const getAllPostSlugs = (): string[] => {
  return Object.keys(postsMetadata);
};

// 根據 slug 獲取文章的 metadata
export const getPostMetadata = (slug: string): BlogMetadata | null => {
  return postsMetadata[slug] || null;
};
