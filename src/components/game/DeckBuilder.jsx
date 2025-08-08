import React, { useState, useEffect, useRef, useContext } from 'react';
import { CardGrid } from './CardGrid';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { CardContext } from '@/lib/stores/react/CardProvider';
import { DeckContext } from '@/lib/stores/react/DeckProvider';
import { FilterPanel } from './FilterPanel';
import { CardPoolHeader } from './CardPoolHeader';
import { DeckPanel } from './DeckPanel';
import {
  getUniqueValues,
  applyFilters,
  calculateDeckStats,
  sortCards,
} from '@/lib/utils/deckUtils.jsx';

/**
 * Main deck builder component - orchestrates all sub-components
 */
export function DeckBuilder() {
  // Get data from contexts
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
    types: [], // Changed to array for multiple selection
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(null);

  // Desktop layout visibility controls
  const [showFiltersDesktop, setShowFiltersDesktop] = useState(true);
  const [showDeckDesktop, setShowDeckDesktop] = useState(true);
  const [maximized, setMaximized] = useState(false);
  const previousLayoutRef = useRef({ filters: true, deck: true });

  // Sorting state
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  // Analytics toggle
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Apply filters to card pool
  useEffect(() => {
    const filtered = applyFilters(contextFilteredPool, activeFilters);
    setFilteredPool(filtered);
  }, [contextFilteredPool, activeFilters]);

  // Clear recently added card after delay
  useEffect(() => {
    if (recentlyAdded) {
      const timer = setTimeout(() => {
        setRecentlyAdded(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [recentlyAdded]);

  // Handle adding a card to the deck
  const addCardToDeck = card => {
    // Check if we already have max copies
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
    // Set recently added card for highlighting (visual feedback without toast)
    setRecentlyAdded(card.name);
  };

  // Handle removing a card from the deck (kept for potential future use)
  // const removeCardFromDeck = (card, entries) => {
  //   if (entries && entries.length > 0) {
  //     // Remove the first occurrence of the card
  //     const cardIdToRemove = entries[0].id;
  //     removeCard(cardIdToRemove);
  //   }
  // };

  // Toggle faction filter
  const toggleFactionFilter = faction => {
    setActiveFilters(prev => {
      const factions = [...prev.factions];
      const index = factions.indexOf(faction);

      if (index === -1) {
        factions.push(faction);
      } else {
        factions.splice(index, 1);
      }

      return { ...prev, factions };
    });
  };

  // Set cost filter
  const setCostFilter = cost => {
    setActiveFilters(prev => ({
      ...prev,
      cost: prev.cost === cost ? null : cost,
    }));
  };

  // Toggle type filter (multiple selection)
  const toggleTypeFilter = type => {
    setActiveFilters(prev => {
      const types = [...prev.types];
      const index = types.indexOf(type);

      if (index === -1) {
        types.push(type);
      } else {
        types.splice(index, 1);
      }

      return { ...prev, types };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      factions: [],
      cost: null,
      types: [],
    });
  };

  // Export deck to JSON
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

    // Show a toast notification
    toast.success('Deck exported successfully', {
      description: `${deck.length} cards exported to algomancy-deck.json`,
      position: 'bottom-right',
      duration: 3000,
    });
  };

  // Get unique values from card pool
  const { factions, costs, types } = getUniqueValues(contextFilteredPool);

  // Calculate deck stats
  const deckStats = calculateDeckStats(deck);

  // Determine if a card was recently added (for highlight animation)
  const isRecentlyAdded = cardName => {
    return recentlyAdded === cardName;
  };

  // Apply sorting to filteredPool
  const sortedFiltered = React.useMemo(() => {
    return sortCards(filteredPool, sortBy, sortDir);
  }, [filteredPool, sortBy, sortDir]);

  return (
    <div
      className={`grid grid-cols-1 ${
        showFiltersDesktop && showDeckDesktop
          ? 'lg:grid-cols-[280px_1fr_380px]'
          : showFiltersDesktop && !showDeckDesktop
            ? 'lg:grid-cols-[280px_1fr]'
            : !showFiltersDesktop && showDeckDesktop
              ? 'lg:grid-cols-[1fr_380px]'
              : 'lg:grid-cols-1'
      } space-grid-loose`}
    >
      {/* Filters Sidebar */}
      <aside
        aria-label="Filters"
        className={`hidden lg:block ${showFiltersDesktop ? '' : 'lg:hidden'}`}
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

      {/* Card Pool Section */}
      <div className="space-filter-group flex flex-col">
        <Card className="modern-card overflow-hidden">
          <CardPoolHeader
            filteredPoolCount={filteredPool.length}
            maximized={maximized}
            setMaximized={setMaximized}
            showFiltersDesktop={showFiltersDesktop}
            setShowFiltersDesktop={setShowFiltersDesktop}
            showDeckDesktop={showDeckDesktop}
            setShowDeckDesktop={setShowDeckDesktop}
            previousLayoutRef={previousLayoutRef}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            sortBy={sortBy}
            sortDir={sortDir}
            setSortBy={setSortBy}
            setSortDir={setSortDir}
            clearFilters={clearFilters}
          />
          <CardContent className="space-card-content">
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
              isOpen={mobileFiltersOpen}
            />

            <Separator className="my-4 bg-border" />

            <CardGrid
              cards={sortedFiltered}
              onCardClick={addCardToDeck}
              currentDeck={deck}
              maxCardCount={2}
              className="card-fade-in"
              isRecentlyAdded={isRecentlyAdded}
            />
          </CardContent>
        </Card>
      </div>

      {/* Deck Section */}
      <DeckPanel
        deck={deck}
        deckStats={deckStats}
        showDeckDesktop={showDeckDesktop}
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
    </div>
  );
}
