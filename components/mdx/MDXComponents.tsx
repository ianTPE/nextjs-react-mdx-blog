import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';

const MDXComponents = {
  // Keep the pre element but add any custom styling
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => <pre {...props} />,
  
  // Override code tags with our custom CodeBlock
  code: CodeBlock,
  
  // 自定義組件可以在全局添加，或者由 MDX 文件局部導入
};

export default MDXComponents;