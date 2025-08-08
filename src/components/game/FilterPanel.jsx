import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { getFactionIcon } from '@/lib/utils/deckUtils.jsx';

/**
 * Filter panel component for desktop and mobile layouts
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
  const factionsContainerRef = useRef(null);
  const costsContainerRef = useRef(null);
  const typesContainerRef = useRef(null);

  if (isDesktop) {
    return (
      <Card className="modern-card h-full max-h-[calc(100vh-8rem)] flex flex-col">
        <CardHeader className="space-card-header border-b border-border">
          <CardTitle className="text-sm">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-card-content flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <div className="space-filter-group flex flex-col">
              <Collapsible defaultOpen>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground">
                    Factions
                  </h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 px-2 border-border">
                      Toggle
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2 grid grid-cols-2 space-grid-tight">
                  {factions.map(faction => (
                    <Button
                      key={faction}
                      variant="outline"
                      onClick={() => toggleFactionFilter(faction)}
                      className={`capitalize ${
                        activeFilters.factions.includes(faction)
                          ? `filter-btn-${faction} active`
                          : `filter-btn-${faction}`
                      }`}
                    >
                      {getFactionIcon(faction)}
                      {faction}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Separator className="bg-border" />

              <Collapsible defaultOpen>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground">Cost</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 px-2 border-border">
                      Toggle
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2 flex flex-wrap space-grid-tight">
                  {costs.map(cost => (
                    <Button
                      key={cost}
                      variant={activeFilters.cost === cost ? 'default' : 'outline'}
                      onClick={() => setCostFilter(cost)}
                      className={
                        activeFilters.cost === cost
                          ? 'bg-primary hover:bg-primary/90'
                          : 'border-border hover:bg-muted/20 hover:text-foreground'
                      }
                    >
                      {cost}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Separator className="bg-border" />

              <Collapsible defaultOpen>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-wide text-muted-foreground">Type</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 px-2 border-border">
                      Toggle
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2 grid grid-cols-2 space-grid-tight">
                  {types.map(type => (
                    <Button
                      key={type}
                      variant={activeFilters.types.includes(type) ? 'default' : 'outline'}
                      onClick={() => toggleTypeFilter(type)}
                      className={`capitalize ${activeFilters.types.includes(type) ? 'bg-primary hover:bg-primary/90' : 'border-border hover:bg-muted/20 hover:text-foreground'}`}
                    >
                      {type}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-border w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  // Mobile layout
  if (!isOpen) return null;

  return (
    <div className="mb-6">
      <Tabs defaultValue="factions" className="mb-6">
        <TabsList className="fancy-tabs mb-4 w-full overflow-x-auto flex-nowrap md:flex-wrap whitespace-nowrap">
          <TabsTrigger value="factions" className="fancy-tab data-[state=active]:fancy-tab-active">
            Factions
          </TabsTrigger>
          <TabsTrigger value="cost" className="fancy-tab data-[state=active]:fancy-tab-active">
            Cost
          </TabsTrigger>
          <TabsTrigger value="type" className="fancy-tab data-[state=active]:fancy-tab-active">
            Type
          </TabsTrigger>
        </TabsList>

        <TabsContent value="factions" className="space-y-4 card-fade-in">
          <div
            className="flex space-grid-tight overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible"
            ref={factionsContainerRef}
          >
            {factions.map(faction => (
              <HoverCard key={faction} openDelay={300} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => toggleFactionFilter(faction)}
                    className={`capitalize flex items-center flex-shrink-0 min-h-[44px] min-w-[100px] md:min-w-0 ${
                      activeFilters.factions.includes(faction)
                        ? `filter-btn-${faction} active`
                        : `filter-btn-${faction}`
                    }`}
                  >
                    {getFactionIcon(faction)}
                    {faction}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold capitalize">{faction} Faction</h4>
                    <p className="text-sm text-muted-foreground">
                      Filter cards from the {faction} faction.
                      {faction === 'earth' &&
                        ' Earth focuses on stability and resource generation.'}
                      {faction === 'wood' && ' Wood excels at growth and sustainability.'}
                      {faction === 'fire' && ' Fire specializes in direct damage and aggression.'}
                      {faction === 'water' &&
                        ' Water manipulates flow and adapts to circumstances.'}
                      {faction === 'metal' && ' Metal provides strength and structural integrity.'}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cost" className="space-y-4 card-fade-in">
          <div
            className="flex space-grid-tight overflow-x-auto pb-2 md:flex-wrap"
            ref={costsContainerRef}
          >
            {costs.map(cost => (
              <Button
                key={cost}
                variant={activeFilters.cost === cost ? 'default' : 'outline'}
                onClick={() => setCostFilter(cost)}
                className={`min-h-[44px] min-w-[44px] flex-shrink-0 ${
                  activeFilters.cost === cost
                    ? 'bg-primary hover:bg-primary/90'
                    : 'border-border hover:bg-muted/20 hover:text-foreground'
                }`}
              >
                {cost}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="type" className="space-y-4 card-fade-in">
          <div
            className="flex space-grid-tight overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible"
            ref={typesContainerRef}
          >
            {types.map(type => (
              <Button
                key={type}
                variant={activeFilters.types.includes(type) ? 'default' : 'outline'}
                onClick={() => toggleTypeFilter(type)}
                className={`capitalize min-h-[44px] min-w-[100px] md:min-w-0 flex-shrink-0 ${
                  activeFilters.types.includes(type)
                    ? 'bg-primary hover:bg-primary/90'
                    : 'border-border hover:bg-muted/20 hover:text-foreground'
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {types.length === 0
              ? 'No common types found'
              : activeFilters.types.length > 0
                ? `Filtering for cards with: ${activeFilters.types.join(', ')}`
                : 'Select multiple types to filter cards'}
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
