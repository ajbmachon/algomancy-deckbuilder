import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { DeckStats } from './DeckStats';
import { Copy, Save, FolderOpen, Trash2, Download, Plus, Minus, X } from 'lucide-react';

/**
 * Deck panel — dense card list with inline controls
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
  isMobile = false,
}) {
  const getFactionColor = faction => {
    const colors = {
      earth: '#c67a1a',
      wood: '#16a34a',
      fire: '#dc2626',
      water: '#0284c7',
      metal: '#94a3b8',
      shard: '#a855f7',
    };
    return colors[faction] || colors.shard;
  };

  // Group deck entries by card
  const grouped = Object.values(
    deck.reduce((acc, entry) => {
      const key = entry.card?.key || entry.key;
      if (!acc[key]) acc[key] = { card: entry.card || entry, count: 0, entries: [] };
      acc[key].count += 1;
      acc[key].entries.push(entry);
      return acc;
    }, {})
  );

  return (
    <div className={`flex flex-col h-full ${showDeckDesktop ? '' : 'lg:hidden'}`}>
      {/* Header */}
      <div className="shrink-0 px-3 py-2 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm gradient-heading">Deck</span>
            <span className="text-xs text-muted-foreground tabular-nums">{deck.length} cards</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(deck, null, 2));
                toast.success('Copied to clipboard');
              }}
              aria-label="Copy deck"
              title="Copy"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                const name = window.prompt('Save deck as');
                if (name) {
                  localStorage.setItem(`algomancy:deck:${name}`, JSON.stringify(deck));
                  toast.success(`Saved '${name}'`);
                }
              }}
              aria-label="Save deck"
              title="Save"
            >
              <Save className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => {
                const name = window.prompt('Load deck name');
                if (name) {
                  const data = localStorage.getItem(`algomancy:deck:${name}`);
                  if (!data) {
                    toast.error(`No saved deck '${name}'`);
                    return;
                  }
                  try {
                    const parsed = JSON.parse(data);
                    if (Array.isArray(parsed)) {
                      setDeck(parsed);
                      toast.success(`Loaded '${name}'`);
                    } else {
                      toast.error('Invalid deck data');
                    }
                  } catch {
                    toast.error('Failed to load deck');
                  }
                }
              }}
              aria-label="Load deck"
              title="Load"
            >
              <FolderOpen className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={exportDeck}
              aria-label="Export deck"
              title="Export"
            >
              <Download className="w-3 h-3" />
            </Button>
            {deck.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-destructive/70 hover:text-destructive"
                onClick={clearDeck}
                aria-label="Clear deck"
                title="Clear all"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        <DeckStats
          deckStats={deckStats}
          showAnalytics={showAnalytics}
          setShowAnalytics={setShowAnalytics}
          factions={factions}
        />
      </div>

      {/* Card list */}
      {grouped.length > 0 && (
        <div className="flex-1 overflow-y-auto" role="list" aria-label="Cards in deck">
          {grouped.map(({ card, count, entries }) => {
            const faction = (card.factions && card.factions[0]?.toLowerCase()) || 'shard';
            const factionColor = getFactionColor(faction);
            const canAdd = count < 2;

            return (
              <div
                key={card.key}
                className="flex items-center gap-2 px-2 py-1.5 border-b border-border/50 hover:bg-muted/10 transition-colors group"
                role="listitem"
              >
                {/* Mini card image */}
                <img
                  src={`/card_images/${card.image_name}`}
                  alt=""
                  className="w-7 h-10 rounded object-cover shrink-0"
                  style={{
                    boxShadow: `0 0 0 1px color-mix(in srgb, ${factionColor} 40%, transparent)`,
                  }}
                />

                {/* Card info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate leading-tight">{card.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate capitalize">
                    <span style={{ color: factionColor }}>{faction}</span>
                    {' \u00B7 '}
                    {card.cost}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-0.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      if (entries.length) removeCard(entries[0].id);
                    }}
                    aria-label={`Remove one ${card.name}`}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>

                  <span className="w-4 text-center text-xs font-medium tabular-nums">{count}</span>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      if (canAdd) addCard(card);
                    }}
                    disabled={!canAdd}
                    aria-label={`Add one ${card.name}`}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeAllCopies(card.key)}
                    aria-label={`Remove all ${card.name}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
