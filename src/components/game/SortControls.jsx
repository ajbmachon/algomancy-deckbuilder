import React from 'react';
import { Button } from '../ui/button';

/**
 * Sort controls component for card pool
 */
export function SortControls({ sortBy, sortDir, setSortBy, setSortDir }) {
  return (
    <div
      className="hidden md:flex items-center gap-2 text-xs text-muted-foreground mr-2"
      role="group"
      aria-label="Sort controls"
    >
      <span id="sort-label" className="mr-1">
        Sort:
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortBy('name')}
        className={`border-border ${sortBy === 'name' ? 'bg-muted/30' : ''}`}
        aria-pressed={sortBy === 'name'}
        aria-label="Sort cards by name"
        aria-describedby="sort-label"
      >
        Name
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortBy('cost')}
        className={`border-border ${sortBy === 'cost' ? 'bg-muted/30' : ''}`}
        aria-pressed={sortBy === 'cost'}
        aria-label="Sort cards by cost"
        aria-describedby="sort-label"
      >
        Cost
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
        className="border-border"
        aria-label={`Change sort direction to ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
        aria-describedby="sort-label"
      >
        {sortDir === 'asc' ? 'Asc' : 'Desc'}
      </Button>
    </div>
  );
}
