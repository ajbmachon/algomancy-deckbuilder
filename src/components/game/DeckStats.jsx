import React from 'react';
import { Button } from '../ui/button';
import { factionBgClass, factionBg20Class, factionTextClass } from '@/lib/utils/deckUtils.jsx';

/**
 * Deck analytics and statistics display
 */
export function DeckStats({ deckStats, showAnalytics, setShowAnalytics, factions }) {
  if (deckStats.totalCards === 0) {
    return (
      <div className="empty-state" role="status" aria-label="Empty deck state">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-75 duration-1000"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mx-auto text-muted-foreground/30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="20" height="15" rx="2" />
            <path d="M16 2H8a2 2 0 00-2 2v3h12V4a2 2 0 00-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-muted-foreground mb-2">Your deck is empty</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Click on cards in the Card Pool to add them to your deck. You can add up to 2 copies of
          each card.
        </p>
        <div className="mt-6 flex justify-center space-grid-tight">
          {factions.map(faction => (
            <span
              key={faction}
              className={`faction-badge faction-badge-${faction} animate-pulse`}
            ></span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="border-border"
          onClick={() => setShowAnalytics(s => !s)}
          aria-expanded={showAnalytics}
          aria-label={`${showAnalytics ? 'Hide' : 'Show'} deck analytics`}
        >
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </Button>
      </div>

      {showAnalytics && (
        <div
          className="mb-6 grid grid-cols-2 space-filter-group space-deck-item bg-muted/30 rounded-lg border border-border"
          role="region"
          aria-label="Detailed faction analytics"
        >
          {/* Simple inline charts using CSS bars to avoid heavy deps at runtime */}
          {Object.entries(deckStats.factionCounts).map(([faction, count]) => {
            const percentage = Math.round((count / Math.max(deckStats.totalCards, 1)) * 100);
            return (
              <div key={faction} className="space-y-1">
                <div className="flex items-center justify-between text-xs capitalize">
                  <span>{faction}</span>
                  <span aria-label={`${count} cards`}>{count}</span>
                </div>
                <div
                  className="h-2 bg-muted/30 rounded"
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${faction} faction: ${percentage}% of deck`}
                >
                  <div
                    className={`h-full rounded ${factionBgClass(faction)}`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="mb-6 grid grid-cols-2 sm:grid-cols-5 space-grid-tight space-deck-item bg-muted/30 rounded-lg border border-border"
        role="region"
        aria-label="Faction distribution summary"
      >
        {/* Deck Stats */}
        {Object.entries(deckStats.factionCounts).map(([faction, count]) => {
          const percentage = Math.round((count / deckStats.totalCards) * 100);
          return (
            <div key={faction} className="flex flex-col items-center">
              <div
                className={`w-full h-1 rounded-full ${factionBg20Class(faction)} mb-1 overflow-hidden`}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`${faction} faction: ${percentage}% of deck`}
              >
                <div
                  className={`h-full ${factionBgClass(faction)} rounded-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span
                className={`text-xs capitalize ${factionTextClass(faction)}`}
                aria-label={`${faction} faction: ${count} cards`}
              >
                {faction}: {count}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
