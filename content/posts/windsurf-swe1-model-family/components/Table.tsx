'use client';

// Import the global Table components for reuse
import { 
  Table as GlobalTable, 
  THead as GlobalTHead,
  TBody as GlobalTBody,
  Th as GlobalTh,
  Td as GlobalTd,
  Tr as GlobalTr 
} from '@/components/mdx/Table';

// Re-export the components for use in the post
export const Table = GlobalTable;
export const THead = GlobalTHead;
export const TBody = GlobalTBody;
export const Th = GlobalTh;
export const Td = GlobalTd;
export const Tr = GlobalTr;

export default Table;
