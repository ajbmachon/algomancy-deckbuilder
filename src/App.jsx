import React from 'react';
import { DeckBuilder } from './components/game';
import './styles/globals.css';

// Import card database
import cardData from './lib/assets/cards_db.json';

function App() {
  // Format cards for the deck builder
  const formattedCards = cardData.cards.map(card => ({
    id: card.key,
    card: card
  }));

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="container mx-auto mb-8">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Algomancy Deckbuilder
            </h1>
            <p className="text-muted-foreground">Build your deck with up to 2 copies of each card</p>
          </div>
          <div className="flex space-x-2">
            <span className="bg-faction-earth px-3 py-1 rounded-md text-xs font-medium text-white">Earth</span>
            <span className="bg-faction-wood px-3 py-1 rounded-md text-xs font-medium text-white">Wood</span>
            <span className="bg-faction-fire px-3 py-1 rounded-md text-xs font-medium text-white">Fire</span>
            <span className="bg-faction-water px-3 py-1 rounded-md text-xs font-medium text-white">Water</span>
            <span className="bg-faction-metal px-3 py-1 rounded-md text-xs font-medium text-white">Metal</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto">
        <DeckBuilder
          cardPool={formattedCards}
          initialDeck={[]}
        />
      </main>

      <footer className="container mx-auto mt-12 pt-4 border-t border-white/10 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Algomancy Deckbuilder</p>
      </footer>
    </div>
  );
}

export default App;
