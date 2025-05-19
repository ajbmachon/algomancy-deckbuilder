# shadcn-ui Components for Migration

This document lists the shadcn-ui components needed for our application, their purpose, and the order of installation via the MCP server.

## Core Components (Phase 1)

| Component | Purpose | Priority |
|-----------|---------|----------|
| Button | Form controls and interactive elements | High |
| Card | Display game cards with structure and styling | High |
| Badge | Show card count and status indicators | High |
| Hover Card | Display card details on hover | High |
| Tabs | Organize interface into sections | High |
| Checkbox | Filter controls | High |
| Toggle | Toggle filter options on/off | Medium |
| Tooltip | Display additional information | Medium |
| Separator | Visual dividers between sections | Medium |

## Enhanced Components (Phase 2-3)

| Component | Purpose | Priority |
|-----------|---------|----------|
| Sheet | Mobile filter sheet | Medium |
| Drawer | Mobile deck view | Medium |
| Collapsible | Expandable sections for filters | Medium |
| Progress | Show faction distribution | Medium |
| Accordion | Grouped content in filter section | Low |
| Avatar | User information | Low |
| Command | Command palette for quick actions | Low |
| Dialog | Confirmations and information | Low |

## Analytics Components (Phase 4-5)

| Component | Purpose | Priority |
|-----------|---------|----------|
| Data Table | Sortable, filterable card lists | Medium |
| Aspect Ratio | Maintain card proportions | Low |
| Scroll Area | Smooth scrolling for card lists | Medium |
| Skeleton | Loading placeholders | Low |
| Slider | Range-based filters | Medium |

## Installation via MCP

### Method 1: Connect to MCP Server and Install Components

```bash
claude mcp add --transport sse shadcn-ui http://localhost:3000/sse
```

Then within Claude Code:

```
@shadcn-ui install button card badge hover-card tabs checkbox toggle tooltip separator
```

### Method 2: Use shadcn-ui API via MCP

If Method 1 is not available, we can create a wrapper function that interfaces with the MCP server to get component HTML/CSS/JS and inject it into our application.

```js
async function getShadcnComponent(name, props) {
  // Call MCP server to get the rendered component
  const response = await fetch(`/api/shadcn/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  });

  return await response.json();
}
```

## Component Wrapper Implementation

For each shadcn-ui component, we'll create a Svelte wrapper that interfaces with the MCP server:

```svelte
<!-- src/components/wrappers/Button.svelte -->
<script>
  import { onMount } from 'svelte';
  import { useComponent } from '$lib/utils/mcp-integration';

  export let variant = 'default';
  export let size = 'default';
  export let disabled = false;

  let component = null;
  let container;

  onMount(async () => {
    component = await useComponent('Button', { variant, size, disabled });
    if (container) {
      container.innerHTML = component.html;
      eval(component.script);
    }
  });
</script>

<div bind:this={container}>
  <!-- Component will be rendered here -->
  <slot></slot>
</div>
```
