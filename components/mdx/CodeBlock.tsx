import React, { ReactNode, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

type CodeBlockProps = {
  children: ReactNode;
  className?: string;
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
    // Added max-w-full to ensure code block doesn't exceed container width
    <div className="relative max-w-full">
      <Highlight 
        theme={themes.vsDark}
        code={content.trim()}
        language={language || 'jsx'}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`${highlightClassName} rounded-lg overflow-x-auto my-6 w-full`} 
            style={{ 
              ...style,
              // Ensure text doesn't wrap and scrollbar appears instead
              overflowX: 'auto',
              // Prevent extending beyond container
              maxWidth: '100%',
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
            
            {/* Code content - without line numbers */}
            <div className="p-4 overflow-x-auto">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </div>
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;