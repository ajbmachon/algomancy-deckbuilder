import React, { useState, useEffect, useRef, useContext } from 'react';
import { CardGrid } from './CardGrid';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { toast } from 'sonner';
import { CardContext } from '@/lib/stores/react/CardProvider';
import { DeckContext } from '@/lib/stores/react/DeckProvider';

/**
 * Main deck builder component
 */
export function DeckBuilder() {
  // Get data from contexts
  const { filteredPool: contextFilteredPool, working } = useContext(CardContext);
  const { deck, addCard, removeCard, exportDeck: contextExportDeck } = useContext(DeckContext);

  const [filteredPool, setFilteredPool] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    factions: [],
    cost: null,
    types: [], // Changed to array for multiple selection
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(null);

  // Refs for horizontal scrolling containers
  const factionsContainerRef = useRef(null);
  const costsContainerRef = useRef(null);
  const typesContainerRef = useRef(null);

  // Apply filters to card pool
  useEffect(() => {
    // Use the filtered pool from context
    let filtered = contextFilteredPool.filter(
      card => !card.card.factions.some(faction => faction.toLowerCase() === 'colorless')
    );

    // Filter by factions
    if (activeFilters.factions.length > 0) {
      filtered = filtered.filter(card =>
        card.card.factions.some(faction => activeFilters.factions.includes(faction.toLowerCase()))
      );
    }

    // Filter by cost
    if (activeFilters.cost !== null) {
      filtered = filtered.filter(card => card.card.cost === activeFilters.cost);
    }

    // Filter by types (multiple selection)
    if (activeFilters.types.length > 0) {
      filtered = filtered.filter(card =>
        activeFilters.types.some(type => card.card.type.includes(type))
      );
    }

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
  const addCardToDeck = (card, entries) => {
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

  // Handle removing a card from the deck
  const removeCardFromDeck = (card, entries) => {
    if (entries && entries.length > 0) {
      // Remove the first occurrence of the card
      const cardIdToRemove = entries[0].id;
      removeCard(cardIdToRemove);
    }
  };

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

  // Get unique faction, cost, and type values from card pool
  // Filter out the "colorless" faction as it's not used for deckbuilding
  const factions = [
    ...new Set(contextFilteredPool.flatMap(card => card.card.factions.map(f => f.toLowerCase()))),
  ].filter(faction => faction !== 'colorless');
  const costs = [...new Set(contextFilteredPool.map(card => card.card.cost))].sort((a, b) => a - b);

  // Extract real card types (those with {braces}) from the cards
  const extractRealTypes = str => {
    // Match all text within curly braces
    const matches = str.match(/{([^}]+)}/g);
    return matches ? matches.map(match => match.replace(/[{}]/g, '')) : [];
  };

  // Get all real types from the card pool
  const allRealTypes = contextFilteredPool.flatMap(card => extractRealTypes(card.card.type));

  // Filter to types that appear in multiple cards (more than once in allRealTypes)
  const typeCounts = allRealTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Filter to types that appear in multiple cards and sort alphabetically
  const types = Object.entries(typeCounts)
    .filter(([_, count]) => count > 1)
    .map(([type]) => type)
    .sort();

  // Get faction icon
  const getFactionIcon = faction => {
    switch (faction) {
      case 'earth':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        );
      case 'wood':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        );
      case 'fire':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
        );
      case 'water':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        );
      case 'metal':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Calculate deck stats
  const calculateDeckStats = () => {
    const factionCounts = {};
    const typeCounts = {};
    const costCounts = {};
    const totalCards = deck.length;

    // Count cards by faction, type, and cost
    deck.forEach(item => {
      const card = item.card;

      // Count by faction
      const cardFactions = card.factions;
      cardFactions.forEach(faction => {
        const normalizedFaction = faction.toLowerCase();
        if (normalizedFaction !== 'colorless') {
          factionCounts[normalizedFaction] = (factionCounts[normalizedFaction] || 0) + 1;
        }
      });

      // Count by type
      const cardType = card.type;
      typeCounts[cardType] = (typeCounts[cardType] || 0) + 1;

      // Count by cost
      const cardCost = card.cost;
      costCounts[cardCost] = (costCounts[cardCost] || 0) + 1;
    });

    return { factionCounts, typeCounts, costCounts, totalCards };
  };

  const deckStats = calculateDeckStats();

  // Determine if a card was recently added (for highlight animation)
  const isRecentlyAdded = cardName => {
    return recentlyAdded === cardName;
  };

  // Sorting state
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  // Apply sorting to filteredPool
  const sortedFiltered = React.useMemo(() => {
    const arr = [...filteredPool];
    arr.sort((a, b) => {
      const ca = a.card;
      const cb = b.card;
      const mul = sortDir === 'asc' ? 1 : -1;
      if (sortBy === 'cost') return (ca.cost - cb.cost) * mul;
      return ca.name.localeCompare(cb.name) * mul;
    });
    return arr;
  }, [filteredPool, sortBy, sortDir]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Card Pool Section */}
      <div className="space-y-4">
        <Card className="modern-card overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-3">
            <CardTitle className="flex justify-between items-center flex-wrap gap-2">
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
                  ({filteredPool.length})
                </span>
              </span>
              <div className="flex gap-2 flex-wrap items-center">
                <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground mr-2">
                  <span>Sort:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortBy('name')}
                    className={`border-white/20 ${sortBy === 'name' ? 'bg-white/10' : ''}`}
                  >
                    Name
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortBy('cost')}
                    className={`border-white/20 ${sortBy === 'cost' ? 'bg-white/10' : ''}`}
                  >
                    Cost
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
                    className="border-white/20"
                  >
                    {sortDir === 'asc' ? 'Asc' : 'Desc'}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="md:hidden border-white/20 hover:bg-white/5 min-h-[44px] min-w-[44px]"
                >
                  {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-white/20 hover:bg-white/5"
                >
                  Clear Filters
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block mb-6`}>
              <Tabs defaultValue="factions" className="mb-6">
                <TabsList className="fancy-tabs mb-4 w-full overflow-x-auto flex-nowrap md:flex-wrap whitespace-nowrap">
                  <TabsTrigger
                    value="factions"
                    className="fancy-tab data-[state=active]:fancy-tab-active"
                  >
                    Factions
                  </TabsTrigger>
                  <TabsTrigger
                    value="cost"
                    className="fancy-tab data-[state=active]:fancy-tab-active"
                  >
                    Cost
                  </TabsTrigger>
                  <TabsTrigger
                    value="type"
                    className="fancy-tab data-[state=active]:fancy-tab-active"
                  >
                    Type
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="factions" className="space-y-4 card-fade-in">
                  <div
                    className="flex gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible"
                    ref={factionsContainerRef}
                  >
                    {factions.map(faction => (
                      <HoverCard key={faction} openDelay={300} closeDelay={100}>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => toggleFactionFilter(faction)}
                            className={`capitalize flex items-center flex-shrink-0 min-h-[44px] min-w-[100px] md:min-w-0 ${
                              activeFilters.factions.includes(faction)
                                ? `filter-btn-${faction} active`
                                : `filter-btn-${faction}`
                            }`}
                          >
                            {getFactionIcon(faction)}
                            {faction}
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold capitalize">{faction} Faction</h4>
                            <p className="text-sm text-muted-foreground">
                              Filter cards from the {faction} faction.
                              {faction === 'earth' &&
                                ' Earth focuses on stability and resource generation.'}
                              {faction === 'wood' && ' Wood excels at growth and sustainability.'}
                              {faction === 'fire' &&
                                ' Fire specializes in direct damage and aggression.'}
                              {faction === 'water' &&
                                ' Water manipulates flow and adapts to circumstances.'}
                              {faction === 'metal' &&
                                ' Metal provides strength and structural integrity.'}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cost" className="space-y-4 card-fade-in">
                  <div
                    className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap"
                    ref={costsContainerRef}
                  >
                    {costs.map(cost => (
                      <Button
                        key={cost}
                        variant={activeFilters.cost === cost ? 'default' : 'outline'}
                        onClick={() => setCostFilter(cost)}
                        className={`min-h-[44px] min-w-[44px] flex-shrink-0 ${
                          activeFilters.cost === cost
                            ? 'bg-primary hover:bg-primary/90'
                            : 'border-white/20 hover:bg-white/5'
                        }`}
                      >
                        {cost}
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="type" className="space-y-4 card-fade-in">
                  <div
                    className="flex gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible"
                    ref={typesContainerRef}
                  >
                    {types.map(type => (
                      <Button
                        key={type}
                        variant={activeFilters.types.includes(type) ? 'default' : 'outline'}
                        onClick={() => toggleTypeFilter(type)}
                        className={`capitalize min-h-[44px] min-w-[100px] md:min-w-0 flex-shrink-0 ${
                          activeFilters.types.includes(type)
                            ? 'bg-primary hover:bg-primary/90'
                            : 'border-white/20 hover:bg-white/5'
                        }`}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {types.length === 0
                      ? 'No common types found'
                      : activeFilters.types.length > 0
                        ? `Filtering for cards with: ${activeFilters.types.join(', ')}`
                        : 'Select multiple types to filter cards'}
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            <Separator className="my-4 bg-white/10" />

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
      <div className="space-y-4">
        <Card className="modern-card overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 pointer-events-none"></div>

          <CardHeader className="border-b border-white/10 relative z-10">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="7" width="20" height="15" rx="2" />
                  <path d="M16 2H8a2 2 0 00-2 2v3h12V4a2 2 0 00-2-2z" />
                </svg>
                <span className="font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Deck
                </span>
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({deck.length})
                </span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={exportDeck}
                className="border-white/20 hover:bg-white/5"
              >
                Export
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6 relative z-10">
            {deck.length > 0 ? (
              <>
                <div className="mb-6 grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-black/20 rounded-lg border border-white/5">
                  {/* Deck Stats */}
                  {Object.entries(deckStats.factionCounts).map(([faction, count]) => (
                    <div key={faction} className="flex flex-col items-center">
                      <div
                        className={`w-full h-1 rounded-full bg-faction-${faction}/20 mb-1 overflow-hidden`}
                      >
                        <div
                          className={`h-full bg-faction-${faction} rounded-full`}
                          style={{ width: `${(count / deckStats.totalCards) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs capitalize text-faction-${faction}`}>
                        {faction}: {count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Using compact=false to disable card grouping by type */}
                <CardGrid
                  cards={deck}
                  onCardClick={removeCardFromDeck}
                  compact={false}
                  className="card-fade-in"
                  isRecentlyAdded={isRecentlyAdded}
                />
              </>
            ) : (
              <div className="empty-state">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-75 duration-1000"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-20 h-20 mx-auto text-muted-foreground/30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect x="2" y="7" width="20" height="15" rx="2" />
                    <path d="M16 2H8a2 2 0 00-2 2v3h12V4a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Your deck is empty
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click on cards in the Card Pool to add them to your deck. You can add up to 2
                  copies of each card.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  {factions.map(faction => (
                    <span
                      key={faction}
                      className={`faction-badge faction-badge-${faction} animate-pulse`}
                    ></span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
