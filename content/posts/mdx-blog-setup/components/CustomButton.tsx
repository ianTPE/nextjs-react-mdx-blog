'use client';

import { useCallback, type ReactNode } from 'react';

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  message?: string;
}

const CustomButton = ({ 
  children, 
  className = '',
  message = 'Hello MDX!',
}: CustomButtonProps) => {
  const handleClick = useCallback(() => {
    alert(message);
  }, [message]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        px-4 py-2 
        bg-blue-600 text-white 
        rounded-lg 
        hover:bg-blue-700 
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default CustomButton;
