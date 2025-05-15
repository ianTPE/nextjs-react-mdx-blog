import { BlogMetadata } from '@/app/types/blog';

export const postsMetadata: Record<string, BlogMetadata> = {
  'product-logic-shift-ai': {
    title: 'AI產品邏輯：從操作變為托付的轉變',
    date: '2025-05-15',
    excerpt: '探討人工智能產品設計的新範式：從工具操作到任務託付的轉變。本文深入分析AI產品設計思維的根本性轉變，以及這種轉變對用戶體驗和產品價值的深遠影響。',
    author: '庭宇',
    tags: ['AI', 'Product Design', 'UX', 'React'],
    coverImage: '/images/posts/product-logic-shift-ai.jpg'
  },
  'openmemory-personal-memory-layer': {
    title: 'OpenMemory：打造個人 AI 記憶層的開源解決方案',
    date: '2025-05-14',
    excerpt: 'OpenMemory是一個為大型語言模型設計的開源個人記憶層系統，提供私有、可攜帶且完全開源的解決方案。本文深入分析其架構、核心功能及應用場景，探討如何在保持數據隱私的同時實現AI的個性化體驗。',
    author: 'Ian Chou',
    tags: ['OpenMemory', 'AI', '開源', '記憶管理', 'MCP'],
    coverImage: '/images/posts/openmemory-personal-memory-layer.jpg'
  },
  'getting-started-with-nextjs': {
    title: '開始使用 Next.js 15',
    date: '2025-05-10',
    excerpt: '學習如何使用 Next.js 15 建立現代化的 React 應用程式，包含 App Router、Server Components 等最新功能。',
    author: 'Ian Chou',
    tags: ['Next.js', 'React', 'TypeScript'],
    coverImage: '/images/getting-started-with-nextjs.jpg'
  },

  'Vercel-Blog-Starter-Kit--TinaCMS': {
    title: '我的部落格建站之旅：從 Vercel Blog Starter Kit 到 TinaCMS 的轉變',
    date: '2025-04-05',
    excerpt: '昨天我用 Vercel 的 Blog Starter Kit 快速建立了一個部落格，但今早發現管理上的不便與遷移的困難。在重新思考需求後，我與 AI 討論理想的部落格解決方案，最終找到 TinaCMS 這個選項。經過一番嘗試與轉變，我放棄了整合 Blog Starter Kit 的想法，完全採用 TinaCMS 的架構，成功建立了滿足我需求的部落格網站。這趟建站之旅教會我，有時最佳解決方案不是直線前進，而是願意嘗試不同路徑。',
    author: 'Ian Chou',
    tags: ['Vercel', 'Next.js', 'React', 'TypeScript', 'TinaCMS'],
    coverImage: '/images/posts/Vercel-Blog-Starter-Kit--TinaCMS.png'
  },
  'low-code-no-code-market-trends-2025-career-transition': {
    title: '低代碼/無代碼市場趨勢：從企業高管到AI創業者的轉型之路',
    date: '2025-05-05',
    excerpt: '探討低代碼/無代碼市場的爆發性成長與AI融合趨勢。從我50多年的職業生涯——工程師到集團副總，再到創業者——分享如何在這個預計到2032年達2644億美元的新興領域中開創第二人生。本文深入分析平台類型、應用領域與市場機會，為資深專業人士提供轉型藍圖，展示如何結合豐富經驗與前沿技術，把握低代碼革命帶來的商業新機遇。',
    author: 'Ian Chou',
    tags: ['Low-Code', 'No-Code', 'Market Trends', 'Career Transition', 'AI', 'Entrepreneurship'],
    coverImage: '/images/posts/low-code-no-code-market-trends-2025-career-transition.png'
  },

  'static-website-architecture-breakthrough-abandoning-page-bundle-for-react-ecosystem': {
    title: '靜態網站架構大突破：告別 Page Bundle，擁抱 React 新生態',
    date: '2025-04-09',
    excerpt: '本文分享了我在靜態網站架構選擇上的重要轉折點。從最初對 Page Bundle 直覺式結構的嚮往，到接受現實中 Page Bundle 並非主流的挑戰；從困擾於資料遷移問題，到發現使用正則表達式 (regex) 擷取資源連結的解決方案。這一突破讓我能夠放下對 Page Bundle 的執著，轉而專注於 React 生態系的探索。文章還介紹了在 Vercel 等邊緣計算平台上運行 React 應用的優勢，以及 Next.js、Gatsby、Remix 和 Astro 這四大靜態站生成器的發展前景。最後分享了使用 MCP 實現工作流程自動化的計劃，為現代前端開發提供更高效的解決方案。',
    author: 'Ian Chou',
    tags: ['Static Website', 'Page Bundle', 'React', 'Next.js', 'Gatsby', 'Remix', 'Astro'],
    coverImage: '/images/posts/static-website-architecture-breakthrough-abandoning-page-bundle-for-react-ecosystem.png'
  },

  'vercel-blog-setup-experience': {
    title: '從拖延到行動：我用Vercel快速建立部落格的實戰經驗與心得',
    date: '2025-04-04',
    excerpt: '在數月的拖延和過度思考後，我終於下定決心使用Vercel建立了自己的部落格。分享我如何選擇平台、利用AI輔助、實現一鍵部署的全過程。',
    author: 'Ian Chou',
    tags: ['Vercel', 'Next.js', 'Blog', 'AI'],
    coverImage: '/images/posts/vercel-blog-setup-experience.png'
  },

  
  'comparing-cms-platforms-wispcms-tinacms-mdx-support-analysis': {
    title: '技術博客系統對比：從 WispCMS 到 TinaCMS 的選擇歷程與 MDX 支持分析',
    date: '2025-04-08',
    excerpt: '本文詳細記錄了我作為技術博主在尋找理想 CMS 平台的探索過程。從基於雲端的 WispCMS 到更靈活的 TinaCMS，我分享了每個系統的優缺點、使用體驗以及潛在的商業模式考量。文章特別關注了對 MDX 和 Page Bundle 的支持，以及跨 Next.js、Gatsby 和 Hugo 等框架的實際安裝體驗。對於考慮建立或遷移技術博客的開發者和內容創作者來說，這篇深入分析提供了寶貴的第一手經驗與見解。',
    author: 'Ian Chou',
    tags: ['CMS', 'WispCMS', 'TinaCMS', 'MDX', 'Page Bundle'],
    coverImage: '/images/posts/comparing-cms-platforms-wispcms-tinacms-mdx-support-analysis.png'
  },

  'fullstack-development-adventure-mdx-cloud-deployment-ai-workflow-experience': {
    title: '全棧開發探險記：MDX、雲端部署與AI輔助工作流程的實戰體驗',
    date: '2025-04-13',
    excerpt: '簡介： 本文記錄了我探索全棧開發的一天歷程，涵蓋MDX技術、各大部署平台比較、域名管理策略，以及如何利用Claude MCP等AI工具打造高效開發流程。從技術選型到實戰測試，分享了一位開發者如何結合AI助手與Git版本控制，勇敢嘗試新技術的真實體驗。無論你是前端開發者還是全棧愛好者，這篇探險日記都能給你帶來實用的工作流程啟發。',
    author: 'Ian Chou',
    tags: ['Fullstack', 'MDX', 'Cloud Deployment', 'AI Workflow'],
    coverImage: '/images/posts/fullstack-development-adventure-mdx-cloud-deployment-ai-workflow-experience.png'
  },
  
  'blog-exploring-react-workflow-contentlayer-tinacms': {
    title: 'React 開發日誌：從 Contentlayer 到 TinaCMS 的實用工作流程探索',
    date: '2025-04-11',
    excerpt: '在這篇技術探索日誌中，我深入研究了 React 開發生態系統中的 Contentlayer 和 TinaCMS 工具，解析它們的本質及應用場景。從 Contentlayer 的解析器功能到 TinaCMS 的實用性，我紀錄了在建立部落格過程中遇到的各種技術挑戰，包括 MDX 編輯困境、元件整合問題，以及與 AI 工具合作的經驗。這篇文章特別適合正在尋找理想前端開發工作流程的開發者，分享了我在多個 React 框架中的實際體驗和問題解決策略，讓讀者能從我的嘗試中獲取寶貴經驗。',
    author: 'Ian Chou',
    tags: ['Contentlayer', 'TinaCMS', 'React'],
    coverImage: '/images/posts/blog-exploring-react-workflow-contentlayer-tinacms.png'
  },


  'cms-journey-tinacms-to-wispcms-mdx': {
    title: 'CMS探險之旅：從TinaCMS到WispCMS的完整MDX支援解決方案',
    date: '2025-04-06',
    excerpt: '在這篇親身經歷的技術探索文章中，我分享了從TinaCMS到WispCMS的曲折旅程，以及尋找完美MDX支援解決方案的過程。文章詳細記錄了我在使用TinaCMS線上編輯功能時遇到的困境、Tailwind Starter的嘗試與挫折、本地編輯的成功經驗，以及最終選擇WispCMS的決定。對於任何正在尋找支援MDX格式的內容管理系統，或者面臨類似技術選型挑戰的開發者來說，這篇文章提供了寶貴的第一手經驗與反思。',
    author: 'Ian Chou',
    tags: ['TinaCMS', 'WispCMS', 'MDX'],
    coverImage: '/images/posts/cms-journey-tinacms-to-wispcms-mdx.png'
  },


  'automating-deployment-docusaurus-github-vercel-netlify': {
    title: 'Docusaurus與框架選擇實戰：2025年全棧開發者的深夜探索之旅',
    date: '2025-04-12',
    excerpt: '當失眠遇上開發靈感，會碰撞出怎樣的火花？本文記錄了一位全棧開發者在深夜探索 Docusaurus、前端框架選擇、自動化部署以及 AI 輔助開發的真實歷程。從 MDX 與 JSX 的思辨、網頁複製工具的挫折，到 AI 控制桌面應用的嘗試，這段技術冒險不僅展現了現代開發者面臨的選擇困境，也揭示了一個重要的開發哲學：有時候，找到合適的參考比無止境的技術比較更為重要。無論你是資深開發者還是新手，這篇文章都能讓你在技術選擇的迷霧中找到一絲方向。',
    author: 'Ian Chou',
    tags: ['Docusaurus', 'React', 'TypeScript'],
    coverImage: '/images/posts/automating-deployment-docusaurus-github-vercel-netlify.png'
  },
  'ai-powered-website-automation-claude-mcp-server-guide': {
    title: 'AI 驅動網站自動化建置全攻略：Claude MCP Server 實戰體驗與最佳實踐',
    date: '2025-04-10',
    excerpt: '探索 AI 輔助網站開發的新境界！本文詳述作者使用 Claude MCP Server 自動化建置網站的第一手經驗，從配置 Vercel 和 GitHub MCP Server，到部署 Next.js AI chatbot 的全過程。文章不僅展示了 AI 驅動開發的強大潛力，也坦誠分享了過程中遇到的挑戰與限制。無論您是技術愛好者、前端開發者，還是對 AI 協作開發感興趣的讀者，這篇實戰報告都將為您提供寶貴的洞見與實用技巧，幫助您在人機協作的開發模式中找到最佳平衡點。一場融合技術探索、失敗教訓與成功喜悅的真實開發冒險，等您來體驗！',
    author: 'Ian Chou',
    tags: ['Claude MCP Server', 'React', 'TypeScript'],
    coverImage: '/images/posts/ai-powered-website-automation-claude-mcp-server-guide.png'
  },
  'mdx-blog-setup': {
    title: '使用 MDX 建立部落格',
    date: '2024-05-11',
    excerpt: '了解如何整合 MDX 到 Next.js 專案中，讓您可以在 Markdown 中使用 React 組件。',
    author: 'Ian Chou',
    tags: ['MDX', 'Next.js', 'Blog'],
    coverImage: '/images/mdx-blog-setup.jpg'
  },

  'framer-motion-intro-guide': {
    title: 'Framer Motion 動畫入門與實戰指南',
    date: '2025-05-12',
    excerpt: '全面介紹 Framer Motion 動畫函式庫的優勢、基礎用法、進階互動與 Next.js 整合實戰技巧，適合現代 React/Next.js 開發者。',
    author: 'Ian Chou',
    tags: ['Framer Motion', 'React', 'Next.js', '動畫', '前端'],
    coverImage: '/images/framer-motion-intro-guide.jpg'
  },

  'typescript-best-practices': {
    title: 'TypeScript 最佳實踐',
    date: '2024-05-12',
    excerpt: '探索 TypeScript 開發中的最佳實踐，包括類型定義、泛型使用和常見陷阱。',
    author: 'Ian Chou',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    coverImage: '/images/typescript-best-practices.jpg'
  },

  'tailwind-css-tips': {
    title: 'Tailwind CSS 進階技巧',
    date: '2024-05-13',
    excerpt: '深入了解 Tailwind CSS 的進階使用技巧，包括自定義類別、組件化和效能優化。',
    author: 'Ian Chou',
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
