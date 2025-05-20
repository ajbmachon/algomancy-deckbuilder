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
        return 'border-faction-earth shadow-[0_0_15px_rgba(217,119,6,0.2)] hover:shadow-[0_0_20px_rgba(217,119,6,0.4)]';
      case 'wood':
        return 'border-faction-wood shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]';
      case 'fire':
        return 'border-faction-fire shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]';
      case 'water':
        return 'border-faction-water shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]';
      case 'metal':
        return 'border-faction-metal shadow-[0_0_15px_rgba(148,163,184,0.2)] hover:shadow-[0_0_20px_rgba(148,163,184,0.4)]';
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

  // Get faction glow class
  const getFactionGlowClass = (faction) => {
    switch (faction) {
      case 'earth':
        return 'card-earth-glow';
      case 'wood':
        return 'card-wood-glow';
      case 'fire':
        return 'card-fire-glow';
      case 'water':
        return 'card-water-glow';
      case 'metal':
        return 'card-metal-glow';
      default:
        return '';
    }
  };

  const cardClasses = cn(
    'card-container relative group overflow-hidden border-2 transition-all duration-300',
    'cursor-pointer hover:scale-105 hover:-translate-y-2',
    'rounded-xl backdrop-blur-sm bg-black/20',
    getFactionClass(faction),
    getFactionGlowClass(faction),
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
            {/* Card Image with shimmer effect */}
            <div className="overflow-hidden rounded-lg">
              <div className="relative overflow-hidden">
                <img
                  src={`/card_images/${image_name}`}
                  alt={name}
                  className="w-full h-auto object-contain transform transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>

            {/* Cost Badge (always shown) */}
            <Badge
              className={cn(
                'card-badge card-badge-cost',
                `bg-faction-${faction}/80 text-white`,
                'border border-white/20'
              )}
            >
              {cost}
            </Badge>

            {/* Count Badge (shown if count > 1) */}
            {count > 1 && (
              <Badge
                className={cn(
                  'card-badge card-badge-count',
                  getBadgeVariant(faction)
                )}
              >
                {count}×
              </Badge>
            )}

            {/* Card Name Overlay (visible on hover) */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent pt-6 pb-2 px-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-center text-white font-medium truncate">{name}</p>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="right" className="card-tooltip">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg">{name}</h3>
              {cost !== undefined && (
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-faction-${faction}/80 text-white font-bold text-sm border border-white/20`}>
                  {cost}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`px-2 py-1 rounded bg-faction-${faction}/20 text-faction-${faction} border border-faction-${faction}/30 capitalize`}>
                {faction}
              </span>
              {type && (
                <span className="px-2 py-1 rounded bg-white/5 text-white/80 border border-white/10 capitalize">
                  {type}
                </span>
              )}
            </div>
            {text && (
              <div className="mt-3 border-t border-white/10 pt-2">
                <p className="text-sm text-white/90">{text}</p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
