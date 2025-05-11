'use client';

import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  // 自定義組件映射
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-4 mt-6" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mb-3 mt-4" {...props} />,
  p: (props: any) => <p className="mb-6" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-6" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-6" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-6" {...props} />
  ),
  code: (props: any) => {
    if (props.className) {
      return <code {...props} />;
    }
    return <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props} />;
  },
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6" {...props} />
  ),
};

export default function MDXContent({ source }: MDXContentProps) {
  return <MDXRemote {...source} components={components} />;
}
