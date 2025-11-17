import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { saveDeck, deckExists, getAllDecklistNames } from '@/lib/services/decklistManager';

/**
 * Dialog for saving a deck with a name
 */
export function SaveDeckDialog({ open, onOpenChange, deck, onSaveSuccess }) {
  const [deckName, setDeckName] = useState('');
  const [existingDecks, setExistingDecks] = useState([]);
  const [overwrite, setOverwrite] = useState(false);

  useEffect(() => {
    if (open) {
      setExistingDecks(getAllDecklistNames());
      setDeckName('');
      setOverwrite(false);
    }
  }, [open]);

  useEffect(() => {
    setOverwrite(deckExists(deckName));
  }, [deckName]);

  const handleSave = () => {
    const trimmedName = deckName.trim();

    if (!trimmedName) {
      toast.error('Please enter a deck name');
      return;
    }

    if (deck.length === 0) {
      toast.error('Cannot save an empty deck');
      return;
    }

    const success = saveDeck(trimmedName, deck);

    if (success) {
      const action = overwrite ? 'updated' : 'saved';
      toast.success(`Deck '${trimmedName}' ${action} successfully`);
      onOpenChange(false);
      if (onSaveSuccess) {
        onSaveSuccess(trimmedName);
      }
    } else {
      toast.error('Failed to save deck');
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Deck</DialogTitle>
          <DialogDescription>
            Enter a name for your deck. You can overwrite an existing deck by using the same name.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="deck-name">Deck Name</Label>
            <Input
              id="deck-name"
              placeholder="Enter deck name..."
              value={deckName}
              onChange={e => setDeckName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>

          {overwrite && (
            <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-md p-3">
              ⚠️ A deck with this name already exists. Saving will overwrite it.
            </div>
          )}

          {existingDecks.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Existing Decks</Label>
              <div className="max-h-32 overflow-y-auto border border-border rounded-md p-2">
                <div className="space-y-1">
                  {existingDecks.map(name => (
                    <button
                      key={name}
                      className="block w-full text-left text-sm px-2 py-1 rounded hover:bg-muted/50 truncate"
                      onClick={() => setDeckName(name)}
                      type="button"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Deck contains {deck.length} card{deck.length !== 1 ? 's' : ''}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!deckName.trim()}>
            {overwrite ? 'Overwrite' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
