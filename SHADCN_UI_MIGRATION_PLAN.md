# Shadcn-UI Migration Plan via MCP

This document outlines the strategy for migrating from custom Svelte components to shadcn-ui components via the Model Context Protocol (MCP) server.

## Migration Overview

1. **Remove shadcn-svelte Integration**
   - Remove shadcn-svelte from package.json
   - Update tailwind.config.js to remove shadcn-svelte references
   - Remove components.json configuration file

2. **Setup MCP Integration**
   - Ensure MCP server for shadcn-ui is properly connected
   - Use MCP server to install and generate shadcn-ui components
   - Configure React components to work within the SvelteKit application

3. **Component Replacement Strategy**
   - Implement shadow DOM or iframe-based strategy for embedding React components
   - Create wrapper Svelte components that interface with the shadcn-ui React components
   - Use TDD approach to ensure new components match the functionality of old ones

4. **Implementation Phases**
   - Phase 1: Infrastructure setup and core UI components
   - Phase 2: Card stacking implementation
   - Phase 3: Theme and styling modernization
   - Phase 4: Enhanced filtering
   - Phase 5: Deck statistics and visualization
   - Phase 6: Responsive layout improvements
   - Phase 7: Testing and refinement

## Core Components Required

See [SHADCN_UI_COMPONENTS.md](./SHADCN_UI_COMPONENTS.md) for the list of required components.

## Package Updates

See [PACKAGE_UPDATES.md](./PACKAGE_UPDATES.md) for necessary package modifications.

## Implementation Approach

### Card Component

The Card component is the cornerstone of our application. The shadcn-ui Card component will be implemented with the following features:

- Display card image with faction-based styling
- Show card count badge for duplicates
- Implement hover effects with animation
- Include tooltip with card details

### File Structure

```
src/
  components/
    ui/           # shadcn-ui components (generated via MCP)
    wrappers/     # Svelte wrapper components for React components
  lib/
    assets/       # Generated card database
    stores/       # Svelte stores for state management
    utils/        # Utility functions
  routes/         # SvelteKit routes
```

## Testing Strategy

1. **Unit Tests**:
   - Test each shadcn-ui component integration
   - Test wrapper functionality

2. **Integration Tests**:
   - Test component interactions
   - Verify store integration

3. **Visual Tests**:
   - Compare before/after for UI consistency
   - Test responsive behavior

## Timeline

See the updated [todo.md](./todo.md) for the implementation timeline and progress tracking.
