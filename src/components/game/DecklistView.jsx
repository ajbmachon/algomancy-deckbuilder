import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';
import {
  getAllDecklists,
  loadDeck,
  deleteDeck,
  renameDeck,
  duplicateDeck,
} from '@/lib/services/decklistManager';
import { getFactionIcon } from '@/lib/utils/deckUtils';

/**
 * Dialog for viewing and managing saved decklists
 */
export function DecklistView({ open, onOpenChange, onLoadDeck }) {
  const [decklists, setDecklists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [renamingDeck, setRenamingDeck] = useState(null);
  const [newName, setNewName] = useState('');

  // Load decklists when dialog opens
  useEffect(() => {
    if (open) {
      refreshDecklists();
      setSearchQuery('');
      setRenamingDeck(null);
    }
  }, [open]);

  const refreshDecklists = () => {
    setDecklists(getAllDecklists());
  };

  const handleLoadDeck = deckName => {
    const deck = loadDeck(deckName);
    if (deck) {
      onLoadDeck(deck);
      toast.success(`Loaded deck '${deckName}'`);
      onOpenChange(false);
    } else {
      toast.error(`Failed to load deck '${deckName}'`);
    }
  };

  const handleDeleteDeck = deckName => {
    if (window.confirm(`Are you sure you want to delete '${deckName}'?`)) {
      const success = deleteDeck(deckName);
      if (success) {
        toast.success(`Deleted deck '${deckName}'`);
        refreshDecklists();
      } else {
        toast.error(`Failed to delete deck '${deckName}'`);
      }
    }
  };

  const startRename = deckName => {
    setRenamingDeck(deckName);
    setNewName(deckName);
  };

  const handleRename = () => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      toast.error('Deck name cannot be empty');
      return;
    }

    const success = renameDeck(renamingDeck, trimmedName);
    if (success) {
      toast.success(`Renamed deck to '${trimmedName}'`);
      setRenamingDeck(null);
      setNewName('');
      refreshDecklists();
    } else {
      toast.error('Failed to rename deck');
    }
  };

  const handleDuplicate = deckName => {
    const newDeckName = `${deckName} (copy)`;
    let finalName = newDeckName;
    let counter = 2;

    // Find a unique name
    while (decklists.some(d => d.name === finalName)) {
      finalName = `${newDeckName} ${counter}`;
      counter++;
    }

    const success = duplicateDeck(deckName, finalName);
    if (success) {
      toast.success(`Duplicated deck as '${finalName}'`);
      refreshDecklists();
    } else {
      toast.error('Failed to duplicate deck');
    }
  };

  const filteredDecklists = decklists.filter(deck =>
    deck.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
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
            Saved Decklists
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({decklists.length})
            </span>
          </DialogTitle>
          <DialogDescription>
            Manage your saved decks. Click on a deck to load it.
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="py-2">
          <Input
            placeholder="Search decks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Decklist Grid */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredDecklists.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {decklists.length === 0 ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 mx-auto mb-4 opacity-50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="7" width="20" height="15" rx="2" />
                    <path d="M16 2H8a2 2 0 00-2 2v3h12V4a2 2 0 00-2-2z" />
                  </svg>
                  <p className="text-lg font-medium mb-2">No saved decks yet</p>
                  <p className="text-sm">Create a deck and save it to see it here</p>
                </>
              ) : (
                <p>No decks match your search</p>
              )}
            </div>
          ) : (
            filteredDecklists.map(deck => (
              <Card
                key={deck.name}
                className="modern-card hover:border-accent/50 transition-all cursor-pointer group"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    {/* Deck Info */}
                    <div className="flex-1 min-w-0" onClick={() => handleLoadDeck(deck.name)}>
                      {renamingDeck === deck.name ? (
                        <div className="flex items-center gap-2 mb-2">
                          <Input
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            onKeyPress={e => {
                              if (e.key === 'Enter') handleRename();
                              if (e.key === 'Escape') setRenamingDeck(null);
                            }}
                            className="h-8 text-sm"
                            autoFocus
                            onClick={e => e.stopPropagation()}
                          />
                          <Button
                            size="sm"
                            onClick={e => {
                              e.stopPropagation();
                              handleRename();
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={e => {
                              e.stopPropagation();
                              setRenamingDeck(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-accent transition-colors">
                          {deck.name}
                        </h3>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span>
                          {deck.cardCount} card{deck.cardCount !== 1 ? 's' : ''}
                        </span>
                        <span>{deck.uniqueCardCount} unique</span>
                        <span className="text-xs">{formatDate(deck.lastModified)}</span>
                      </div>

                      {/* Factions */}
                      {deck.factions && deck.factions.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {deck.factions.map(faction => (
                            <div
                              key={faction}
                              className="flex items-center gap-1 text-xs capitalize"
                              title={faction}
                            >
                              {getFactionIcon(faction)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={e => {
                          e.stopPropagation();
                          handleLoadDeck(deck.name);
                        }}
                        title="Load deck"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={e => {
                          e.stopPropagation();
                          startRename(deck.name);
                        }}
                        title="Rename deck"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={e => {
                          e.stopPropagation();
                          handleDuplicate(deck.name);
                        }}
                        title="Duplicate deck"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteDeck(deck.name);
                        }}
                        className="hover:text-destructive"
                        title="Delete deck"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
