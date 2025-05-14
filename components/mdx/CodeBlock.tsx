import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  // Extract the language from className (format: language-xxx)
  const language = className ? className.replace(/language-/, '') : 'typescript';
  
  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
      <Highlight 
        theme={themes.vsDark}
        code={children.trim()}
        language={language as any}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} overflow-auto p-4`} style={{
            ...style,
            backgroundColor: 'transparent',
            margin: 0,
          }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none opacity-50">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
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