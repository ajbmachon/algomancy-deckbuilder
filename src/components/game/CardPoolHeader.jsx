import React from 'react';
import { Button } from '../ui/button';
import { SortControls } from './SortControls';
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Filter,
  X,
} from 'lucide-react';

/**
 * Compact toolbar above the card grid
 */
export function CardPoolHeader({
  filteredPoolCount,
  showFiltersDesktop,
  setShowFiltersDesktop,
  showDeckDesktop,
  setShowDeckDesktop,
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
  clearFilters,
  hasActiveFilters,
  onMobileFilters,
}) {
  return (
    <div className="shrink-0 flex items-center justify-between gap-2 px-3 py-2 border-b border-border bg-card/30">
      <div className="flex items-center gap-2 min-w-0">
        {/* Desktop panel toggles */}
        <div className="hidden lg:flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => setShowFiltersDesktop(v => !v)}
            aria-label={showFiltersDesktop ? 'Hide filters' : 'Show filters'}
          >
            {showFiltersDesktop ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Mobile filter button */}
        {onMobileFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden h-7 gap-1 text-xs text-muted-foreground hover:text-foreground px-2"
            onClick={onMobileFilters}
            aria-label="Open filters"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
          </Button>
        )}

        <span className="text-xs text-muted-foreground tabular-nums">
          {filteredPoolCount} cards
        </span>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 gap-1 text-[10px] text-muted-foreground hover:text-foreground px-1.5"
            onClick={clearFilters}
            aria-label="Clear all filters"
          >
            <X className="w-3 h-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center gap-1">
        <SortControls
          sortBy={sortBy}
          sortDir={sortDir}
          setSortBy={setSortBy}
          setSortDir={setSortDir}
        />

        {/* Desktop deck toggle */}
        <div className="hidden lg:flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => setShowDeckDesktop(v => !v)}
            aria-label={showDeckDesktop ? 'Hide deck' : 'Show deck'}
          >
            {showDeckDesktop ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
