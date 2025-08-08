import React from 'react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Sun, Moon, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Header({ onSearchOpen, theme, onThemeToggle }) {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between space-x-4">
          {/* Left: Logo and Title */}
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground">Algomancy Deckbuilder</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Build your deck with up to 2 copies of each card
              </p>
            </div>
          </div>

          {/* Center: Faction Indicators (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-2">
            <div
              className="flex items-center space-x-2 bg-muted/20 rounded-lg px-3 py-2 border border-border/30"
              role="group"
              aria-label="Available card factions"
            >
              <span className="text-xs font-medium text-muted-foreground mr-1" id="faction-legend">
                Factions:
              </span>
              <FactionDot faction="earth" />
              <FactionDot faction="wood" />
              <FactionDot faction="fire" />
              <FactionDot faction="water" />
              <FactionDot faction="metal" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onSearchOpen}
              className="gap-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              aria-label="Open search (Cmd+K)"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
              <kbd
                className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
                aria-hidden="true"
              >
                ⌘K
              </kbd>
            </Button>

            <Separator orientation="vertical" className="h-6" />

            <Toggle
              variant="outline"
              size="sm"
              pressed={theme === 'light'}
              onPressedChange={pressed => onThemeToggle(pressed ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground hover:border-primary/50 transition-colors"
            >
              {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Toggle>
          </div>
        </div>
      </div>
    </header>
  );
}

function FactionDot({ faction }) {
  const factionColors = {
    earth: 'bg-amber-600',
    wood: 'bg-emerald-600',
    fire: 'bg-red-600',
    water: 'bg-blue-600',
    metal: 'bg-slate-500',
  };

  const factionNames = {
    earth: 'Earth',
    wood: 'Wood',
    fire: 'Fire',
    water: 'Water',
    metal: 'Metal',
  };

  return (
    <div
      className={`w-3 h-3 rounded-full ${factionColors[faction]} opacity-70`}
      title={factionNames[faction]}
      role="img"
      aria-label={`${factionNames[faction]} faction`}
    />
  );
}
