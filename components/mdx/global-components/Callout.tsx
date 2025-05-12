'use client';

import React from 'react';

interface CalloutProps {
  emoji?: string;
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ emoji = '💡', title, children }: CalloutProps) {
  return (
    <div className="p-4 my-6 rounded-lg bg-gray-50 border border-gray-200">
      <div className="flex items-start">
        <div className="text-2xl mr-4 select-none">{emoji}</div>
        <div>
          {title && (
            <h4 className="text-lg font-medium mb-2 text-gray-900">{title}</h4>
          )}
          <div className="text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
