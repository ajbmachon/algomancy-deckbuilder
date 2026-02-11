import React from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { getFactionIcon } from '@/lib/utils/deckUtils.jsx';
import { X } from 'lucide-react';

/**
 * Filter panel — desktop sidebar or mobile sheet content
 */
export function FilterPanel({
  factions,
  costs,
  types,
  activeFilters,
  toggleFactionFilter,
  setCostFilter,
  toggleTypeFilter,
  clearFilters,
  isDesktop = false,
  isOpen = false,
}) {
  if (isDesktop) {
    return (
      <div className="p-3 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-overline text-muted-foreground">Filters</span>
          {(activeFilters.factions.length > 0 ||
            activeFilters.cost !== null ||
            activeFilters.types.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-5 text-[10px] text-muted-foreground hover:text-foreground px-1"
              aria-label="Clear all filters"
            >
              <X className="w-3 h-3 mr-0.5" />
              Clear
            </Button>
          )}
        </div>

        {/* Factions */}
        <div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">
            Factions
          </span>
          <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Faction filters">
            {factions.map(faction => (
              <Button
                key={faction}
                variant="outline"
                size="sm"
                onClick={() => toggleFactionFilter(faction)}
                className={`h-8 text-xs capitalize justify-start gap-1 ${
                  activeFilters.factions.includes(faction)
                    ? `filter-btn-${faction} active`
                    : `filter-btn-${faction}`
                }`}
                aria-pressed={activeFilters.factions.includes(faction)}
              >
                {getFactionIcon(faction)}
                {faction}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Cost */}
        <div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">
            Cost
          </span>
          <div className="flex flex-wrap gap-1" role="radiogroup" aria-label="Cost filters">
            {costs.map(cost => (
              <Button
                key={cost}
                variant={activeFilters.cost === cost ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCostFilter(cost)}
                className={`h-7 w-7 p-0 text-xs ${
                  activeFilters.cost === cost
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                role="radio"
                aria-checked={activeFilters.cost === cost}
              >
                {cost}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Type */}
        <div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 block">
            Type
          </span>
          <div className="flex flex-wrap gap-1" role="group" aria-label="Type filters">
            {types.map(type => (
              <Button
                key={type}
                variant={activeFilters.types.includes(type) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleTypeFilter(type)}
                className={`h-7 text-xs capitalize px-2 ${
                  activeFilters.types.includes(type)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-pressed={activeFilters.types.includes(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile layout — always shown when rendered (controlled by parent sheet)
  if (!isOpen) return null;

  return (
    <div className="px-3">
      <Tabs defaultValue="factions">
        <TabsList className="fancy-tabs mb-3 w-full" role="tablist" aria-label="Filter categories">
          <TabsTrigger
            value="factions"
            className="fancy-tab data-[state=active]:fancy-tab-active flex-1"
          >
            Factions
          </TabsTrigger>
          <TabsTrigger
            value="cost"
            className="fancy-tab data-[state=active]:fancy-tab-active flex-1"
          >
            Cost
          </TabsTrigger>
          <TabsTrigger
            value="type"
            className="fancy-tab data-[state=active]:fancy-tab-active flex-1"
          >
            Type
          </TabsTrigger>
        </TabsList>

        <TabsContent value="factions">
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Faction filter buttons">
            {factions.map(faction => (
              <Button
                key={faction}
                variant="outline"
                onClick={() => toggleFactionFilter(faction)}
                className={`capitalize min-h-[44px] text-sm gap-1 ${
                  activeFilters.factions.includes(faction)
                    ? `filter-btn-${faction} active`
                    : `filter-btn-${faction}`
                }`}
                aria-pressed={activeFilters.factions.includes(faction)}
              >
                {getFactionIcon(faction)}
                {faction}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cost">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Cost filter options">
            {costs.map(cost => (
              <Button
                key={cost}
                variant={activeFilters.cost === cost ? 'default' : 'outline'}
                onClick={() => setCostFilter(cost)}
                className={`min-h-[44px] min-w-[44px] ${
                  activeFilters.cost === cost
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                role="radio"
                aria-checked={activeFilters.cost === cost}
              >
                {cost}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="type">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Card type filter buttons">
            {types.map(type => (
              <Button
                key={type}
                variant={activeFilters.types.includes(type) ? 'default' : 'outline'}
                onClick={() => toggleTypeFilter(type)}
                className={`capitalize min-h-[44px] ${
                  activeFilters.types.includes(type)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-pressed={activeFilters.types.includes(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
          aria-label="Clear all active filters"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
