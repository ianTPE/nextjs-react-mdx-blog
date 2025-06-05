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
    <div className="overflow-x-auto">
      <table 
        className={`min-w-full border-collapse border-2 border-gray-300 ${className}`}
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
    <thead className={`bg-gray-100 ${className}`} {...props}>
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
      className={`px-6 py-0 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-2 border-gray-300 ${className}`}
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
      className={`px-6 py-1 text-sm text-gray-600 border border-gray-300 ${className}`}
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
