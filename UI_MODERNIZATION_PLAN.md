# Algomancy Deckbuilder UI Modernization Plan

This document outlines a comprehensive plan to modernize the Algomancy Deckbuilder UI, making it more aesthetically pleasing and aligned with modern card game interfaces.

## Current State Analysis

Based on the screenshot and code review, the current UI has:

- A basic grid layout for cards
- Simple filter system
- No card stacking for duplicates
- Basic theming with Skeleton UI
- Limited responsiveness for mobile devices
- Minimal deck statistics and visualization

## Modernization Goals

1. Implement card stacking for duplicates
2. Modernize the color scheme and layout
3. Improve card organization and filtering
4. Enhance deck visualization with statistics
5. Create a more responsive design for all device sizes
6. Integrate shadcn-ui components for a more polished look

## Implementation Plan

### 1. Use shadcn-ui Components via MCP Server

Instead of using the unofficial shadcn-svelte port, we'll use the official shadcn-ui components through the MCP server. This provides access to professionally designed components with better support and documentation.

#### Setup Steps:

1. Connect to the local MCP server:
   ```bash
   claude mcp add --transport sse shadcn-ui http://localhost:3000/sse
   ```

2. Use the MCP server to install and generate components:
   ```bash
   # Let the MCP server handle installation
   claude
   > @shadcn-ui install button card checkbox tabs sheet drawer tooltip progress separator collapsible badge
   ```

3. Replace key components with shadcn-ui alternatives:
   - Card → for card display
   - Tabs → for sections switching
   - Sheet → for mobile filters
   - Collapsible → for filter sections
   - Select → for dropdowns
   - Badge → for counters
   - Separator → for dividers
   - Tooltips → for card previews
   - Drawer → for mobile deck view

### 2. Card Stacking Implementation

Modify the card display logic to stack duplicate cards:

```typescript
// Card stacking logic
function stackCards(cards) {
  return cards.reduce((groups, card) => {
    const key = card.name;
    if (!groups[key]) {
      groups[key] = {
        card,
        count: 0,
        entries: []
      };
    }
    groups[key].count++;
    groups[key].entries.push(card);
    return groups;
  }, {});
}
```

Update the UI to display card counts:

```jsx
{/* Card with count badge */}
<div className="relative">
  <Card>
    <CardImage src={`/card_images/${card.image_name}`} alt={card.name} />
    {count > 1 && (
      <Badge className="absolute top-2 right-2 bg-black/70">
        {count}×
      </Badge>
    )}
  </Card>
</div>
```

### 3. Modern Color Scheme & Theme

Implement a modern dark UI theme inspired by popular card games:

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0F172A', // Deep blue-black
          secondary: '#1E293B'  // Slightly lighter
        },
        accent: {
          DEFAULT: '#8B5CF6', // Purple
          secondary: '#5EEAD4'  // Teal for contrast
        },
        card: {
          earth: '#D97706', // Amber
          wood: '#10B981',  // Emerald
          fire: '#EF4444',  // Red
          water: '#0EA5E9', // Sky blue
          metal: '#94A3B8'  // Slate
        }
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 15px 25px -5px rgba(0, 0, 0, 0.5), 0 0 10px 0 rgba(139, 92, 246, 0.3)'
      }
    }
  },
  plugins: []
};
```

### 4. Enhanced Card Organization and Filtering

Build a modern filtering system using shadcn-ui components:

```jsx
// Enhanced filter system
<Tabs defaultValue="factions">
  <TabsList>
    <TabsTrigger value="factions">Factions</TabsTrigger>
    <TabsTrigger value="cost">Cost</TabsTrigger>
    <TabsTrigger value="type">Type</TabsTrigger>
    <TabsTrigger value="advanced">Advanced</TabsTrigger>
  </TabsList>

  <TabsContent value="factions">
    <div className="grid grid-cols-3 gap-2">
      {factions.map(faction => (
        <div key={faction} className="flex items-center space-x-2">
          <Checkbox
            id={faction}
            checked={filters.factions[faction]}
            onCheckedChange={(checked) => updateFilter('factions', faction, checked)}
          />
          <label htmlFor={faction}>{faction}</label>
        </div>
      ))}
    </div>
  </TabsContent>

  {/* Additional tabs content */}
</Tabs>

{/* Active filters */}
<div className="flex flex-wrap gap-2 mt-4">
  {activeFilters.map(filter => (
    <Badge key={filter} variant="outline" className="flex items-center">
      {filter}
      <button
        className="ml-1 text-xs"
        onClick={() => removeFilter(filter)}
      >
        ×
      </button>
    </Badge>
  ))}
