'use client';

import type { FC } from 'react';
import { useState } from 'react';
import type { Language } from 'prism-react-renderer';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  
  // Extract the language from className (format: language-xxx)
  const language = className ? className.replace(/language-/, '') : 'typescript';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-zinc-700 bg-black text-white">
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute right-3 top-3 rounded bg-zinc-700 px-2 py-1 text-xs text-white hover:bg-zinc-600 transition-colors"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <Highlight 
        theme={themes.vsDark}
        code={children.trim()}
        language={language as Language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} overflow-auto py-6 px-4`} style={{
            ...style,
            backgroundColor: 'transparent',
            margin: 0,
            paddingLeft: '1.5rem',
          }}>
            {tokens.map((line, lineIndex) => (
              <div key={`line-${lineIndex}`} {...getLineProps({ line, key: `line-${lineIndex}` })}>
                {line.map((token, tokenIndex) => (
                  <span key={`token-${lineIndex}-${tokenIndex}`} {...getTokenProps({ token, key: tokenIndex })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;