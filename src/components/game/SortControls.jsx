import React from 'react';
import { Button } from '../ui/button';

/**
 * Sort controls component for card pool
 */
export function SortControls({ sortBy, sortDir, setSortBy, setSortDir }) {
  return (
    <div className="hidden md:flex items-center space-tight text-xs text-muted-foreground mr-2">
      <span>Sort:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortBy('name')}
        className={`border-border ${sortBy === 'name' ? 'bg-muted/30' : ''}`}
      >
        Name
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortBy('cost')}
        className={`border-border ${sortBy === 'cost' ? 'bg-muted/30' : ''}`}
      >
        Cost
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
        className="border-border"
      >
        {sortDir === 'asc' ? 'Asc' : 'Desc'}
      </Button>
    </div>
  );
}