</div>
```

### 5. Deck Visualization and Statistics

Add an analytical dashboard for deck statistics:

```jsx
// Deck statistics component
<Card className="deck-stats">
  <CardHeader>
    <CardTitle>Deck Statistics</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Total Cards</span>
        <span>{totalCards}</span>
      </div>
      <div className="flex justify-between">
        <span>Average Cost</span>
        <span>{averageCost.toFixed(1)}</span>
      </div>

      <Separator />

      <h4 className="text-sm font-medium">Faction Distribution</h4>
      {Object.entries(factionCounts).map(([faction, count]) => (
        <div key={faction} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{faction}</span>
            <span>{count} ({Math.round(count/totalCards*100)}%)</span>
          </div>
          <Progress
            value={count/totalCards*100}
            className={`faction-${faction.toLowerCase()}`}
            style={{ '--progress-color': factionColors[faction.toLowerCase()] }}
          />
        </div>
      ))}

      <Separator />

      <h4 className="text-sm font-medium">Mana Curve</h4>
      <div className="flex items-end h-24 gap-1">
        {Array(8).fill(0).map((_, i) => {
          const height = costDistribution[i]
            ? (costDistribution[i] / maxCostCount * 100)
            : 0;

          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-accent rounded-t"
                style={{ height: `${height}%` }}
              />
              <div className="mt-1 text-xs">{i}</div>
            </div>
          );
        })}
      </div>
    </div>
  </CardContent>
</Card>
```

### 6. Responsive Layout Improvements

Enhance the layout for better mobile experience:

```jsx
// Responsive layout with mobile drawer
<div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-5">
  {/* Card Pool Section */}
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Card Pool <span className="text-sm opacity-70">[{pool.length}]</span></h2>

      {/* Mobile Only: Deck Drawer */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">
              Deck [{picked.length}]
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4 max-h-[80vh] overflow-auto">
              <h2 className="text-lg font-bold mb-2">Deck [{picked.length}]</h2>
              <CardGrid
                cards={picked}
                onCardClick={dropCard}
                compact={true}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>

    <CardGrid
      cards={pool}
      onCardClick={pickCard}
      disabledCards={disabledCardIds}
    />
  </div>

  {/* Desktop Only: Deck Section */}
  <div className="hidden md:block space-y-4 bg-background-secondary p-4 rounded-md">
    <h2 className="text-xl font-bold">Deck <span className="text-sm opacity-70">[{picked.length}]</span></h2>
    <CardGrid
      cards={picked}
      onCardClick={dropCard}
      compact={true}
    />
    <DeckStats decklist={picked} />
  </div>
</div>
```

### 7. Card Component Upgrade

Enhance the card component with tooltips and hover effects:

```jsx
// Enhanced card component
<div className="relative">
  <Tooltip>
    <TooltipTrigger asChild>
      <div
        className={`card relative rounded-card overflow-hidden transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-card-hover ${factionClass}`}
        onClick={onClick}
      >
        <img
          src={`/card_images/${image}`}
          alt={name}
          className="w-full h-auto object-contain"
        />

        {count > 1 && (
          <Badge className="absolute top-2 right-2 bg-black/70 text-white">
            {count}×
          </Badge>
        )}
      </div>
    </TooltipTrigger>
    <TooltipContent side="right" className="max-w-xs">
      <div className="space-y-1">
        <h3 className="font-bold">{name}</h3>
        <p>Faction: {faction}</p>
        <p>Cost: {cost}</p>
        {text && <p className="text-xs opacity-90">{text}</p>}
      </div>
    </TooltipContent>
  </Tooltip>
</div>
```

## Implementation Timeline

1. **Setup Phase** (1-2 days)
   - Configure the MCP server connection
   - Install required shadcn-ui components
   - Setup theme and utility functions

2. **Core UI Components** (2-3 days)
   - Implement card stacking for duplicates
   - Adapt Card component with modern styling
   - Modernize layout and navigation

3. **Enhanced Features** (2-3 days)
   - Add deck statistics visualization
   - Improve filtering system
   - Implement responsive layout improvements

4. **Testing and Refinement** (1-2 days)
   - Test on various devices
   - Refine animations and interactions
   - Fix any visual inconsistencies

## Benefits of the New UI

1. **Better User Experience**
   - Cleaner interface with stacked cards
   - More intuitive filtering
   - Enhanced visual feedback

2. **More Engaging Visuals**
   - Modern, sleek design
   - Faction-based color theming
   - Professional animations and transitions

3. **Improved Functionality**
   - Better deck analysis tools
   - More responsive on all devices
   - Streamlined workflow for deck building

4. **Technical Advantages**
   - Professional, battle-tested component library
   - Better performance with optimized rendering
   - Simplified maintenance with consistent component API

## References

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Moxfield](https://moxfield.com/) - One of the best MTG deck builders
- [Legends of Runeterra](https://playruneterra.com/)
- [shadcn/ui Card Component](https://ui.shadcn.com/docs/components/card)
