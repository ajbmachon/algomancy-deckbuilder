import React from 'react';
import { cn } from '@/lib/utils';

// Hook-free simple ScrollArea
function ScrollArea({ className, children, ...props }) {
  return (
    <div className={cn('relative overflow-auto', className)} {...props}>
      {children}
    </div>
  );
}

function ScrollBar() {
  return null;
}

export { ScrollArea, ScrollBar };
