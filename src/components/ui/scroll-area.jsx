import * as React from 'react';
import { cn } from '@/lib/utils';

// Lightweight ScrollArea that avoids Radix to prevent invalid hook call issues on React 19
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('relative overflow-auto', className)} {...props}>
      {children}
    </div>
  );
});
ScrollArea.displayName = 'ScrollArea';

// No-op ScrollBar export to maintain API compatibility where imported
const ScrollBar = React.forwardRef(function ScrollBar(_props, _ref) {
  return null;
});
ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
