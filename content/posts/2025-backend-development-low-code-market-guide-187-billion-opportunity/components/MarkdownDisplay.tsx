'use client';
import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import type { LiHTMLAttributes } from 'react';

// Extended interface for list item props to include the 'checked' property from remark-gfm
interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  checked?: boolean;
  node?: unknown;
}

interface MarkdownDisplayProps {
  content: string;
  className?: string;
}

/**
 * Optimised MarkdownDisplay component.
 *
 * Key improvements:
 * 1. **Removed `style jsx global`** to avoid re‑injecting the same CSS on every render.
 * 2. **Replaced custom CSS with Tailwind utility & Typography plugin classes** for smaller bundle size and easier theming.
 * 3. **Dark‑mode support** via `dark:` variants and `prose-invert`.
 * 4. **`React.memo`** wraps the component to skip re‑renders when props are identical.
 * 5. **Accessible task‑list checkboxes** that mirror `checked` state with `aria-checked` and keyboard focus styles.
 * 6. **Custom renderers** for headings, lists, and list items to keep markup semantic while controlling styling.
 */
const MarkdownDisplay = memo(({ content, className }: MarkdownDisplayProps) => {
  return (
    <article
      className={clsx(
        'prose prose-slate dark:prose-invert bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({ ...props }) => (
            <ul {...props} className="list-disc marker:text-blue-500 pl-6" />
          ),
          li: ({ checked, ...props }: ListItemProps) => {
            // GitHub task‑lists expose a `checked` prop when remark-gfm is used.
            if (typeof checked === 'boolean') {
              return (
                <li className="flex items-start">
                  <input
                    type="checkbox"
                    readOnly
                    checked={checked}
                    aria-checked={checked}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="flex-1" {...props} />
                </li>
              );
            }
            return <li {...props} />;
          },
          h2: ({ ...props }) => (
            <h2
              {...props}
              className="mt-0 mb-4 text-2xl font-semibold border-b-2 border-gray-200 dark:border-gray-700 pb-3"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
});

MarkdownDisplay.displayName = 'MarkdownDisplay';

export default MarkdownDisplay;
