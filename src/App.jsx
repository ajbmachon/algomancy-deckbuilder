import React from 'react';
import { DeckBuilder } from './components/game';
import { Toaster } from './components/ui/toast';
import CommandPalette from '@/components/layout/CommandPalette';
import { Header } from '@/components/layout/Header';
import { AppProvider } from './lib/stores/react/AppProvider';
import './styles/globals.css';

function App() {
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = newTheme => setTheme(newTheme);

  return (
    <AppProvider>
      <div className="h-screen flex flex-col overflow-hidden relative z-10">
        <Header onSearchOpen={() => setCmdOpen(true)} theme={theme} onThemeToggle={toggleTheme} />

        <main className="flex-1 overflow-hidden" role="main" aria-label="Algomancy Deckbuilder">
          <DeckBuilder />
        </main>

        {/* Command Palette */}
        <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />

        {/* Live region for screen reader announcements */}
        <div id="sr-live-region" aria-live="polite" aria-atomic="true" className="sr-only"></div>

        {/* Toast notifications */}
        <Toaster />
      </div>
    </AppProvider>
  );
}

export default App;
