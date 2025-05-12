import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';

const MDXComponents = {
  // Override pre tags by just passing along props
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <div {...props} />,
  
  // Override code tags with our custom CodeBlock
  code: CodeBlock,
  
  // You can add more custom components for MDX here
};

export default MDXComponents;