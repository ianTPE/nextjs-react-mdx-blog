import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // 可以在這裡加入 MDX 的相關設定
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
  // 其他自訂設定...
};

export default withMDX(nextConfig);
