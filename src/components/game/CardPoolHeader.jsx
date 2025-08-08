import React from 'react';
import { CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { SortControls } from './SortControls';

/**
 * Card pool header with controls and sorting
 */
export function CardPoolHeader({
  filteredPoolCount,
  // Layout controls
  maximized,
  setMaximized,
  showFiltersDesktop,
  setShowFiltersDesktop,
  showDeckDesktop,
  setShowDeckDesktop,
  previousLayoutRef,
  // Mobile filters
  mobileFiltersOpen,
  setMobileFiltersOpen,
  // Sorting
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
  // Clear filters
  clearFilters,
}) {
  return (
    <CardHeader className="space-card-header border-b border-border">
      <CardTitle className="flex justify-between items-center flex-wrap space-button-group">
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="font-bold bg-gradient-to-r from-primary/90 to-accent bg-clip-text text-transparent">
            Card Pool
          </span>
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({filteredPoolCount})
          </span>
        </span>
        <div className="flex space-button-group flex-wrap items-center">
          {/* Desktop layout toggles to maximize card grid */}
          <div className="hidden lg:flex items-center space-button-group mr-2">
            <Button
              variant={maximized ? 'default' : 'outline'}
              size="sm"
              className="border-border hover:bg-muted/20 hover:text-foreground"
              onClick={() => {
                setMaximized(m => {
                  if (!m) {
                    previousLayoutRef.current = {
                      filters: showFiltersDesktop,
                      deck: showDeckDesktop,
                    };
                    setShowFiltersDesktop(false);
                    setShowDeckDesktop(false);
                    return true;
                  } else {
                    setShowFiltersDesktop(previousLayoutRef.current.filters);
                    setShowDeckDesktop(previousLayoutRef.current.deck);
                    return false;
                  }
                });
              }}
              title={maximized ? 'Restore Layout' : 'Maximize Cards'}
            >
              {maximized ? 'Restore Layout' : 'Maximize Cards'}
            </Button>
            <Button
              variant={showFiltersDesktop ? 'outline' : 'default'}
              size="sm"
              className="border-border"
              onClick={() => setShowFiltersDesktop(v => !v)}
              title={showFiltersDesktop ? 'Hide Filters' : 'Show Filters'}
            >
              {showFiltersDesktop ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Button
              variant={showDeckDesktop ? 'outline' : 'default'}
              size="sm"
              className="border-border"
              onClick={() => setShowDeckDesktop(v => !v)}
              title={showDeckDesktop ? 'Hide Deck' : 'Show Deck'}
            >
              {showDeckDesktop ? 'Hide Deck' : 'Show Deck'}
            </Button>
          </div>

          <SortControls
            sortBy={sortBy}
            sortDir={sortDir}
            setSortBy={setSortBy}
            setSortDir={setSortDir}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden border-border hover:bg-muted/20 hover:text-foreground min-h-[44px] min-w-[44px]"
          >
            {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="border-border hover:bg-muted/20 hover:text-foreground"
          >
            Clear Filters
          </Button>
        </div>
      </CardTitle>
    </CardHeader>
  );
}
