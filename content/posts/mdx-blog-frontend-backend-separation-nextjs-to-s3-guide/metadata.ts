// content/posts/mdx-blog-frontend-backend-separation-nextjs-to-s3-guide/metadata.ts
import type { PostMeta } from '../../../types/post';

const metadata: PostMeta = {
  slug: "mdx-blog-frontend-backend-separation-nextjs-to-s3-guide",
  title: "MDX 部落格如何實現前後端分離？從 Next.js 單體到 API Route + S3 的完整升級路徑",
  date: "2025-06-06",
  summary: "深入探討 MDX 部落格架構的完整演進路徑，從文件系統單體架構到前後端分離 + 雲端儲存解決方案。包含三階段漸進式升級方案、Cloudflare R2 vs AWS S3 詳細比較、完整實現代碼和最佳實踐指導。",
  tags: ["Next.js", "MDX", "Cloudflare R2", "前後端分離", "API Routes", "架構設計", "AWS S3"],
  published: true,
  author: "Ian Chou",
  coverImage: "/images/posts/mdx-blog-separation.webp",
};

export default metadata;
