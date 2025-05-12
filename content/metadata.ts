import { BlogMetadata } from '@/app/types/blog';

export const postsMetadata: Record<string, BlogMetadata> = {
  'getting-started-with-nextjs': {
    title: '開始使用 Next.js 14',
    date: '2024-05-10',
    excerpt: '學習如何使用 Next.js 14 建立現代化的 React 應用程式，包含 App Router、Server Components 等最新功能。',
    author: 'Ian Chen',
    tags: ['Next.js', 'React', 'TypeScript'],
    coverImage: '/images/getting-started-with-nextjs.jpg'
  },



  'ai-powered-website-automation-claude-mcp-server-guide': {
    title: 'AI 驅動網站自動化建置全攻略：Claude MCP Server 實戰體驗與最佳實踐',
    date: '2025-04-10',
    excerpt: '探索 AI 輔助網站開發的新境界！本文詳述作者使用 Claude MCP Server 自動化建置網站的第一手經驗，從配置 Vercel 和 GitHub MCP Server，到部署 Next.js AI chatbot 的全過程。文章不僅展示了 AI 驅動開發的強大潛力，也坦誠分享了過程中遇到的挑戰與限制。無論您是技術愛好者、前端開發者，還是對 AI 協作開發感興趣的讀者，這篇實戰報告都將為您提供寶貴的洞見與實用技巧，幫助您在人機協作的開發模式中找到最佳平衡點。一場融合技術探索、失敗教訓與成功喜悅的真實開發冒險，等您來體驗！',
    author: 'Ian Chen',
    tags: ['Next.js', 'React', 'TypeScript'],
    coverImage: '/images/ai-powered-website-automation-claude-mcp-server-guide.jpg'
  },



  'mdx-blog-setup': {
    title: '使用 MDX 建立部落格',
    date: '2024-05-11',
    excerpt: '了解如何整合 MDX 到 Next.js 專案中，讓您可以在 Markdown 中使用 React 組件。',
    author: 'Ian Chen',
    tags: ['MDX', 'Next.js', 'Blog'],
    coverImage: '/images/mdx-blog-setup.jpg'
  },
  'typescript-best-practices': {
    title: 'TypeScript 最佳實踐',
    date: '2024-05-12',
    excerpt: '探索 TypeScript 開發中的最佳實踐，包括類型定義、泛型使用和常見陷阱。',
    author: 'Ian Chen',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    coverImage: '/images/typescript-best-practices.jpg'
  },
  'tailwind-css-tips': {
    title: 'Tailwind CSS 進階技巧',
    date: '2024-05-13',
    excerpt: '深入了解 Tailwind CSS 的進階使用技巧，包括自定義類別、組件化和效能優化。',
    author: 'Ian Chen',
    tags: ['Tailwind CSS', 'CSS', 'Frontend'],
    coverImage: '/images/tailwind-css-tips.jpg'
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
