'use client';

import { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXContent from '@/app/components/MDXContent';
import path from 'path';

interface ClientMDXContentProps {
  content: string;
  slug?: string;
}

export default function ClientMDXContent({ content, slug }: ClientMDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const processMDX = async () => {
      // 啟用 MDX 文件中的 import 語句
      const serialized = await serialize(content, {
        // 啟用 mdx 導入
        parseFrontmatter: true,
        mdxOptions: {
          development: process.env.NODE_ENV === 'development',
          // 告訴 MDX 可能從當前 slug 目錄中導入組件
          ...((slug && process.env.NODE_ENV === 'development') ? {
            baseDirectory: path.join(process.cwd(), 'content/posts', slug)
          } : {})
        },
      });
      setMdxSource(serialized);
    };
    
    processMDX();
  }, [content, slug]);

  if (!mdxSource) {
    return <div>載入中...</div>;
  }

  return <MDXContent source={mdxSource} />;
}
