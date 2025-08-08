import React, { useState, useEffect, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

// Layout Context for managing panel states
const LayoutContext = createContext({
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,
  mobileFiltersOpen: false,
  mobileDeckOpen: false,
  toggleLeftPanel: () => {},
  toggleRightPanel: () => {},
  toggleMobileFilters: () => {},
  toggleMobileDeck: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export function LayoutProvider({ children }) {
  // Initialize state from localStorage
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(() => {
    const saved = localStorage.getItem('deckbuilder-left-panel-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(() => {
    const saved = localStorage.getItem('deckbuilder-right-panel-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileDeckOpen, setMobileDeckOpen] = useState(false);

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('deckbuilder-left-panel-collapsed', JSON.stringify(leftPanelCollapsed));
  }, [leftPanelCollapsed]);

  useEffect(() => {
    localStorage.setItem('deckbuilder-right-panel-collapsed', JSON.stringify(rightPanelCollapsed));
  }, [rightPanelCollapsed]);

  const toggleLeftPanel = () => setLeftPanelCollapsed(!leftPanelCollapsed);
  const toggleRightPanel = () => setRightPanelCollapsed(!rightPanelCollapsed);
  const toggleMobileFilters = () => setMobileFiltersOpen(!mobileFiltersOpen);
  const toggleMobileDeck = () => setMobileDeckOpen(!mobileDeckOpen);

  return (
    <LayoutContext.Provider
      value={{
        leftPanelCollapsed,
        rightPanelCollapsed,
        mobileFiltersOpen,
        mobileDeckOpen,
        toggleLeftPanel,
        toggleRightPanel,
        toggleMobileFilters,
        toggleMobileDeck,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

/**
 * DeckbuilderLayout Component
 *
 * Responsive 3-column layout:
 * - Desktop (>1400px): 3 columns (filters | cards | deck)
 * - Tablet (768-1400px): 2 columns with collapsible sidebar
 * - Mobile (<768px): Single column with bottom sheet
 */
export function DeckbuilderLayout({ filterPanel, cardPool, deckPanel, className }) {
  const {
    leftPanelCollapsed,
    rightPanelCollapsed,
    mobileFiltersOpen,
    mobileDeckOpen,
    toggleLeftPanel,
    toggleRightPanel,
    toggleMobileFilters,
    toggleMobileDeck,
  } = useLayout();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Store trigger elements for focus restoration
  const [filtersTriggerRef, setFiltersTriggerRef] = useState(null);
  const [deckTriggerRef, setDeckTriggerRef] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced keyboard navigation for mobile sheets and tablet overlay
  useEffect(() => {
    const handleKeyDown = e => {
      // ESC key closes sheets/overlays
      if (e.key === 'Escape') {
        if (isMobile && mobileFiltersOpen) {
          e.preventDefault();
          toggleMobileFilters();
          // Restore focus to trigger element
          if (filtersTriggerRef) {
            filtersTriggerRef.focus();
          }
        }
        if (isMobile && mobileDeckOpen) {
          e.preventDefault();
          toggleMobileDeck();
          // Restore focus to trigger element
          if (deckTriggerRef) {
            deckTriggerRef.focus();
          }
        }
        if (isTablet && !rightPanelCollapsed) {
          e.preventDefault();
          toggleRightPanel();
          // Focus will return naturally to previously focused element
        }
      }
    };

    if ((isMobile && (mobileFiltersOpen || mobileDeckOpen)) || (isTablet && !rightPanelCollapsed)) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [
    mobileFiltersOpen,
    mobileDeckOpen,
    rightPanelCollapsed,
    isMobile,
    isTablet,
    filtersTriggerRef,
    deckTriggerRef,
    toggleMobileFilters,
    toggleMobileDeck,
    toggleRightPanel,
  ]);

  const isDesktop = windowWidth > 1400;
  const isTablet = windowWidth > 768 && windowWidth <= 1400;
  const isMobile = windowWidth <= 768;

  // Mobile layout
  if (isMobile) {
    return (
      <div className={cn('flex flex-col h-full relative', className)}>
        {/* Main content area - card pool */}
        <div className="flex-1 overflow-auto pb-20">{cardPool}</div>

        {/* Mobile bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 glass-medium shadow-xl border-t border-border z-40">
          <nav
            className="flex justify-around space-element"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <Button
              variant="ghost"
              size="sm"
              ref={setFiltersTriggerRef}
              onClick={toggleMobileFilters}
              className="flex flex-col items-center space-element h-auto"
              aria-label={`${mobileFiltersOpen ? 'Close' : 'Open'} filters panel`}
              aria-expanded={mobileFiltersOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="text-caption mt-1">Filters</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              ref={setDeckTriggerRef}
              onClick={toggleMobileDeck}
              className="flex flex-col items-center space-element h-auto"
              aria-label={`${mobileDeckOpen ? 'Close' : 'Open'} deck panel`}
              aria-expanded={mobileDeckOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span className="text-caption mt-1">Deck</span>
            </Button>
          </nav>
        </div>

        {/* Mobile filter sheet */}
        <Sheet open={mobileFiltersOpen} onOpenChange={toggleMobileFilters}>
          <SheetContent side="bottom" className="max-h-[80vh] glass-popup shadow-xl">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div
              className="overflow-auto space-component"
              style={{ maxHeight: 'calc(80vh - 6rem)' }}
            >
              {filterPanel}
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile deck sheet */}
        <Sheet open={mobileDeckOpen} onOpenChange={toggleMobileDeck}>
          <SheetContent side="bottom" className="max-h-[80vh] glass-popup shadow-xl">
            <SheetHeader>
              <SheetTitle>Deck</SheetTitle>
            </SheetHeader>
            <div
              className="overflow-auto space-component"
              style={{ maxHeight: 'calc(80vh - 6rem)' }}
            >
              {deckPanel}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  // Desktop and Tablet layout
  return (
    <div
      className={cn(
        'grid h-full space-grid-normal',
        isDesktop ? 'grid-cols-[auto_1fr_auto]' : 'grid-cols-[auto_1fr]',
        className
      )}
    >
      {/* Left Panel - Filters */}
      <div
        className={cn(
          'bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 shadow-lg',
          leftPanelCollapsed ? 'w-12' : 'w-80'
        )}
      >
        <div className="flex items-center justify-between space-filter-group border-b border-border">
          {!leftPanelCollapsed && <h5>Filters</h5>}
          <Button variant="ghost" size="icon" onClick={toggleLeftPanel} className="h-7 w-7">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={leftPanelCollapsed ? 'M13 5l7 7-7 7' : 'M11 19l-7-7 7-7'}
              />
            </svg>
          </Button>
        </div>
        {!leftPanelCollapsed && (
          <div
            className="space-component overflow-auto"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          >
            {filterPanel}
          </div>
        )}
      </div>

      {/* Center Panel - Card Pool */}
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
        <div className="h-full overflow-auto">{cardPool}</div>
      </div>

      {/* Right Panel - Deck (Desktop only) */}
      {isDesktop && (
        <div
          className={cn(
            'bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 shadow-lg',
            rightPanelCollapsed ? 'w-12' : 'w-96'
          )}
        >
          <div className="flex items-center justify-between space-filter-group border-b border-border">
            <Button variant="ghost" size="icon" onClick={toggleRightPanel} className="h-7 w-7">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={rightPanelCollapsed ? 'M11 5l-7 7 7 7' : 'M13 19l7-7-7-7'}
                />
              </svg>
            </Button>
            {!rightPanelCollapsed && <h5>Deck</h5>}
          </div>
          {!rightPanelCollapsed && (
            <div
              className="space-component overflow-auto"
              style={{ maxHeight: 'calc(100vh - 8rem)' }}
            >
              {deckPanel}
            </div>
          )}
        </div>
      )}

      {/* Tablet - Deck as overlay */}
      {isTablet && (
        <div
          className={cn(
            'fixed right-0 top-0 bottom-0 bg-background border-l border-border transform transition-transform duration-300 ease-in-out z-40 w-96',
            rightPanelCollapsed ? 'translate-x-full' : 'translate-x-0'
          )}
          role="dialog"
          aria-modal={!rightPanelCollapsed}
          aria-labelledby="tablet-deck-title"
        >
          <div className="flex items-center justify-between space-component border-b border-border">
            <h4 id="tablet-deck-title">Deck</h4>
            <Button variant="ghost" size="icon" onClick={toggleRightPanel}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="overflow-auto space-component" style={{ height: 'calc(100% - 4rem)' }}>
            {deckPanel}
          </div>
        </div>
      )}

      {/* Tablet - Floating deck button */}
      {isTablet && (
        <Button
          onClick={toggleRightPanel}
          size="lg"
          className={cn(
            'fixed right-4 bottom-4 space-component rounded-full shadow-xl hover:shadow-2xl transition-all z-30',
            !rightPanelCollapsed && 'opacity-0 pointer-events-none'
          )}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </Button>
      )}
    </div>
  );
}
