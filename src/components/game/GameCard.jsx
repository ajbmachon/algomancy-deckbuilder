import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use faction colors from tailwind config
  const getFactionColor = faction => {
    switch (faction) {
      case 'earth':
        return '#B45309'; // Amber-700
      case 'wood':
        return '#047857'; // Emerald-700
      case 'fire':
        return '#B91C1C'; // Red-700
      case 'water':
        return '#0369A1'; // Sky-700
      case 'metal':
        return '#475569'; // Slate-600
      default:
        return '#7C3AED'; // Violet-600 for shard/generic
    }
  };

  // Get the faction color class
  const getFactionClass = faction => {
    switch (faction) {
      case 'earth':
        return 'border-faction-earth shadow-[0_0_15px_rgba(180,83,9,0.2)] hover:shadow-[0_0_20px_rgba(180,83,9,0.4)]';
      case 'wood':
        return 'border-faction-wood shadow-[0_0_15px_rgba(4,120,87,0.2)] hover:shadow-[0_0_20px_rgba(4,120,87,0.4)]';
      case 'fire':
        return 'border-faction-fire shadow-[0_0_15px_rgba(185,28,28,0.2)] hover:shadow-[0_0_20px_rgba(185,28,28,0.4)]';
      case 'water':
        return 'border-faction-water shadow-[0_0_15px_rgba(3,105,161,0.2)] hover:shadow-[0_0_20px_rgba(3,105,161,0.4)]';
      case 'metal':
        return 'border-faction-metal shadow-[0_0_15px_rgba(71,85,105,0.2)] hover:shadow-[0_0_20px_rgba(71,85,105,0.4)]';
      case 'shard':
        return 'border-faction-shard shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]';
      default:
        return 'border-faction-shard shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]';
    }
  };

  // Get faction glow class
  const getFactionGlowClass = faction => {
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
      case 'shard':
        return 'card-shard-glow';
      default:
        return 'card-shard-glow';
    }
  };

  const cardClasses = cn(
    'card-container relative group overflow-hidden border-2 transition-all duration-300',
    'cursor-pointer hover:scale-105 hover:-translate-y-2',
    'rounded-xl backdrop-blur-sm bg-black/20',
    'w-full aspect-[2/3] max-w-[216px] mx-auto', // ~20% larger for readability on desktop
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background', // Focus state for accessibility
    getFactionClass(faction),
    getFactionGlowClass(faction),
    disabled && 'opacity-50 pointer-events-none saturate-0',
    className
  );

  // Apply special glow effect for deck cards
  const isDeckCard = count > 1;
  const deckCardClass = isDeckCard ? 'deck-card-glow' : '';

  // Handle image load success
  const handleImageLoaded = () => setImageLoaded(true);

  // Handle image load error
  const handleImageError = () => setImageError(true);

  // Handle keyboard navigation
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent scroll on space press
      if (!disabled && onClick) onClick();
    }
  };

  // Generate ARIA label for accessibility
  const getAriaLabel = () => {
    let label = `${name}, ${faction} faction`;
    if (cost !== undefined) label += `, cost: ${cost}`;
    if (type) label += `, type: ${type}`;
    if (count > 1) label += `, ${count} copies`;
    if (disabled) label += ', disabled';
    return label;
  };

  // Format card text to highlight keywords like "augment" in bold
  const formatCardText = text => {
    if (!text) return '';

    // Replace [Switch 1] with <strong>augment</strong>, etc.
    // Add more keyword replacements as needed
    return text
      .replace(/\[Switch\s*(\d+)\]/g, '<strong>augment</strong>')
      .replace(/\{(\w+)\}/g, '<strong>$1</strong>');
  };

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card
          className={`${cardClasses} ${deckCardClass}`}
          onClick={!disabled ? onClick : undefined}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-disabled={disabled}
          aria-label={getAriaLabel()}
          {...props}
        >
          {/* Card Image with shimmer effect */}
          <div className="h-full w-full overflow-hidden rounded-lg flex items-center justify-center">
            <div className="relative h-full w-full overflow-hidden">
              {/* Image placeholder while loading */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 animate-pulse">
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{
                      backgroundColor: `${getFactionColor(faction)}20`,
                      borderColor: getFactionColor(faction),
                    }}
                  ></div>
                </div>
              )}

              {/* Fallback for image errors */}
              {imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-2">
                  <span
                    className="text-xs text-center font-medium"
                    style={{ color: getFactionColor(faction) }}
                  >
                    {name}
                  </span>
                </div>
              )}

              <img
                src={`/card_images/${image_name}`}
                alt={`Card art for ${name}`}
                className={cn(
                  'w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110',
                  !imageLoaded && 'opacity-0',
                  imageError && 'hidden'
                )}
                loading="lazy"
                onLoad={handleImageLoaded}
                onError={handleImageError}
              />

              {/* Overlay shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          {/* Cost Badge (always shown) */}
          <Badge
            className="card-badge card-badge-cost z-10 text-white border border-white/20"
            style={{ backgroundColor: `${getFactionColor(faction)}CC` }}
          >
            {cost}
          </Badge>

          {/* Count Badge (shown if count > 1) - moved to upper right with improved styling */}
          {count > 1 && (
            <Badge
              className="absolute top-1 right-1 px-3 py-1 rounded-md z-20 text-white font-bold"
              style={{
                background: `linear-gradient(135deg, ${getFactionColor(faction)}, ${getFactionColor(faction)}CC)`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {count}×
            </Badge>
          )}

          {/* Card Name Overlay (visible on hover) */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-8 pb-2 px-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <p className="text-xs text-center text-white font-medium truncate">{name}</p>
          </div>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        align="start"
        className="card-tooltip max-w-[300px] max-h-[300px] overflow-y-auto bg-black/90 p-4 border border-white/10 shadow-xl backdrop-blur-sm"
        sideOffset={10}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-lg line-clamp-2">{name}</h3>
            {cost !== undefined && (
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white font-bold text-sm border border-white/20 flex-shrink-0 ml-2"
                style={{ backgroundColor: `${getFactionColor(faction)}CC` }}
              >
                {cost}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span
              className="px-2 py-1 rounded capitalize border"
              style={{
                backgroundColor: `${getFactionColor(faction)}20`,
                borderColor: `${getFactionColor(faction)}30`,
                color: getFactionColor(faction),
              }}
            >
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
              <p
                className="text-sm text-white/90"
                dangerouslySetInnerHTML={{ __html: formatCardText(text) }}
              ></p>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
