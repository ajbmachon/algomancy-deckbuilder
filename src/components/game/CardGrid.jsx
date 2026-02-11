import React from 'react';
import { GameCard } from './GameCard';
import { LoadingCardGrid } from '@/components/ui/LoadingCard';
import { cn } from '@/lib/utils';
import { stackCards, isCardAtMaxCount } from '@/lib/utils/stackCards';

/**
 * Responsive card grid — maximizes card display area
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
  loading = false,
  ...props
}) {
  const stackedCards = stackCards(cards);

  const gridClass =
    'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3';

  const renderCard = stackedCard => {
    const { card, count, entries } = stackedCard;
    const disabled =
      disabledCards.includes(card.name) || isCardAtMaxCount(card.name, currentDeck, maxCardCount);
    const faction = card.factions && card.factions.length > 0 ? card.factions[0].toLowerCase() : '';
    const wasRecentlyAdded = isRecentlyAdded && isRecentlyAdded(card.name);

    return (
      <div
        key={card.name}
        className={cn(
          'transition-all duration-300',
          wasRecentlyAdded && 'scale-[1.03] -translate-y-1'
        )}
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
        />
      </div>
    );
  };

  if (loading) {
    return <LoadingCardGrid count={12} className={cn('grid', gridClass, className)} {...props} />;
  }

  if (stackedCards.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-muted-foreground">No cards match your filters</p>
      </div>
    );
  }

  return (
    <div className={cn('grid', gridClass, className)} {...props}>
      {stackedCards.map(renderCard)}
    </div>
  );
}
