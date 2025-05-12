'use client';

import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import CodeBlock from '@/components/mdx/CodeBlock';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

// Type for code element props (which can have className)
interface CodeProps extends ComponentPropsWithoutRef<'code'> {
  className?: string;
  children?: ReactNode;
}

const components = {
  // Custom component mapping
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="text-3xl font-bold mb-4 mt-6" {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="text-2xl font-bold mb-3 mt-4" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mb-6 max-w-full overflow-hidden" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc list-inside mb-6" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal list-inside mb-6" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="mb-2" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-6" {...props} />
  ),
  
  // For both code blocks and inline code
  code: (props: CodeProps) => {
    const { className, children, ...rest } = props;
    
    // If className exists, it's a code block, otherwise it's inline code
    if (className?.includes('language-')) {
      return <CodeBlock className={className} children={children} />;
    }
    
    // Inline code styling
    return <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...rest}>{children}</code>;
  },
  
  // We need minimal pre styling since CodeBlock handles most of it
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <div className="max-w-full overflow-x-hidden">
      <pre className="m-0 p-0 bg-transparent max-w-full" {...props} />
    </div>
  ),
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="max-w-full overflow-hidden">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
