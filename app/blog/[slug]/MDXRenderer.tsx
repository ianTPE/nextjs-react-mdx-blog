import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import defaultMDXComponents from '@/components/mdx/MDXComponents';
import CodeBlock from '@/components/mdx/CodeBlock';
import { Prose } from '@/components/ui/prose';

interface MDXRendererProps {
  source: string;
  components: Record<string, React.ComponentType<any>>;
}

export default function MDXRenderer({ source, components }: MDXRendererProps) {
  // Let custom components override defaults to avoid conflicts
  const mergedComponents = {
    ...defaultMDXComponents,
    CodeBlock,
    ...components
  };
  
  return (
    <Prose variant="blog" size="lg" className="mdx-content max-w-none">
      <MDXRemote source={source} components={mergedComponents as any} />
    </Prose>
  );
}