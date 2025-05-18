'use client';

import type { ComponentType, ReactNode } from 'react';
import CodeBlock from './CodeBlock';
import { Table, THead, TBody, Th, Td, Tr } from './Table';
import AlertComponent from './global-components/Alert';  // 重命名導入以避免名稱衝突

type ComponentProps = {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

type MDXComponents = {
  // Allow any string key with a component that takes children
  [key: string]: ComponentType<ComponentProps>;
} & {
  // Specific components with their exact prop types
  pre: ComponentType<{ children?: ReactNode }>;
  code: ComponentType<{ children?: ReactNode; className?: string }>;
  table: ComponentType<{ children?: ReactNode; className?: string }>;
  thead: ComponentType<{ children?: ReactNode; className?: string }>;
  tbody: ComponentType<{ children?: ReactNode; className?: string }>;
  th: ComponentType<{ children?: ReactNode; className?: string }>;
  td: ComponentType<{ children?: ReactNode; className?: string }>;
  tr: ComponentType<{ children?: ReactNode; className?: string }>;
  // Custom components
  Alert: ComponentType<ComponentProps & {
    type?: 'info' | 'warning' | 'error' | 'success';
    title?: string;
  }>;
};

// Create a simple wrapper for the pre tag
function Pre({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

// Create a wrapper for the code block to ensure it gets a string as children
function CodeBlockWrapper({ children, className = '' }: { children?: ReactNode; className?: string }) {
  const code = typeof children === 'string' ? children : '';
  return <CodeBlock className={className}>{code}</CodeBlock>;
}

// Create the components object with proper typing
export const mdxComponents: MDXComponents = {
  // Override the default pre and code tags
  pre: Pre,
  code: CodeBlockWrapper,
  // HTML elements
  table: Table,
  thead: THead,
  tbody: TBody,
  th: Th,
  td: Td,
  tr: Tr,
  
  // Custom components
  Alert: AlertComponent,
} as const;

export default mdxComponents;