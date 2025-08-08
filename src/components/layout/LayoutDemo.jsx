import React from 'react';
import { DeckbuilderLayout, LayoutProvider } from './DeckbuilderLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

// Mock filter panel
const MockFilterPanel = () => (
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-2">Factions</h4>
      <div className="space-y-2">
        {['Earth', 'Wood', 'Fire', 'Water', 'Metal'].map(faction => (
          <label key={faction} className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span>{faction}</span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <h4 className="font-medium mb-2">Cost</h4>
      <input type="range" min="0" max="10" className="w-full" />
    </div>
    <div>
      <h4 className="font-medium mb-2">Type</h4>
      <div className="space-y-2">
        {['Creature', 'Spell', 'Artifact'].map(type => (
          <label key={type} className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

// Mock card grid
const MockCardPool = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Card Pool</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 24 }, (_, i) => (
        <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Card {i + 1}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 rounded" />
            <div className="mt-2 text-xs text-muted-foreground">
              Cost: {Math.floor(Math.random() * 6)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Mock deck panel
const MockDeckPanel = () => (
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-2">Deck Stats</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Total Cards:</span>
          <span>40</span>
        </div>
        <div className="flex justify-between">
          <span>Avg Cost:</span>
          <span>3.2</span>
        </div>
      </div>
    </div>
    <div>
      <h4 className="font-medium mb-2">Cards (8)</h4>
      <div className="space-y-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="p-2 bg-background rounded border border-border hover:border-primary transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm">Sample Card {i + 1}</span>
              <span className="text-xs text-muted-foreground">x2</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export function LayoutDemo() {
  return (
    <LayoutProvider>
      <div className="h-screen bg-background">
        <DeckbuilderLayout
          filterPanel={<MockFilterPanel />}
          cardPool={<MockCardPool />}
          deckPanel={<MockDeckPanel />}
          className="h-full p-4"
        />
      </div>
    </LayoutProvider>
  );
}
