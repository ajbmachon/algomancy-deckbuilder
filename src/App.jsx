import React from 'react';
import { DeckBuilder } from './components/game';
import { Toaster } from './components/ui/toast';
import CommandPalette from '@/components/layout/CommandPalette';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AppProvider } from './lib/stores/react/AppProvider';
import { toast } from 'sonner';
import './styles/globals.css';

function App() {
  const [cmdOpen, setCmdOpen] = React.useState(false);

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col p-4 md:p-8">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
          <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full filter blur-[80px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full filter blur-[80px]" />
          <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-faction-fire/5 rounded-full filter blur-[120px]" />
        </div>

        <header className="container mx-auto mb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-5xl font-extrabold gradient-heading tracking-tight">
                Algomancy Deckbuilder
              </h1>
              <p className="text-muted-foreground mt-2">
                Build your deck with up to 2 copies of each card
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/5"
                onClick={() => setCmdOpen(true)}
              >
                Search (⌘K)
              </Button>

              <Separator orientation="vertical" className="h-8 bg-white/10" />
              <div className="flex flex-wrap gap-2">
                <span className="faction-badge faction-badge-earth group">
                  <span className="inline-block">Earth</span>
                </span>
                <span className="faction-badge faction-badge-wood group">
                  <span className="inline-block">Wood</span>
                </span>
                <span className="faction-badge faction-badge-fire group">
                  <span className="inline-block">Fire</span>
                </span>
                <span className="faction-badge faction-badge-water group">
                  <span className="inline-block">Water</span>
                </span>
                <span className="faction-badge faction-badge-metal group">
                  <span className="inline-block">Metal</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto relative z-10 flex-grow">
          <DeckBuilder />
        </main>

        <footer className="container mx-auto mt-12 pt-4 border-t border-white/10 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
            <p>© {new Date().getFullYear()} Algomancy Deckbuilder</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => toast.info('About', { description: 'This section is coming soon.' })}
                className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => toast.info('Rules', { description: 'This section is coming soon.' })}
                className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
              >
                Rules
              </button>
              <button
                type="button"
                onClick={() =>
                  toast.info('Contact', { description: 'This section is coming soon.' })
                }
                className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
              >
                Contact
              </button>
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
