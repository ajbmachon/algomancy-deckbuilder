import React from 'react';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

/**
 * Compact sort controls
 */
export function SortControls({ sortBy, sortDir, setSortBy, setSortDir }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Sort controls">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSortBy('name')}
        className={`h-7 text-xs px-2 ${sortBy === 'name' ? 'text-foreground bg-muted/40' : 'text-muted-foreground'}`}
        aria-pressed={sortBy === 'name'}
        aria-label="Sort by name"
      >
        Name
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSortBy('cost')}
        className={`h-7 text-xs px-2 ${sortBy === 'cost' ? 'text-foreground bg-muted/40' : 'text-muted-foreground'}`}
        aria-pressed={sortBy === 'cost'}
        aria-label="Sort by cost"
      >
        Cost
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
        className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
        aria-label={`Sort ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
      >
        <ArrowUpDown
          className={`w-3.5 h-3.5 transition-transform ${sortDir === 'desc' ? 'rotate-180' : ''}`}
        />
      </Button>
    </div>
  );
}
