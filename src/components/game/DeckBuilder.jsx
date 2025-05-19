import React, { useState, useEffect } from 'react';
import { CardGrid } from './CardGrid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

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
    let filtered = [...cardPool];

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
  const factions = [...new Set(cardPool.flatMap(card => card.card.factions.map(f => f.toLowerCase())))];
  const costs = [...new Set(cardPool.map(card => card.card.cost))].sort((a, b) => a - b);
  const types = [...new Set(cardPool.map(card => card.card.type))];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      {/* Card Pool Section */}
      <div className="space-y-4">
        <Card className="border border-white/10 shadow-xl bg-black/40 backdrop-blur-sm">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Card Pool <span className="ml-2 text-sm font-normal text-muted-foreground">({filteredPool.length})</span>
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
              <TabsList className="mb-4 bg-white/5 p-1">
                <TabsTrigger value="factions" className="data-[state=active]:bg-white/10">Factions</TabsTrigger>
                <TabsTrigger value="cost" className="data-[state=active]:bg-white/10">Cost</TabsTrigger>
                <TabsTrigger value="type" className="data-[state=active]:bg-white/10">Type</TabsTrigger>
              </TabsList>

              <TabsContent value="factions" className="space-y-4 card-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {factions.map(faction => (
                    <Button
                      key={faction}
                      variant="outline"
                      onClick={() => toggleFactionFilter(faction)}
                      className={`capitalize ${activeFilters.factions.includes(faction) ?
                        `filter-btn-${faction} active` :
                        `filter-btn-${faction}`}`}
                    >
                      {faction}
                    </Button>
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
        <Card className="border border-white/10 shadow-xl bg-black/40 backdrop-blur-sm relative overflow-hidden">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="15" rx="2" />
                  <path d="M16 2H8a2 2 0 00-2 2v3h12V4a2 2 0 00-2-2z" />
                </svg>
                Deck <span className="ml-2 text-sm font-normal text-muted-foreground">({deck.length})</span>
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
          <CardContent className="pt-6">
            <CardGrid
              cards={deck}
              onCardClick={removeCardFromDeck}
              compact={true}
              className="card-fade-in"
            />

            {deck.length === 0 && (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-white/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Add cards from the pool to build your deck
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
