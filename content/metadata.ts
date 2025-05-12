import { BlogMetadata } from '@/app/types/blog';

export const postsMetadata: Record<string, BlogMetadata> = {
  'getting-started-with-nextjs': {
    title: '開始使用 Next.js 15',
    date: '2025-05-10',
    excerpt: '學習如何使用 Next.js 15 建立現代化的 React 應用程式，包含 App Router、Server Components 等最新功能。',
    author: 'Ian Chen',
    tags: ['Next.js', 'React', 'TypeScript'],
    coverImage: '/images/getting-started-with-nextjs.jpg'
  },


  'blog-exploring-react-workflow-contentlayer-tinacms': {
    title: 'React 開發日誌：從 Contentlayer 到 TinaCMS 的實用工作流程探索',
    date: '2025-04-11',
    excerpt: '在這篇技術探索日誌中，我深入研究了 React 開發生態系統中的 Contentlayer 和 TinaCMS 工具，解析它們的本質及應用場景。從 Contentlayer 的解析器功能到 TinaCMS 的實用性，我紀錄了在建立部落格過程中遇到的各種技術挑戰，包括 MDX 編輯困境、元件整合問題，以及與 AI 工具合作的經驗。這篇文章特別適合正在尋找理想前端開發工作流程的開發者，分享了我在多個 React 框架中的實際體驗和問題解決策略，讓讀者能從我的嘗試中獲取寶貴經驗。',
    author: 'Ian Chen',
    tags: ['Contentlayer', 'TinaCMS', 'React'],
    coverImage: '/images/posts/blog-exploring-react-workflow-contentlayer-tinacms.png'
  },


  'cms-journey-tinacms-to-wispcms-mdx': {
    title: 'CMS探險之旅：從TinaCMS到WispCMS的完整MDX支援解決方案',
    date: '2025-04-06',
    excerpt: '在這篇親身經歷的技術探索文章中，我分享了從TinaCMS到WispCMS的曲折旅程，以及尋找完美MDX支援解決方案的過程。文章詳細記錄了我在使用TinaCMS線上編輯功能時遇到的困境、Tailwind Starter的嘗試與挫折、本地編輯的成功經驗，以及最終選擇WispCMS的決定。對於任何正在尋找支援MDX格式的內容管理系統，或者面臨類似技術選型挑戰的開發者來說，這篇文章提供了寶貴的第一手經驗與反思。',
    author: 'Ian Chen',
    tags: ['TinaCMS', 'WispCMS', 'MDX'],
    coverImage: '/images/posts/cms-journey-tinacms-to-wispcms-mdx.png'
  },


  'automating-deployment-docusaurus-github-vercel-netlify': {
    title: 'Docusaurus與框架選擇實戰：2025年全棧開發者的深夜探索之旅',
    date: '2025-04-12',
    excerpt: '當失眠遇上開發靈感，會碰撞出怎樣的火花？本文記錄了一位全棧開發者在深夜探索 Docusaurus、前端框架選擇、自動化部署以及 AI 輔助開發的真實歷程。從 MDX 與 JSX 的思辨、網頁複製工具的挫折，到 AI 控制桌面應用的嘗試，這段技術冒險不僅展現了現代開發者面臨的選擇困境，也揭示了一個重要的開發哲學：有時候，找到合適的參考比無止境的技術比較更為重要。無論你是資深開發者還是新手，這篇文章都能讓你在技術選擇的迷霧中找到一絲方向。',
    author: 'Ian Chen',
    tags: ['Docusaurus', 'React', 'TypeScript'],
    coverImage: '/images/posts/automating-deployment-docusaurus-github-vercel-netlify.png'
  },
  'ai-powered-website-automation-claude-mcp-server-guide': {
    title: 'AI 驅動網站自動化建置全攻略：Claude MCP Server 實戰體驗與最佳實踐',
    date: '2025-04-10',
    excerpt: '探索 AI 輔助網站開發的新境界！本文詳述作者使用 Claude MCP Server 自動化建置網站的第一手經驗，從配置 Vercel 和 GitHub MCP Server，到部署 Next.js AI chatbot 的全過程。文章不僅展示了 AI 驅動開發的強大潛力，也坦誠分享了過程中遇到的挑戰與限制。無論您是技術愛好者、前端開發者，還是對 AI 協作開發感興趣的讀者，這篇實戰報告都將為您提供寶貴的洞見與實用技巧，幫助您在人機協作的開發模式中找到最佳平衡點。一場融合技術探索、失敗教訓與成功喜悅的真實開發冒險，等您來體驗！',
    author: 'Ian Chen',
    tags: ['Claude MCP Server', 'React', 'TypeScript'],
    coverImage: '/images/posts/ai-powered-website-automation-claude-mcp-server-guide.png'
  },
  'mdx-blog-setup': {
    title: '使用 MDX 建立部落格',
    date: '2024-05-11',
    excerpt: '了解如何整合 MDX 到 Next.js 專案中，讓您可以在 Markdown 中使用 React 組件。',
    author: 'Ian Chen',
    tags: ['MDX', 'Next.js', 'Blog'],
    coverImage: '/images/mdx-blog-setup.jpg'
  },

  'framer-motion-intro-guide': {
    title: 'Framer Motion 動畫入門與實戰指南',
    date: '2025-05-12',
    excerpt: '全面介紹 Framer Motion 動畫函式庫的優勢、基礎用法、進階互動與 Next.js 整合實戰技巧，適合現代 React/Next.js 開發者。',
    author: 'Ian Chen',
    tags: ['Framer Motion', 'React', 'Next.js', '動畫', '前端'],
    coverImage: '/images/framer-motion-intro-guide.jpg'
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
