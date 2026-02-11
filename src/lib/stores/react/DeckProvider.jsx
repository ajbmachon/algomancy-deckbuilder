import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

// Create the context
export const DeckContext = createContext(null);

// Custom hook to use deck context
export function useDeck() {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return context;
}

export function DeckProvider({ children }) {
  // Initialize deck from localStorage if available
  const [deck, setDeck] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('decklist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved deck:', e);
        }
      }
    }
    return [];
  });

  // Save to localStorage whenever deck changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('decklist', JSON.stringify(deck));
    }
  }, [deck]);

  // Add card to deck
  const addCard = useCallback(card => {
    setDeck(prev => {
      // Check if we already have 2 copies
      const existingCount = prev.filter(
        item => item.card?.key === card.key || item.key === card.key
      ).length;

      if (existingCount >= 2) {
        return prev;
      }

      // Add the card with a unique ID
      return [
        ...prev,
        {
          id: Date.now() + Math.random(), // Ensure unique ID
          card: card,
          key: card.key,
        },
      ];
    });
  }, []);

  // Remove card from deck
  const removeCard = useCallback(cardId => {
    setDeck(prev => prev.filter(item => item.id !== cardId));
  }, []);

  // Remove all copies of a card
  const removeAllCopies = useCallback(cardKey => {
    setDeck(prev => prev.filter(item => item.card?.key !== cardKey && item.key !== cardKey));
  }, []);

  // Clear entire deck
  const clearDeck = useCallback(() => {
    setDeck([]);
  }, []);

  // Get count of a specific card in deck
  const getCardCount = useCallback(
    cardKey => {
      return deck.filter(item => item.card?.key === cardKey || item.key === cardKey).length;
    },
    [deck]
  );

  // Export deck to JSON
  const exportDeck = useCallback(() => {
    const deckData = JSON.stringify(deck, null, 2);
    const blob = new Blob([deckData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `algomancy-deck-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  }, [deck]);

  // Import deck from JSON
  const importDeck = useCallback(jsonData => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (Array.isArray(parsed)) {
        setDeck(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import deck:', e);
      return false;
    }
  }, []);

  const value = {
    // State
    deck,
    setDeck,

    // Actions
    addCard,
    removeCard,
    removeAllCopies,
    clearDeck,
    exportDeck,
    importDeck,

    // Helpers
    getCardCount,
    deckSize: deck.length,
  };

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}
