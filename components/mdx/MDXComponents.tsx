import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';
import VersionComparisonTable from './VersionComparisonTable';

const MDXComponents = {
  // Keep the pre element but add any custom styling
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => <pre {...props} />,
  
  // Override code tags with our custom CodeBlock
  code: CodeBlock,
  
  // Custom components for MDX
  VersionComparisonTable: VersionComparisonTable,
};

export default MDXComponents;