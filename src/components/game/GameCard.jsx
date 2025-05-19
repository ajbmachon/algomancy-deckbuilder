import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

/**
 * Game card component for Algomancy
 */
export function GameCard({
  name,
  image_name,
  faction,
  count = 1,
  cost,
  type,
  text,
  disabled = false,
  onClick,
  className,
  ...props
}) {
  // Get the faction color class
  const getFactionClass = (faction) => {
    switch (faction) {
      case 'earth':
        return 'border-faction-earth shadow-[0_0_10px_rgba(217,119,6,0.3)] hover:shadow-[0_0_15px_rgba(217,119,6,0.5)]';
      case 'wood':
        return 'border-faction-wood shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]';
      case 'fire':
        return 'border-faction-fire shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      case 'water':
        return 'border-faction-water shadow-[0_0_10px_rgba(14,165,233,0.3)] hover:shadow-[0_0_15px_rgba(14,165,233,0.5)]';
      case 'metal':
        return 'border-faction-metal shadow-[0_0_10px_rgba(148,163,184,0.3)] hover:shadow-[0_0_15px_rgba(148,163,184,0.5)]';
      default:
        return 'border-gray-700 shadow-lg hover:shadow-xl';
    }
  };

  // Badge variant by faction
  const getBadgeVariant = (faction) => {
    switch (faction) {
      case 'earth':
        return 'bg-gradient-to-br from-faction-earth to-faction-earth/80 text-white font-bold';
      case 'wood':
        return 'bg-gradient-to-br from-faction-wood to-faction-wood/80 text-white font-bold';
      case 'fire':
        return 'bg-gradient-to-br from-faction-fire to-faction-fire/80 text-white font-bold';
      case 'water':
        return 'bg-gradient-to-br from-faction-water to-faction-water/80 text-white font-bold';
      case 'metal':
        return 'bg-gradient-to-br from-faction-metal to-faction-metal/80 text-white font-bold';
      default:
        return 'bg-gradient-to-br from-primary to-primary/80 text-white font-bold';
    }
  };

  const cardClasses = cn(
    'relative group overflow-hidden border-2 transition-all duration-300',
    'cursor-pointer hover:scale-105 hover:-translate-y-1',
    'rounded-xl',
    getFactionClass(faction),
    disabled && 'opacity-50 pointer-events-none saturate-0',
    className
  );

  // Apply special glow effect for deck cards
  const isDeckCard = count > 1;
  const deckCardClass = isDeckCard ? 'deck-card-glow' : '';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`${cardClasses} ${deckCardClass}`} onClick={!disabled ? onClick : undefined} {...props}>
            {/* Card Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={`/card_images/${image_name}`}
                alt={name}
                className="w-full h-auto object-contain transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Cost Badge (always shown) */}
            <Badge
              className={`absolute top-2 left-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${
                faction ? `bg-faction-${faction}/80 text-white` : 'bg-gray-700/80 text-white'
              } border border-white/20`}
            >
              {cost}
            </Badge>

            {/* Count Badge (shown if count > 1) */}
            {count > 1 && (
              <Badge
                className={cn(
                  'absolute top-2 right-2 rounded-full',
                  getBadgeVariant(faction)
                )}
              >
                {count}×
              </Badge>
            )}
          </Card>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs bg-black/90 p-4 rounded-lg border border-white/10 shadow-xl backdrop-blur-sm">
          <div className="space-y-2">
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`px-2 py-1 rounded bg-faction-${faction}/20 text-faction-${faction} border border-faction-${faction}/30 capitalize`}>
                {faction}
              </span>
              {cost && (
                <span className="px-2 py-1 rounded bg-white/5 text-white/80 border border-white/10">
                  Cost: {cost}
                </span>
              )}
              {type && (
                <span className="px-2 py-1 rounded bg-white/5 text-white/80 border border-white/10 capitalize">
                  {type}
                </span>
              )}
            </div>
            {text && <p className="text-sm text-white/90 border-t border-white/10 pt-2 mt-2">{text}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
