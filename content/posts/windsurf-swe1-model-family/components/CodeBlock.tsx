'use client';

import React from 'react';
import GlobalCodeBlock from '@/components/mdx/CodeBlock';

// Re-export the global CodeBlock component to satisfy the import requirements
const CodeBlock = (props: { children: string; className?: string }) => {
  return <GlobalCodeBlock {...props} />;
};

export default CodeBlock;
