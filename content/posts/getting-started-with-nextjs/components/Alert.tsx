'use client';

import React from 'react';

interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

const typeStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    title: 'text-blue-800',
    content: 'text-blue-700'
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    title: 'text-yellow-800',
    content: 'text-yellow-700'
  },
  error: {
    container: 'bg-red-50 border-red-200',
    title: 'text-red-800',
    content: 'text-red-700'
  },
  success: {
    container: 'bg-green-50 border-green-200',
    title: 'text-green-800',
    content: 'text-green-700'
  }
};

export default function Alert({ type = 'info', title, children }: AlertProps) {
  const styles = typeStyles[type];
  
  return (
    <div className={`p-4 mb-4 rounded border ${styles.container}`}>
      {title && (
        <h4 className={`text-lg font-medium mb-2 ${styles.title}`}>
          {title}
        </h4>
      )}
      <div className={`${styles.content}`}>
        {children}
      </div>
    </div>
  );
}
