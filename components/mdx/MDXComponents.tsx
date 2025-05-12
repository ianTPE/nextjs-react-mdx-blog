import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';

const MDXComponents = {
  // Keep the pre element but add any custom styling
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => <pre {...props} />,
  
  // Override code tags with our custom CodeBlock
  code: CodeBlock,
  
  // You can add more custom components for MDX here
};

export default MDXComponents;