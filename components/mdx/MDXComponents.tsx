import React from 'react';
import CodeBlock from './CodeBlock';

interface MDXComponentsProps {
  [key: string]: React.ComponentType<any> | React.FC<any>;
}

export const mdxComponents: MDXComponentsProps = {
  // Override the default pre and code tags
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: CodeBlock,
  // Add more custom components here
};

export default mdxComponents;