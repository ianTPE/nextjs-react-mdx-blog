import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from './MDXComponents';

type MDXContentProps = {
  children: React.ReactNode;
};

const MDXContent = ({ children }: MDXContentProps) => {
  return <MDXProvider components={MDXComponents}>{children}</MDXProvider>;
};

export default MDXContent;