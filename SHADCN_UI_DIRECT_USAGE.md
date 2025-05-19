# Direct Usage of shadcn-ui via MCP

We'll use the shadcn-ui components directly via the MCP server without writing intermediate wrapper components. This document explains how to use the MCP commands to interact with shadcn-ui components.

## MCP Commands for shadcn-ui

The following commands will be used to interact with shadcn-ui components via MCP:

```
@shadcn-ui install <component>     # Install a component
@shadcn-ui use <component> {...}   # Use a component with specified props
```

## Component Installation

The following high-priority components need to be installed:

1. Button
2. Card
3. HoverCard
4. Badge
5. Tabs
6. Checkbox
7. Toggle
8. Tooltip
9. Separator

Example installation command:

```
@shadcn-ui install button card hover-card badge tabs checkbox toggle tooltip separator
```

## Component Usage

Components can be used directly via MCP with appropriate props:

### Card Component

```
@shadcn-ui use Card {
  "className": "faction-earth",
  "children": [
    {
      "type": "img",
      "props": {
        "src": "/card_images/card-a.jpg",
        "alt": "Card A"
      }
    },
    {
      "type": "Badge",
      "props": {
        "className": "absolute top-2 right-2 bg-black/70",
        "children": "2×"
      }
    }
  ]
}
```

### Button Component

```
@shadcn-ui use Button {
  "variant": "default",
  "size": "default",
  "children": "Click me"
}
```

## Implementation Strategy

1. We'll use the MCP server directly during development to generate the component code
2. For production, we'll use the generated code from the MCP server and integrate it into our application
3. This approach eliminates the need for intermediate wrapper components

## Testing Strategy

1. During development, we'll use the MCP server to test components in isolation
2. We'll write tests for our application logic that interfaces with the shadcn-ui components
3. The tests should focus on the business logic rather than the component implementation details

## Integration with SvelteKit

1. For SvelteKit integration, we'll use the +page.svelte and +layout.svelte files
2. We'll use the shadcn-ui components directly in these files
3. The component styling will be applied via the generated CSS from the MCP server

## Component Structure

The component structure will be:

```
src/
  components/          # Generated from MCP
    ui/                # shadcn-ui components
  lib/
    assets/           # Generated card database
    stores/           # Svelte stores for state management
    utils/            # Utility functions
  routes/             # SvelteKit routes
```
