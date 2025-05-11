'use client';

import { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MDXContent from '@/app/components/MDXContent';

interface ClientMDXContentProps {
  content: string;
}

export default function ClientMDXContent({ content }: ClientMDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const processMDX = async () => {
      const serialized = await serialize(content);
      setMdxSource(serialized);
    };
    
    processMDX();
  }, [content]);

  if (!mdxSource) {
    return <div>載入中...</div>;
  }

  return <MDXContent source={mdxSource} />;
}
