'use client';

import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ComponentPropsWithoutRef } from 'react';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  // 自定義組件映射
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
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    const { className, ...rest } = props;
    if (className) {
      return <code className={className} {...rest} />;
    }
    return <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...rest} />;
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6" {...props} />
  ),
};

export default function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />;
}
