'use client';

import React, { useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXRendererProps {
  source: string;
  components: Record<string, React.ComponentType<any>>;
}

export default function MDXRenderer({ source, components }: MDXRendererProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processMDX = async () => {
      try {
        // 嘗試使用最簡單的 MDX 序列化選項
        const serialized = await serialize(source, {
          parseFrontmatter: true
        });

        setMdxSource(serialized);
        setError(null);
      } catch (err) {
        console.error('Error processing MDX:', err);
        setError('MDX 內容處理錯誤。請檢查控制台以獲取詳細信息。');
      }
    };
    
    processMDX();
  }, [source]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 rounded-md text-red-700">
        <h3 className="text-lg font-bold mb-2">錯誤</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!mdxSource) {
    return (
      <div className="p-4 text-center animate-pulse">
        <div className="inline-block px-4 py-2 rounded-md bg-gray-200">
          載入中...
        </div>
      </div>
    );
  }

  return (
    <div className="mdx-content prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}
