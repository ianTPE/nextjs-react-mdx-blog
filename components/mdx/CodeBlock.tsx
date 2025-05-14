'use client';

import type { FC } from 'react';
import type { Language } from 'prism-react-renderer';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, className }) => {
  // Extract the language from className (format: language-xxx)
  const language = className ? className.replace(/language-/, '') : 'typescript';
  
  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-zinc-700 bg-black text-white">
      <Highlight 
        theme={themes.vsDark}
        code={children.trim()}
        language={language as Language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} overflow-auto p-4`} style={{
            ...style,
            backgroundColor: 'transparent',
            margin: 0,
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