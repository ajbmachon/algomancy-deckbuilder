import React from 'react';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="p-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Collapsible Component Demo</h3>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Filter Panel - Click to expand</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Faction: Fire, Water</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Cost: 0-5</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Type: Creature, Spell</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
