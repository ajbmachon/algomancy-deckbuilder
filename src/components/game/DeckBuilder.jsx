import React, { useState, useEffect, useContext } from 'react';
import { CardGrid } from './CardGrid';
import { toast } from 'sonner';
import { CardContext } from '@/lib/stores/react/CardProvider';
import { DeckContext } from '@/lib/stores/react/DeckProvider';
import { FilterPanel } from './FilterPanel';
import { CardPoolHeader } from './CardPoolHeader';
import { DeckPanel } from './DeckPanel';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Layers, Filter } from 'lucide-react';
import {
  getUniqueValues,
  applyFilters,
  calculateDeckStats,
  sortCards,
} from '@/lib/utils/deckUtils.jsx';

/**
 * Main deck builder component — full-height 3-panel layout
 */
export function DeckBuilder() {
  const { filteredPool: contextFilteredPool } = useContext(CardContext);
  const {
    deck,
    setDeck,
    addCard,
    removeCard,
    removeAllCopies,
    clearDeck,
    exportDeck: contextExportDeck,
  } = useContext(DeckContext);

  const [filteredPool, setFilteredPool] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    factions: [],
    cost: null,
    types: [],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileDeckOpen, setMobileDeckOpen] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(null);

  // Desktop panel visibility
  const [showFiltersDesktop, setShowFiltersDesktop] = useState(true);
  const [showDeckDesktop, setShowDeckDesktop] = useState(true);

  // Sorting
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  // Analytics
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    const filtered = applyFilters(contextFilteredPool, activeFilters);
    setFilteredPool(filtered);
  }, [contextFilteredPool, activeFilters]);

  useEffect(() => {
    if (recentlyAdded) {
      const timer = setTimeout(() => setRecentlyAdded(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [recentlyAdded]);

  const addCardToDeck = card => {
    const existingCount = deck.filter(item => item.card.name === card.name).length;
    if (existingCount >= 2) {
      toast.error(`Maximum copies reached`, {
        description: `You can only have 2 copies of ${card.name}`,
        position: 'bottom-right',
        duration: 3000,
      });
      return;
    }
    addCard(card);
    setRecentlyAdded(card.name);
  };

  const toggleFactionFilter = faction => {
    setActiveFilters(prev => {
      const factions = [...prev.factions];
      const index = factions.indexOf(faction);
      if (index === -1) factions.push(faction);
      else factions.splice(index, 1);
      return { ...prev, factions };
    });
  };

  const setCostFilter = cost => {
    setActiveFilters(prev => ({
      ...prev,
      cost: prev.cost === cost ? null : cost,
    }));
  };

  const toggleTypeFilter = type => {
    setActiveFilters(prev => {
      const types = [...prev.types];
      const index = types.indexOf(type);
      if (index === -1) types.push(type);
      else types.splice(index, 1);
      return { ...prev, types };
    });
  };

  const clearFilters = () => {
    setActiveFilters({ factions: [], cost: null, types: [] });
  };

  const exportDeck = () => {
    if (deck.length === 0) {
      toast.error('No cards in deck', {
        description: 'Add some cards to your deck before exporting',
        position: 'bottom-right',
        duration: 3000,
      });
      return;
    }
    contextExportDeck();
    toast.success('Deck exported successfully', {
      description: `${deck.length} cards exported to algomancy-deck.json`,
      position: 'bottom-right',
      duration: 3000,
    });
  };

  const { factions, costs, types } = getUniqueValues(contextFilteredPool);
  const deckStats = calculateDeckStats(deck);
  const isRecentlyAdded = cardName => recentlyAdded === cardName;

  const sortedFiltered = React.useMemo(() => {
    return sortCards(filteredPool, sortBy, sortDir);
  }, [filteredPool, sortBy, sortDir]);

  const hasActiveFilters =
    activeFilters.factions.length > 0 ||
    activeFilters.cost !== null ||
    activeFilters.types.length > 0;

  return (
    <div className="h-full flex flex-col">
      {/* Desktop: Full-height 3-panel layout */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        {/* Left: Filters sidebar */}
        {showFiltersDesktop && (
          <aside
            className="w-56 xl:w-64 shrink-0 border-r border-border bg-card/50 overflow-y-auto"
            aria-label="Filters"
          >
            <FilterPanel
              factions={factions}
              costs={costs}
              types={types}
              activeFilters={activeFilters}
              toggleFactionFilter={toggleFactionFilter}
              setCostFilter={setCostFilter}
              toggleTypeFilter={toggleTypeFilter}
              clearFilters={clearFilters}
              isDesktop={true}
            />
          </aside>
        )}

        {/* Center: Card pool */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <CardPoolHeader
            filteredPoolCount={filteredPool.length}
            showFiltersDesktop={showFiltersDesktop}
            setShowFiltersDesktop={setShowFiltersDesktop}
            showDeckDesktop={showDeckDesktop}
            setShowDeckDesktop={setShowDeckDesktop}
            sortBy={sortBy}
            sortDir={sortDir}
            setSortBy={setSortBy}
            setSortDir={setSortDir}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          <div className="flex-1 overflow-y-auto p-3 xl:p-4">
            <CardGrid
              cards={sortedFiltered}
              onCardClick={addCardToDeck}
              currentDeck={deck}
              maxCardCount={2}
              className="card-fade-in"
              isRecentlyAdded={isRecentlyAdded}
            />
          </div>
        </div>

        {/* Right: Deck panel */}
        {showDeckDesktop && (
          <aside className="w-72 xl:w-80 shrink-0 border-l border-border bg-card/50 overflow-y-auto">
            <DeckPanel
              deck={deck}
              deckStats={deckStats}
              showDeckDesktop={true}
              setDeck={setDeck}
              addCard={addCard}
              removeCard={removeCard}
              removeAllCopies={removeAllCopies}
              clearDeck={clearDeck}
              exportDeck={exportDeck}
              showAnalytics={showAnalytics}
              setShowAnalytics={setShowAnalytics}
              factions={factions}
            />
          </aside>
        )}
      </div>

      {/* Mobile/Tablet layout */}
      <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
        <CardPoolHeader
          filteredPoolCount={filteredPool.length}
          showFiltersDesktop={false}
          setShowFiltersDesktop={() => {}}
          showDeckDesktop={false}
          setShowDeckDesktop={() => {}}
          sortBy={sortBy}
          sortDir={sortDir}
          setSortBy={setSortBy}
          setSortDir={setSortDir}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          onMobileFilters={() => setMobileFiltersOpen(true)}
        />

        <div className="flex-1 overflow-y-auto p-2 pb-16">
          <CardGrid
            cards={sortedFiltered}
            onCardClick={addCardToDeck}
            currentDeck={deck}
            maxCardCount={2}
            className="card-fade-in"
            isRecentlyAdded={isRecentlyAdded}
          />
        </div>

        {/* Mobile bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-40 px-4 py-2 flex justify-around">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors relative"
            aria-label="Open filters"
          >
            <Filter className="w-5 h-5" />
            <span className="text-[10px] font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-primary" />
            )}
          </button>
          <button
            onClick={() => setMobileDeckOpen(true)}
            className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors relative"
            aria-label="Open deck"
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-medium">Deck</span>
            {deck.length > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[16px] h-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center px-1">
                {deck.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filter sheet */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side="bottom" className="max-h-[75vh] rounded-t-xl">
            <SheetHeader>
              <SheetTitle className="font-display">Filters</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto py-3" style={{ maxHeight: 'calc(75vh - 4rem)' }}>
              <FilterPanel
                factions={factions}
                costs={costs}
                types={types}
                activeFilters={activeFilters}
                toggleFactionFilter={toggleFactionFilter}
                setCostFilter={setCostFilter}
                toggleTypeFilter={toggleTypeFilter}
                clearFilters={clearFilters}
                isDesktop={false}
                isOpen={true}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile deck sheet */}
        <Sheet open={mobileDeckOpen} onOpenChange={setMobileDeckOpen}>
          <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
            <DeckPanel
              deck={deck}
              deckStats={deckStats}
              showDeckDesktop={true}
              setDeck={setDeck}
              addCard={addCard}
              removeCard={removeCard}
              removeAllCopies={removeAllCopies}
              clearDeck={clearDeck}
              exportDeck={exportDeck}
              showAnalytics={showAnalytics}
              setShowAnalytics={setShowAnalytics}
              factions={factions}
              isMobile={true}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
