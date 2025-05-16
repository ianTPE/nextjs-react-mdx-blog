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
    px-5 py-3
    bg-gradient-to-r from-blue-500 to-indigo-600
    text-white font-medium
    rounded-xl
    shadow-lg
    hover:from-blue-600 hover:to-indigo-700
    active:scale-95
    transform transition duration-150
    focus:outline-none focus:ring-4 focus:ring-indigo-300
    ${className}
  `}
>
  {children}
</button>
  );
};

export default CustomButton;
