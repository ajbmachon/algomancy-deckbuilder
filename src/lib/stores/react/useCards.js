import { useContext } from 'react';
import { CardContext } from './CardProvider';

export function useCards() {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error('useCards must be used within a CardProvider');
  }

  return context;
}
