import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { DeckStats } from './DeckStats';

/**
 * Deck management UI and deck list display
 */
export function DeckPanel({
  deck,
  deckStats,
  showDeckDesktop,
  setDeck,
  addCard,
  removeCard,
  removeAllCopies,
  clearDeck,
  exportDeck,
  showAnalytics,
  setShowAnalytics,
  factions,
}) {
  return (
    <div className={`space-filter-group flex flex-col ${showDeckDesktop ? '' : 'lg:hidden'}`}>
      <Card className="modern-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 pointer-events-none"></div>

        <CardHeader className="space-card-header border-b border-border relative z-10">
          <CardTitle className="flex justify-between items-center flex-wrap space-button-group">
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
            <div className="flex items-center space-button-group flex-wrap justify-end">
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 border-border hover:bg-muted/20 hover:text-foreground"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(deck, null, 2));
                  toast.success('Deck copied to clipboard');
                }}
                aria-label="Copy deck to clipboard"
              >
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 border-border hover:bg-muted/20 hover:text-foreground"
                onClick={() => {
                  const name = window.prompt('Save deck as');
                  if (name) {
                    localStorage.setItem(`algomancy:deck:${name}`, JSON.stringify(deck));
                    toast.success(`Saved deck '${name}'`);
                  }
                }}
                aria-label="Save deck to local storage"
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 border-border hover:bg-muted/20 hover:text-foreground"
                onClick={() => {
                  const name = window.prompt('Load deck name');
                  if (name) {
                    const data = localStorage.getItem(`algomancy:deck:${name}`);
                    if (!data) {
                      toast.error(`No saved deck '${name}' found`);
                      return;
                    }
                    try {
                      const parsed = JSON.parse(data);
                      if (Array.isArray(parsed)) {
                        setDeck(parsed);
                        toast.success(`Loaded deck '${name}'`);
                      } else {
                        toast.error('Invalid deck data');
                      }
                    } catch (e) {
                      toast.error('Failed to load deck');
                    }
                  }
                }}
                aria-label="Load deck from local storage"
              >
                Load
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-muted/20 hover:text-foreground shrink-0"
                onClick={clearDeck}
                aria-label="Clear all cards from deck"
              >
                Clear
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-muted/20 hover:text-foreground shrink-0"
                onClick={exportDeck}
                aria-label="Export deck as text file"
              >
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-card-content relative z-10 flex-1 overflow-auto">
          <DeckStats
            deckStats={deckStats}
            showAnalytics={showAnalytics}
            setShowAnalytics={setShowAnalytics}
            factions={factions}
          />

          {deck.length > 0 && (
            <div className="space-grid-tight flex flex-col" role="list" aria-label="Cards in deck">
              {Object.values(
                deck.reduce((acc, entry) => {
                  const key = entry.card?.key || entry.key;
                  if (!acc[key]) acc[key] = { card: entry.card || entry, count: 0, entries: [] };
                  acc[key].count += 1;
                  acc[key].entries.push(entry);
                  return acc;
                }, {})
              ).map(({ card, count, entries }) => {
                const faction = (card.factions && card.factions[0]?.toLowerCase()) || 'shard';
                const canAdd = count < 2;
                return (
                  <div
                    key={card.key}
                    className="flex items-center justify-between space-grid-tight rounded-md border border-border bg-card space-element"
                    role="listitem"
                    aria-label={`${card.name}, ${count} ${count === 1 ? 'copy' : 'copies'}`}
                  >
                    <div className="flex items-center space-filter-group min-w-0">
                      <img
                        src={`/card_images/${card.image_name}`}
                        alt={`${card.name} card`}
                        className="w-10 h-14 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{card.name}</p>
                        <p className="text-xs text-muted-foreground truncate capitalize">
                          {faction} • cost {card.cost}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-grid-tight shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 hover:bg-muted/20 hover:text-foreground"
                        onClick={() => {
                          if (entries.length) removeCard(entries[0].id);
                        }}
                        aria-label={`Remove one copy of ${card.name}`}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center text-sm" aria-label={`${count} copies`}>
                        {count}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 hover:bg-muted/20 hover:text-foreground"
                        onClick={() => {
                          if (canAdd) addCard(card);
                        }}
                        disabled={!canAdd}
                        aria-label={`Add one copy of ${card.name}${!canAdd ? ' (maximum 2 copies reached)' : ''}`}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => removeAllCopies(card.key)}
                        aria-label={`Remove all copies of ${card.name} from deck`}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
