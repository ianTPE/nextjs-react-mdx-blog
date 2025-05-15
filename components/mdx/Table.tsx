import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// Base props for table components
type TableProps = ComponentPropsWithoutRef<'table'> & {
  children?: ReactNode;
  className?: string;
};

type TableSectionProps = ComponentPropsWithoutRef<'thead' | 'tbody'> & {
  children?: ReactNode;
  className?: string;
};

type TableCellProps = ComponentPropsWithoutRef<'th' | 'td'> & {
  children?: ReactNode;
  className?: string;
};

type TableRowProps = ComponentPropsWithoutRef<'tr'> & {
  children?: ReactNode;
  className?: string;
};

// Table component
export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="overflow-x-auto my-4">
      <table 
        className={`min-w-full border-collapse border border-gray-200 ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

// Table Head component
export function THead({ children, className = '', ...props }: TableSectionProps) {
  return (
    <thead className={`bg-gray-50 ${className}`} {...props}>
      {children}
    </thead>
  );
}

// Table Body component
export function TBody({ children, className = '', ...props }: TableSectionProps) {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`} {...props}>
      {children}
    </tbody>
  );
}

// Table Header Cell component
export function Th({ children, className = '', ...props }: TableCellProps) {
  return (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

// Table Data Cell component
export function Td({ children, className = '', ...props }: TableCellProps) {
  return (
    <td 
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

// Table Row component
export function Tr({ children, className = '', ...props }: TableRowProps) {
  return (
    <tr className={`hover:bg-gray-50 ${className}`} {...props}>
      {children}
    </tr>
  );
}
