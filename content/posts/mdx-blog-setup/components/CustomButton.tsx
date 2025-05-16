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
    bg-white text-blue-600 font-semibold
    border-2 border-blue-600
    rounded-full
    hover:bg-blue-50
    focus:outline-none focus:ring-2 focus:ring-blue-300
    transition-all duration-200
    ${className}
  `}
>
  {children}
</button>
  );
};

export default CustomButton;
