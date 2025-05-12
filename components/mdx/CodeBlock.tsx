'use client';

import React, { ReactNode, useState } from 'react';

type CodeBlockProps = {
  children: ReactNode;
  className?: string;
};

// Define some simple syntax highlighting classes
const getTokenStyle = (token: string, language: string): string => {
  // Simple highlighting for keywords in various languages
  if (language === 'javascript' || language === 'jsx' || language === 'typescript' || language === 'tsx') {
    if (/\b(const|let|var|function|return|import|export|from|class|extends|if|else|for|while|switch|case|default|break|continue|try|catch|finally|throw|async|await)\b/.test(token)) {
      return 'text-purple-400'; // keywords
    } else if (/^(["'`]).*\1$/.test(token)) {
      return 'text-green-400'; // strings
    } else if (/\b(true|false|null|undefined|NaN|Infinity)\b/.test(token)) {
      return 'text-yellow-400'; // literals
    } else if (/\b(console|Math|Date|document|window|Array|Object|String|Number|Boolean)\b/.test(token)) {
      return 'text-blue-400'; // built-ins
    } else if (/\b\d+\b/.test(token)) {
      return 'text-orange-400'; // numbers
    } else if (/^\s*\/\/.*$/.test(token)) {
      return 'text-gray-500'; // comments
    }
  } else if (language === 'html' || language === 'xml') {
    if (/<\/?[a-zA-Z][\w-]*/.test(token)) {
      return 'text-red-400'; // tags
    } else if (/\b[a-zA-Z][\w-]*=/.test(token)) {
      return 'text-yellow-400'; // attributes
    } else if (/^(["'`]).*\1$/.test(token)) {
      return 'text-green-400'; // strings
    }
  } else if (language === 'css') {
    if (/^[.#][a-zA-Z][\w-]*/.test(token)) {
      return 'text-yellow-400'; // selectors
    } else if (/^[a-zA-Z][\w-]*:/.test(token)) {
      return 'text-blue-400'; // properties
    } else if (/^#[0-9a-fA-F]{3,6}$/.test(token)) {
      return 'text-orange-400'; // hex colors
    }
  }
  
  return ''; // default, no specific styling
};

// Function to create simple highlighted tokens
const highlightCode = (code: string, language: string): ReactNode[] => {
  // Split by spaces and new lines while preserving them
  const tokens = code.split(/(\s+)/g);
  
  return tokens.map((token, index) => {
    const style = getTokenStyle(token, language);
    return (
      <span key={index} className={style}>
        {token}
      </span>
    );
  });
};

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  // State for showing "Copied!" feedback
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (e.g., language-javascript)
  const language = className ? className.replace(/language-/, '') : '';
  
  // Convert children to string safely
  let content = '';
  if (typeof children === 'string') {
    content = children;
  } else if (children !== null && children !== undefined) {
    content = String(children);
  }
  
  // If there's no content or no language specified, return a simple code tag
  if (!content || !language) {
    return <code className={className || 'text-sm bg-gray-100 dark:bg-gray-800 p-1 rounded'}>{children}</code>;
  }
  
  // Handle copy button click
  const handleCopy = () => {
    navigator.clipboard.writeText(content.trim()).then(() => {
      setCopied(true);
      // Reset "Copied!" state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    // Use relative positioning but avoid setting width constraints that could affect parent layout
    <div className="relative">
      <pre 
        className={`language-${language} rounded-lg overflow-x-auto my-6 bg-gray-900 text-gray-100`}
        style={{ 
          // Ensure text doesn't wrap and scrollbar appears instead
          overflowX: 'auto',
          // Add some padding bottom to ensure scrollbar doesn't overlap code
          paddingBottom: '0.5rem'
        }}
      >
        {/* Header with language tag and copy button */}
        <div className="sticky left-0 flex justify-between items-center px-4 py-2 text-xs text-gray-400 border-b border-gray-700 bg-inherit">
          <span className="font-bold uppercase tracking-wider">{language}</span>
          <button 
            onClick={handleCopy}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs transition-colors"
            aria-label="Copy code"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        {/* Code content with simple token-based highlighting */}
        <div className="p-4 overflow-x-auto font-mono">
          {content.split('\n').map((line, i) => (
            <div key={i} className="whitespace-pre">
              {highlightCode(line, language)}
            </div>
          ))}
        </div>
      </pre>
    </div>
  );
};

export default CodeBlock;