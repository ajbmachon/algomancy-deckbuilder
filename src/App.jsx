import React from 'react';
import { DeckBuilder } from './components/game';
import { Toaster } from './components/ui/toast';
import CommandPalette from '@/components/layout/CommandPalette';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { AppProvider } from './lib/stores/react/AppProvider';
import { toast } from 'sonner';
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
      <div className="min-h-screen flex flex-col">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
          <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full filter blur-[80px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full filter blur-[80px]" />
          <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-faction-fire/5 rounded-full filter blur-[120px]" />
        </div>

        <Header onSearchOpen={() => setCmdOpen(true)} theme={theme} onThemeToggle={toggleTheme} />

        <main className="container mx-auto relative z-10 flex-grow p-4 md:p-8">
          <DeckBuilder />
        </main>

        <footer className="container mx-auto mt-12 pt-4 border-t border-white/10 text-caption text-muted-foreground">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
            <p className="text-caption">© {new Date().getFullYear()} Algomancy Deckbuilder</p>
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info('About', { description: 'This section is coming soon.' })}
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info('Rules', { description: 'This section is coming soon.' })}
                className="text-muted-foreground hover:text-foreground"
              >
                Rules
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  toast.info('Contact', { description: 'This section is coming soon.' })
                }
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Button>
            </div>
          </div>
        </footer>

        {/* Command Palette */}
        <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />

        {/* Toast notifications */}
        <Toaster />
      </div>
    </AppProvider>
  );
}

export default App;
