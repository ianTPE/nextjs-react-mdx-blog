'use client';

import React, { useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import defaultMDXComponents from '@/components/mdx/MDXComponents';
import { Mermaid } from '@/components/mdx/global-components';
import CodeBlock from '@/components/mdx/CodeBlock';

interface MDXRendererProps {
  source: string;
  slug: string;
}

// Global components map that includes our global components
const globalComponents = {
  Mermaid,
  CodeBlock,
  // Default components for markdown elements
  ...defaultMDXComponents
};

export default function MDXRenderer({ source, slug }: MDXRendererProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [components, setComponents] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load post-specific components first
  useEffect(() => {
    const loadComponents = async () => {
      try {
        setIsLoading(true);
        // Try to dynamically import post-specific components
        const postComponents = await import(`@content/posts/${slug}/components/index`);
        
        // Merge with global components
        const mergedComponents = {
          ...globalComponents,
          ...postComponents
        };
        
        setComponents(mergedComponents);
        console.log(`Loaded components for ${slug}:`, Object.keys(postComponents));
      } catch (err) {
        // If no post-specific components, just use global ones
        console.log(`No custom components for post: ${slug}`);
        setComponents(globalComponents);
      } finally {
        setIsLoading(false);
      }
    };

    loadComponents();
  }, [slug]);

  // Process MDX only after components are loaded
  useEffect(() => {
    if (!components || isLoading) return;
    
    const processMDX = async () => {
      try {
        console.log('Processing MDX with components:', Object.keys(components));
        console.log('Source content preview:', source.substring(0, 500));
        console.log('Source content length:', source.length);
        
        // Check if content is being treated as a single code block
        if (source.trim().startsWith('```') && source.trim().endsWith('```')) {
          console.warn('Content appears to be wrapped in code block markers');
        }
        
        const serialized = await serialize(source, {
          parseFrontmatter: false,
          mdxOptions: {
            development: process.env.NODE_ENV === 'development',
            format: 'mdx'
          }
        });

        setMdxSource(serialized);
        setError(null);
      } catch (err) {
        console.error('Error processing MDX:', err);
        setError('MDX 內容處理錯誤。請檢查控制台以獲取詳細信息。');
      }
    };
    
    processMDX();
  }, [source, components, isLoading]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-300 rounded-md text-red-700">
        <h3 className="text-lg font-bold mb-2">錯誤</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading || !components || !mdxSource) {
    return (
      <div className="p-4 text-center animate-pulse">
        <div className="inline-block px-4 py-2 rounded-md bg-gray-200">
          載入中...
        </div>
      </div>
    );
  }

  return (
    <div className="mdx-content prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}