import React from 'react';
import { GameCard } from './GameCard';
import { cn } from '@/lib/utils';
import { stackCards, isCardAtMaxCount } from '@/lib/utils/stackCards';

/**
 * Grid component for displaying cards
 */
export function CardGrid({
  cards = [],
  onCardClick,
  disabledCards = [],
  compact = false,
  currentDeck = [],
  maxCardCount = 2,
  className,
  isRecentlyAdded,
  ...props
}) {
  // Stack duplicate cards
  const stackedCards = stackCards(cards);

  // Determine grid columns based on compact mode
  const gridClass = compact
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3';

  // Disable grouping by type - display all cards in a simple grid
  const groupByType = false;

  // Render a card with consistent props
  const renderCard = stackedCard => {
    const { card, count, entries } = stackedCard;
    const disabled =
      disabledCards.includes(card.name) || isCardAtMaxCount(card.name, currentDeck, maxCardCount);

    // Get faction from the first faction in the array, or default to empty string
    const faction = card.factions && card.factions.length > 0 ? card.factions[0].toLowerCase() : '';

    // Check if this card was recently added (for highlighting)
    const wasRecentlyAdded = isRecentlyAdded && isRecentlyAdded(card.name);

    return (
      <div
        key={card.name}
        className={`transition-all duration-300 ${wasRecentlyAdded ? 'scale-105 -translate-y-2' : ''}`}
      >
        <GameCard
          name={card.name}
          image_name={card.image_name}
          faction={faction}
          count={count}
          cost={card.cost}
          type={card.type}
          text={card.text}
          disabled={disabled}
          onClick={() => onCardClick(card, entries)}
          title={card.name}
          className={wasRecentlyAdded ? 'recently-added' : ''}
        />
      </div>
    );
  };

  if (!groupByType) {
    return (
      <div className={cn('grid', gridClass, className)} {...props}>
        {stackedCards.map(renderCard)}
      </div>
    );
  }

  // If grouping by type - this code is currently unreachable since groupByType is false
  // Kept for future implementation but with proper variable declarations
  /* 
  return (
    <div className="space-y-6">
      {Object.keys(groupedCards).map(type => (
        <div key={type} className="space-y-2">
          <h3 className="text-sm font-medium uppercase text-muted-foreground flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
            {type}
            <span className="ml-2 text-xs">({groupedCards[type].length})</span>
          </h3>
          <div className={cn('grid', gridClass)}>
            {groupedCards[type].map(renderCard)}
          </div>
        </div>
      ))}
    </div>
  );
  */

  // This code is unreachable, but we return something to satisfy the compiler
  return null;
}
