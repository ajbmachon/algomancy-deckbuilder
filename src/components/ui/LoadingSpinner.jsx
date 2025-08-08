import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Small loading spinner for inline use
 */
export function LoadingSpinner({ className, size = 'sm' }) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <svg
      className={cn('animate-spin', sizeClasses[size], className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/**
 * Loading indicator with text
 */
export function LoadingIndicator({ text = 'Loading...', className }) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      <LoadingSpinner size="sm" />
      <span>{text}</span>
    </div>
  );
}
