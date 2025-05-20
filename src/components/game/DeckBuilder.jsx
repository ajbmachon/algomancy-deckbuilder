import React, { useState, useEffect } from 'react';
import { CardGrid } from './CardGrid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

/**
 * Main deck builder component
 */
export function DeckBuilder({ cardPool = [], initialDeck = [] }) {
  const [deck, setDeck] = useState(initialDeck);
  const [filteredPool, setFilteredPool] = useState(cardPool);
  const [activeFilters, setActiveFilters] = useState({
    factions: [],
    cost: null,
    type: null
  });

  // Apply filters to card pool
  useEffect(() => {
    // First, filter out colorless cards from the pool
    let filtered = cardPool.filter(card =>
      !card.card.factions.some(faction => faction.toLowerCase() === 'colorless')
    );

    // Filter by factions
    if (activeFilters.factions.length > 0) {
      filtered = filtered.filter(card =>
        card.card.factions.some(faction =>
          activeFilters.factions.includes(faction.toLowerCase())
        )
      );
    }

    // Filter by cost
    if (activeFilters.cost !== null) {
      filtered = filtered.filter(card => card.card.cost === activeFilters.cost);
    }

    // Filter by type
    if (activeFilters.type !== null) {
      filtered = filtered.filter(card => card.card.type === activeFilters.type);
    }

    setFilteredPool(filtered);
  }, [cardPool, activeFilters]);

  // Handle adding a card to the deck
  const addCardToDeck = (card, entries) => {
    setDeck(prev => [...prev, { id: Date.now(), card }]);
  };

  // Handle removing a card from the deck
  const removeCardFromDeck = (card, entries) => {
    if (entries && entries.length > 0) {
      // Remove the first occurrence of the card
      const cardIdToRemove = entries[0].id;
      setDeck(prev => prev.filter(item => item.id !== cardIdToRemove));
    }
  };

  // Toggle faction filter
  const toggleFactionFilter = (faction) => {
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
  const setCostFilter = (cost) => {
    setActiveFilters(prev => ({
      ...prev,
      cost: prev.cost === cost ? null : cost
    }));
  };

  // Set type filter
  const setTypeFilter = (type) => {
    setActiveFilters(prev => ({
      ...prev,
      type: prev.type === type ? null : type
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      factions: [],
      cost: null,
      type: null
    });
  };

  // Export deck to JSON
  const exportDeck = () => {
    const deckData = JSON.stringify(deck);
    const blob = new Blob([deckData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'algomancy-deck.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get unique faction, cost, and type values from card pool
  // Filter out the "colorless" faction as it's not used for deckbuilding
  const factions = [...new Set(cardPool.flatMap(card => card.card.factions.map(f => f.toLowerCase())))]
    .filter(faction => faction !== 'colorless');
  const costs = [...new Set(cardPool.map(card => card.card.cost))].sort((a, b) => a - b);
  const types = [...new Set(cardPool.map(card => card.card.type))];

  // Get faction icon
  const getFactionIcon = (faction) => {
    switch (faction) {
      case 'earth':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'wood':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        );
      case 'fire':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        );
      case 'water':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'metal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      {/* Card Pool Section */}
      <div className="space-y-4">
        <Card className="modern-card overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-3">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-bold bg-gradient-to-r from-primary/90 to-accent bg-clip-text text-transparent">
                  Card Pool
                </span>
                <span className="ml-2 text-sm font-normal text-muted-foreground">({filteredPool.length})</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-white/20 hover:bg-white/5"
              >
                Clear Filters
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="factions" className="mb-6">
              <TabsList className="fancy-tabs mb-4">
                <TabsTrigger value="factions" className="fancy-tab data-[state=active]:fancy-tab-active">Factions</TabsTrigger>
                <TabsTrigger value="cost" className="fancy-tab data-[state=active]:fancy-tab-active">Cost</TabsTrigger>
                <TabsTrigger value="type" className="fancy-tab data-[state=active]:fancy-tab-active">Type</TabsTrigger>
              </TabsList>

              <TabsContent value="factions" className="space-y-4 card-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {factions.map(faction => (
                    <HoverCard key={faction} openDelay={300} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => toggleFactionFilter(faction)}
                          className={`capitalize flex items-center ${
                            activeFilters.factions.includes(faction) ?
                            `filter-btn-${faction} active` :
                            `filter-btn-${faction}`
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
                            {faction === 'earth' && 'Earth focuses on stability and resource generation.'}
                            {faction === 'wood' && 'Wood excels at growth and sustainability.'}
                            {faction === 'fire' && 'Fire specializes in direct damage and aggression.'}
                            {faction === 'water' && 'Water manipulates flow and adapts to circumstances.'}
                            {faction === 'metal' && 'Metal provides strength and structural integrity.'}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cost" className="space-y-4 card-fade-in">
                <div className="flex flex-wrap gap-2">
                  {costs.map(cost => (
                    <Button
                      key={cost}
                      variant={activeFilters.cost === cost ? "default" : "outline"}
                      onClick={() => setCostFilter(cost)}
                      className={activeFilters.cost === cost ?
                        "bg-primary hover:bg-primary/90" :
                        "border-white/20 hover:bg-white/5"}
                    >
                      {cost}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="type" className="space-y-4 card-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {types.map(type => (
                    <Button
                      key={type}
                      variant={activeFilters.type === type ? "default" : "outline"}
                      onClick={() => setTypeFilter(type)}
                      className={`capitalize ${activeFilters.type === type ?
                        "bg-primary hover:bg-primary/90" :
                        "border-white/20 hover:bg-white/5"}`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-4 bg-white/10" />

            <CardGrid
              cards={filteredPool}
              onCardClick={addCardToDeck}
              currentDeck={deck}
              maxCardCount={2}
              className="card-fade-in"
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="15" rx="2" />
                  <path d="M16 2H8a2 2 0 00-2 2v3h12V4a2 2 0 00-2-2z" />
                </svg>
                <span className="font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Deck
                </span>
                <span className="ml-2 text-sm font-normal text-muted-foreground">({deck.length})</span>
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
            <CardGrid
              cards={deck}
              onCardClick={removeCardFromDeck}
              compact={true}
              className="card-fade-in"
            />

            {deck.length === 0 && (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                <p className="text-muted-foreground">Add cards from the pool to build your deck</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
