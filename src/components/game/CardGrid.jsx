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
  ...props
}) {
  // Stack duplicate cards
  const stackedCards = stackCards(cards);

  // Determine grid columns based on compact mode
  const gridClass = compact
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'
    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3';

  return (
    <div
      className={cn('grid', gridClass, className)}
      {...props}
    >
      {stackedCards.map((stackedCard) => {
        const { card, count, entries } = stackedCard;
        const disabled = disabledCards.includes(card.name) ||
                        isCardAtMaxCount(card.name, currentDeck, maxCardCount);

        // Get faction from the first faction in the array, or default to empty string
        const faction = card.factions && card.factions.length > 0 ? card.factions[0].toLowerCase() : '';

        return (
          <GameCard
            key={card.name}
            name={card.name}
            image_name={card.image_name}
            faction={faction}
            count={count}
            cost={card.cost}
            type={card.type}
            text={card.text}
            disabled={disabled}
            onClick={() => onCardClick(card, entries)}
          />
        );
      })}
    </div>
  );
}
