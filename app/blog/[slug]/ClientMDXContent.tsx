'use client';

import { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXContent from '@/app/components/MDXContent';
import mdxComponents from '@/components/mdx/MDXComponents';

interface ClientMDXContentProps {
  content: string;
  slug?: string;
}

export default function ClientMDXContent({ content, slug }: ClientMDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const processMDX = async () => {
      try {
        console.log('Processing MDX for slug:', slug);
        
        // 嘗試一個更簡單的方法，不使用複雜的 mdxOptions
        const serialized = await serialize(content, {
          parseFrontmatter: true,
        });
        
        console.log('MDX serialized successfully');
        setMdxSource(serialized);
      } catch (error) {
        console.error('Error processing MDX:', error);
      }
    };
    
    processMDX();
  }, [content, slug]);

  if (!mdxSource) {
    return <div>載入中...</div>;
  }

  return <MDXContent source={mdxSource} components={mdxComponents} />;
}
