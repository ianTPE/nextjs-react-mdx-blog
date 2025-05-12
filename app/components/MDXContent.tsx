'use client';

import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ComponentPropsWithoutRef } from 'react';
import CodeBlock from '@/components/mdx/CodeBlock';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  // Custom component mapping
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="text-3xl font-bold mb-4 mt-6" {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="text-2xl font-bold mb-3 mt-4" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mb-6" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc list-inside mb-6" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal list-inside mb-6" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="mb-2" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-6" {...props} />
  ),
  
  // For inline code (not in a pre block)
  code: (props: ComponentPropsWithoutRef<'code'> & { className?: string }) => {
    const { className, ...rest } = props;
    
    // If className exists, it's a code block, otherwise it's inline code
    if (className) {
      return <CodeBlock className={className} {...rest} />;
    }
    
    // Inline code styling
    return <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...rest} />;
  },
  
  // We don't need to style pre elements directly as CodeBlock handles that
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <pre {...props} />,
};

export default function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />;
}
