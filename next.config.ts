import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import path from 'path';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkExtractHeadings from './lib/remark-extract-headings.mjs';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // 可以在這裡加入 MDX 的相關設定
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkExtractHeadings],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ],
  }
});

const nextConfig: NextConfig = {
  // 加入 mdx、md 副檔名
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // 禁用 ESLint 檢查以避免構建錯誤
  eslint: {
    // 如果 ESLint 錯誤阻止構建，請設置為 false
    ignoreDuringBuilds: true,
  },
  // Turbopack 配置 (已穩定)
  turbopack: {
    resolveAlias: {
      '@content': './content',
    },
  },
  // 添加 webpack 配置以支持內容目錄路徑解析（Webpack 模式時使用）
  webpack: (config, { dev }) => {
    // 只在 webpack 模式下設置別名
    if (!dev || !process.env.TURBOPACK) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@content': path.join(process.cwd(), 'content'),
      };
    }
    
    return config;
  },
};

export default withMDX(nextConfig);
