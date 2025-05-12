'use client';

import React from 'react';

export function createFallbackComponent(name: string) {
  return function FallbackComponent(props: any) {
    return (
      <div className="p-4 border border-yellow-500 bg-yellow-50 rounded">
        <p className="text-yellow-700">
          組件 "{name}" 未找到。請確保該組件已正確導出。
        </p>
      </div>
    );
  };
}
