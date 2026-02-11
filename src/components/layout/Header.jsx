import React from 'react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Sun, Moon, Search } from 'lucide-react';

export function Header({ onSearchOpen, theme, onThemeToggle }) {
  return (
    <header
      className="shrink-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md"
      role="banner"
    >
      <div className="flex h-11 items-center justify-between px-3 md:px-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
            <svg
              className="w-4 h-4 text-background"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-base font-bold tracking-tight gradient-heading">
              Algomancy
            </span>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
              Deckbuilder
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSearchOpen}
            className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2"
            aria-label="Open search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-flex kbd ml-1" aria-hidden="true">
              ⌘K
            </kbd>
          </Button>

          <div className="w-px h-4 bg-border" />

          <Toggle
            variant="outline"
            size="sm"
            pressed={theme === 'light'}
            onPressedChange={pressed => onThemeToggle(pressed ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="h-7 w-7 p-0"
          >
            {theme === 'light' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </Toggle>
        </div>
      </div>
    </header>
  );
}
