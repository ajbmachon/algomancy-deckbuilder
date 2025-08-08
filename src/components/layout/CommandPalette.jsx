import React, { useEffect, useMemo, useState, useContext } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CardContext } from '@/lib/stores/react/CardProvider';
import { DeckContext } from '@/lib/stores/react/DeckProvider';
import { Badge } from '@/components/ui/badge';

/**
 * Global Command Palette for quick card search and add (⌘K or /)
 */
export default function CommandPalette({ open, onOpenChange }) {
  const { filteredPool } = useContext(CardContext);
  const { addCard } = useContext(DeckContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    function onKey(e) {
      if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        onOpenChange?.(true);
      }
      if (e.key === 'Escape') onOpenChange?.(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenChange]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredPool.slice(0, 30);
    return filteredPool
      .filter(({ card }) => {
        const factions = Array.isArray(card.factions) ? card.factions.join(' ') : '';
        const haystack = [card.name, card.type, card.text || '', String(card.cost ?? ''), factions]
          .join(' \n ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 50);
  }, [filteredPool, query]);

  function handleSelect(item) {
    addCard(item.card);
    onOpenChange?.(false);
    setQuery('');
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden bg-popover/95">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search cards by name, type, rules text, faction, or cost
        </DialogDescription>
        <Command className="rounded-lg">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search cards by name, type, text, faction or cost..."
            className="text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          <CommandList>
            <CommandEmpty>No cards found.</CommandEmpty>
            <CommandGroup heading="Cards">
              {items.map(item => {
                const c = item.card;
                const faction = (c.factions && c.factions[0]?.toLowerCase()) || 'shard';
                return (
                  <CommandItem
                    key={c.name}
                    value={c.name}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={`/card_images/${c.image_name}`}
                        alt=""
                        className="w-10 h-14 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{c.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className="bg-muted/30 border-border">{c.cost}</Badge>
                      <Badge
                        className={`capitalize text-white ${
                          faction === 'earth'
                            ? 'bg-faction-earth'
                            : faction === 'wood'
                              ? 'bg-faction-wood'
                              : faction === 'fire'
                                ? 'bg-faction-fire'
                                : faction === 'water'
                                  ? 'bg-faction-water'
                                  : faction === 'metal'
                                    ? 'bg-faction-metal'
                                    : 'bg-faction-shard'
                        }`}
                      >
                        {faction}
                      </Badge>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
