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
  // 其他自訂設定...
};

export default withMDX(nextConfig);
