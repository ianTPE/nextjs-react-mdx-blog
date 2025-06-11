

import React, { type ComponentType, type ReactNode } from 'react';
import CodeBlock from './CodeBlock';
// Import UI components from @/components/ui
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Renamed Table to UiTable to avoid conflict with local Table component if any
import { Badge } from '@/components/ui/badge';

import { 
  ProseWrapper, 
  BreakoutContainer, 
  FullWidth, 
  MediumWidth 
} from './global-components/ProseControl';

interface ComponentProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any; // Allow any other props from UI components
}

type MDXComponents = {
  // Allow any string key with a component that takes children
  [key: string]: ComponentType<any>;
} & {
  // Specific components with their exact prop types
  pre: ComponentType<{ children?: ReactNode }>;
  code: ComponentType<{ children?: ReactNode; className?: string }>;
  // Custom components
  Alert: ComponentType<ComponentProps>;
  AlertDescription: ComponentType<ComponentProps>;
  Card: ComponentType<ComponentProps>;
  CardContent: ComponentType<ComponentProps>;
  CardDescription: ComponentType<ComponentProps>;
  CardHeader: ComponentType<ComponentProps>;
  CardTitle: ComponentType<ComponentProps>;
  Tabs: ComponentType<ComponentProps & { defaultValue?: string; value?: string; onValueChange?: (value: string) => void; orientation?: 'horizontal' | 'vertical'; activationMode?: 'automatic' | 'manual'; dir?: 'ltr' | 'rtl' }>;
  TabsContent: ComponentType<ComponentProps & { value: string; forceMount?: true }>;
  TabsList: ComponentType<ComponentProps & { loop?: boolean }>;
  TabsTrigger: ComponentType<ComponentProps & { value: string; disabled?: boolean }>;
  // For table components, we map the PascalCase names used in MDX to the imported UI components
  Table: ComponentType<ComponentProps>;
  TableBody: ComponentType<ComponentProps>;
  TableCell: ComponentType<ComponentProps>;
  TableHead: ComponentType<ComponentProps>;
  TableHeader: ComponentType<ComponentProps>;
  TableRow: ComponentType<ComponentProps>;
  Badge: ComponentType<ComponentProps>;
  // Prose control components - 簡化類型定義
  ProseWrapper: ComponentType<ComponentProps>;
  BreakoutContainer: ComponentType<ComponentProps>;
  FullWidth: ComponentType<ComponentProps>;
  MediumWidth: ComponentType<ComponentProps>;
};

// Create a proper pre wrapper that preserves code blocks
function Pre({ children, ...props }: { children?: ReactNode; [key: string]: any }) {
  // Always wrap children in <pre> as this component replaces MDX's default <pre>
  return <pre {...props}>{children}</pre>;
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
  // HTML elements - these will map to the UI components if MDX uses lowercase tags
  // For now, we assume MDX uses PascalCase for these UI components, so direct mapping is below.
  // If lowercase tags like <table> are used and should map to UI components, these would need adjustment.
  // table: UiTable, // Example if <table> should use UiTable

  // Custom components & UI Components from @/components/ui
  Alert: Alert,
  AlertDescription: AlertDescription,
  Card: Card,
  CardContent: CardContent,
  CardDescription: CardDescription,
  CardHeader: CardHeader,
  CardTitle: CardTitle,
  Tabs: Tabs,
  TabsContent: TabsContent,
  TabsList: TabsList,
  TabsTrigger: TabsTrigger,
  // Mapping PascalCase MDX component names to the imported UI table components
  Table: UiTable, // If MDX uses <Table>, it maps to UiTable
  TableBody: TableBody,
  TableCell: TableCell,
  TableHead: TableHead,
  TableHeader: TableHeader,
  TableRow: TableRow,
  Badge: Badge,
  
  // Prose control components
  ProseWrapper: ProseWrapper as ComponentType<ComponentProps>,
  BreakoutContainer: BreakoutContainer as ComponentType<ComponentProps>,
  FullWidth: FullWidth as ComponentType<ComponentProps>,
  MediumWidth: MediumWidth as ComponentType<ComponentProps>,
} as const;

export default mdxComponents;