import React from 'react';
import { Skeleton } from './skeleton';
import { Card } from './card';
import { cn } from '@/lib/utils';

/**
 * Loading skeleton for cards with shimmer animation
 */
export function LoadingCard({ className }) {
  return (
    <Card
      className={cn(
        'card-container relative group overflow-hidden border-2 transition-all duration-300',
        'rounded-xl backdrop-blur-sm bg-black/20',
        'w-full aspect-[2/3] max-w-[216px] mx-auto',
        'border-primary/20',
        className
      )}
    >
      {/* Main card image area with shimmer */}
      <div className="h-full w-full overflow-hidden rounded-lg flex items-center justify-center relative">
        <Skeleton className="absolute inset-0 bg-primary/5">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </Skeleton>

        {/* Placeholder icon in center */}
        <div className="relative z-10 w-12 h-12 rounded-lg bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-primary/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      {/* Cost Badge skeleton */}
      <Skeleton className="absolute top-1 left-1 w-8 h-6 rounded-lg bg-primary/10 border border-primary/20">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </Skeleton>
    </Card>
  );
}

/**
 * Grid of loading cards
 */
export function LoadingCardGrid({ count = 12, className }) {
  const gridClass = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';

  return (
    <div className={cn('grid', gridClass, className)}>
      {Array.from({ length: count }, (_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
