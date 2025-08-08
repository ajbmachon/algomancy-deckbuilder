import React, { useEffect, useMemo, useState, useContext } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
      .filter(
        ({ card }) => card.name.toLowerCase().includes(q) || card.type.toLowerCase().includes(q)
      )
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
        <Command className="rounded-lg">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search cards by name or type..."
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
                      <Badge className="bg-white/10 border-white/10">{c.cost}</Badge>
                      <Badge className={`capitalize bg-faction-${faction} text-white`}>
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
