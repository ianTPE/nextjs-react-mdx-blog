import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

type CodeBlockProps = {
  children: string;
  className?: string;
};

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  // Extract language from className (e.g., language-javascript)
  const language = className ? className.replace(/language-/, '') : '';
  
  // If there are no children or it's not a string, just return a code tag
  if (!children || typeof children !== 'string') {
    return <code className={className}>{children}</code>;
  }
  
  return (
    <Highlight 
      theme={themes.vsDark} // You can choose other themes like github, dracula, nightOwl, etc.
      code={children.trim()}
      language={language || 'jsx'} // Default to jsx if no language is specified
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} rounded-lg overflow-auto my-6`} style={{ ...style }}>
          {/* Language tag */}
          {language && (
            <div className="flex justify-end px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
              <span className="font-bold uppercase tracking-wider">{language}</span>
            </div>
          )}
          
          {/* Code content */}
          <div className="p-4">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })} className="flex">
                {/* Line number */}
                <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">
                  {i + 1}
                </span>
                {/* Actual code */}
                <span className="flex-1">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;