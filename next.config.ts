import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import path from 'path';
import type { Node } from 'unist';

// Define a more specific node type that includes children
interface MdxNode extends Node {
  children?: Array<{ type: string; value: string }>;
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // 可以在這裡加入 MDX 的相關設定
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [
      () => (tree: any) => {
        // 行號格式化
        const onVisitLine = (node: MdxNode) => {
          // 防止空行被移除
          if (node.children && node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
          }
        };
        
        return tree;
      }
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
  // 添加 webpack 配置以支持內容目錄路徑解析
  webpack: (config) => {
    // 添加路徑別名，使 @content 指向 content 目錄
    config.resolve.alias = {
      ...config.resolve.alias,
      '@content': path.join(process.cwd(), 'content'),
    };
    
    return config;
  },
};

export default withMDX(nextConfig);
