import React from 'react';
import { factionBgClass } from '@/lib/utils/deckUtils.jsx';

/**
 * Compact deck stats bar
 */
export function DeckStats({ deckStats, showAnalytics, setShowAnalytics, factions }) {
  if (deckStats.totalCards === 0) {
    return (
      <div className="empty-state py-10" role="status">
        <div className="mx-auto mb-3 w-12 h-12 rounded-lg bg-muted/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-muted-foreground/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="20" height="15" rx="2" />
            <path d="M16 2H8a2 2 0 00-2 2v3h12V4a2 2 0 00-2-2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-muted-foreground mb-1">Empty deck</p>
        <p className="text-xs text-muted-foreground/60 max-w-[200px] mx-auto">
          Click cards to add them. Max 2 copies each.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Faction distribution bar */}
      <div className="flex h-1.5 rounded-full overflow-hidden bg-muted/20">
        {Object.entries(deckStats.factionCounts).map(([faction, count]) => {
          const pct = Math.round((count / Math.max(deckStats.totalCards, 1)) * 100);
          if (pct === 0) return null;
          return (
            <div
              key={faction}
              className={`${factionBgClass(faction)} transition-all duration-300`}
              style={{ width: `${pct}%` }}
              title={`${faction}: ${count} (${pct}%)`}
            />
          );
        })}
      </div>

      {/* Faction counts row */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {Object.entries(deckStats.factionCounts).map(([faction, count]) => (
          <span key={faction} className="text-[10px] text-muted-foreground capitalize tabular-nums">
            {faction} <span className="text-foreground font-medium">{count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
