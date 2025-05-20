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
    <div className="min-h-screen p-4 md:p-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full filter blur-[80px]" />
      </div>

      <header className="container mx-auto mb-8">
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold gradient-heading tracking-tight">
              Algomancy Deckbuilder
            </h1>
            <p className="text-muted-foreground mt-2">Build your deck with up to 2 copies of each card</p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <span className="faction-badge faction-badge-earth group">
              <span className="inline-block transition-transform group-hover:animate-pulse">Earth</span>
            </span>
            <span className="faction-badge faction-badge-wood group">
              <span className="inline-block transition-transform group-hover:animate-pulse">Wood</span>
            </span>
            <span className="faction-badge faction-badge-fire group">
              <span className="inline-block transition-transform group-hover:animate-pulse">Fire</span>
            </span>
            <span className="faction-badge faction-badge-water group">
              <span className="inline-block transition-transform group-hover:animate-pulse">Water</span>
            </span>
            <span className="faction-badge faction-badge-metal group">
              <span className="inline-block transition-transform group-hover:animate-pulse">Metal</span>
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto relative z-10">
        <DeckBuilder
          cardPool={formattedCards}
          initialDeck={[]}
        />
      </main>

      <footer className="container mx-auto mt-12 pt-4 border-t border-white/10 text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <p>© {new Date().getFullYear()} Algomancy Deckbuilder</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Rules</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
