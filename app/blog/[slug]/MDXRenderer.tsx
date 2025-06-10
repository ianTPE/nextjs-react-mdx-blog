
import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import defaultMDXComponents from '@/components/mdx/MDXComponents';
import { Mermaid } from '@/components/mdx/global-components';
import CodeBlock from '@/components/mdx/CodeBlock';
import { Prose } from '@/components/ui/prose';

interface MDXRendererProps {
  source: MDXRemoteSerializeResult;
  components: Record<string, React.ComponentType<any>>;
}

export default function MDXRenderer({ source, components }: MDXRendererProps) {
  const allComponents = {
    ...defaultMDXComponents,
    Mermaid,
    CodeBlock,
    ...components,
  };

  return (
    <Prose variant="blog" size="lg" className="mdx-content max-w-none">
      <MDXRemote {...source} components={allComponents} />
    </Prose>
  );
}