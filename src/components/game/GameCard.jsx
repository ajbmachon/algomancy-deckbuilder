import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

/**
 * Game card component — refined for the Ethereal Forge aesthetic
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
  const [tooltipSide, setTooltipSide] = useState('right');
  const cardRef = useRef(null);

  const updateTooltipPosition = () => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    if (vw < 768) {
      setTooltipSide('top');
    } else {
      const wouldOverflow = rect.right + 300 > vw - 20;
      const isPastCenter = rect.left + rect.width / 2 > vw * 0.5;
      setTooltipSide(isPastCenter || wouldOverflow ? 'left' : 'right');
    }
  };

  useEffect(() => {
    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
    return () => window.removeEventListener('resize', updateTooltipPosition);
  }, []);

  const getFactionColor = faction => {
    const colors = {
      earth: 'rgb(198 122 26)',
      wood: 'rgb(22 163 74)',
      fire: 'rgb(220 38 38)',
      water: 'rgb(2 132 199)',
      metal: 'rgb(148 163 184)',
      shard: 'rgb(168 85 247)',
    };
    return colors[faction] || colors.shard;
  };

  const getFactionGlowClass = faction => {
    const map = {
      earth: 'card-earth-glow',
      wood: 'card-wood-glow',
      fire: 'card-fire-glow',
      water: 'card-water-glow',
      metal: 'card-metal-glow',
      shard: 'card-shard-glow',
    };
    return map[faction] || map.shard;
  };

  const formatCardText = text => {
    if (!text) return '';
    return text
      .replace(/\[Switch\s*(\d+)\]/g, '<strong>augment</strong>')
      .replace(/\{(\w+)\}/g, '<strong>$1</strong>');
  };

  const cardClasses = cn(
    'card-container relative group overflow-hidden border',
    'cursor-pointer',
    'rounded-lg bg-black/30',
    'w-full aspect-[2/3]',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background',
    getFactionGlowClass(faction),
    disabled && 'opacity-40 pointer-events-none saturate-0',
    className
  );

  const factionColor = getFactionColor(faction);

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Card
          ref={cardRef}
          className={cardClasses}
          style={{ borderColor: `color-mix(in srgb, ${factionColor} 30%, transparent)` }}
          onClick={!disabled ? onClick : undefined}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
              e.preventDefault();
              onClick();
            }
          }}
          onMouseEnter={updateTooltipPosition}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-disabled={disabled}
          aria-label={`${name}, ${faction} faction${cost !== undefined ? `, cost ${cost}` : ''}${count > 1 ? `, ${count} copies` : ''}`}
          {...props}
        >
          {/* Image */}
          <div className="h-full w-full overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-card animate-pulse">
                <div
                  className="w-8 h-8 rounded bg-muted/50"
                  style={{ borderColor: factionColor }}
                />
              </div>
            )}

            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-card p-2">
                <span className="text-[10px] text-center text-muted-foreground font-medium">
                  {name}
                </span>
              </div>
            )}

            <img
              src={`/card_images/${image_name}`}
              alt={`${name}`}
              className={cn(
                'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
                !imageLoaded && 'opacity-0',
                imageError && 'hidden'
              )}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />

            {/* Subtle shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Cost badge */}
          <Badge
            className="card-badge card-badge-cost z-10 text-white text-[10px] border-0"
            style={{
              backgroundColor: `color-mix(in srgb, ${factionColor} 85%, black)`,
            }}
          >
            {cost}
          </Badge>

          {/* Count badge */}
          {count > 1 && (
            <Badge
              className="absolute top-1 right-1 px-1.5 py-0.5 rounded z-20 text-white text-[10px] font-bold border-0"
              style={{
                background: factionColor,
                boxShadow: `0 0 8px color-mix(in srgb, ${factionColor} 50%, transparent)`,
              }}
            >
              {count}x
            </Badge>
          )}

          {/* Name overlay on hover */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-1.5 px-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-250 z-10">
            <p className="text-[10px] text-center text-white font-medium truncate">{name}</p>
          </div>
        </Card>
      </HoverCardTrigger>

      <HoverCardContent
        side={tooltipSide}
        align="start"
        className="card-tooltip max-w-[280px] max-h-[280px] overflow-y-auto p-3"
        sideOffset={8}
        role="tooltip"
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display font-bold text-sm text-foreground leading-tight">{name}</h4>
            {cost !== undefined && (
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded text-white font-bold text-[10px] shrink-0"
                style={{ backgroundColor: factionColor }}
              >
                {cost}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span
              className="px-1.5 py-0.5 rounded text-[10px] capitalize font-medium"
              style={{
                backgroundColor: `color-mix(in srgb, ${factionColor} 15%, transparent)`,
                color: factionColor,
              }}
            >
              {faction}
            </span>
            {type && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-muted/50 text-muted-foreground capitalize">
                {type}
              </span>
            )}
          </div>
          {text && (
            <div className="border-t border-border/50 pt-2 mt-2">
              <p
                className="text-xs text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatCardText(text) }}
              />
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
