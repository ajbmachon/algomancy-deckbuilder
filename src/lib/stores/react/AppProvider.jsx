import React from 'react';
import { CardProvider } from './CardProvider';
import { DeckProvider } from './DeckProvider';
import { FilterProvider } from './FilterProvider';

// Combined provider for all app state
export function AppProvider({ children }) {
  return (
    <FilterProvider>
      <CardProvider>
        <DeckProvider>{children}</DeckProvider>
      </CardProvider>
    </FilterProvider>
  );
}
