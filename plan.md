# Test-Driven Development Plan for Algomancy Deckbuilder UI Modernization

This document outlines a step-by-step approach to modernizing the Algomancy Deckbuilder UI using Test-Driven Development (TDD). Each step builds incrementally on the previous one, ensuring that functionality is maintained while the UI is enhanced.

## Phases Overview

1. **Setup and Infrastructure**
2. **Card Stacking Implementation**
3. **Theme and Styling Modernization**
4. **Enhanced Filtering**
5. **Deck Statistics and Visualization**
6. **Responsive Layout Improvements**
7. **Testing and Refinement**

## Detailed Implementation Steps

### Phase 1: Setup and Infrastructure

#### Step 1.1: Set up shadcn-svelte and dependencies
- Add shadcn-svelte CLI
- Configure project for shadcn-svelte
- Set up testing environment for UI components
- Create utility files needed for shadcn-svelte

#### Step 1.2: Create base theme components
- Implement basic theme colors in Tailwind
- Create BaseTheme component
- Test theme application
- Implement basic typography styles

#### Step 1.3: Implement first shadcn component (Card)
- Add Card component
- Write tests for Card component
- Integrate Card component with existing styles
- Ensure compatibility with current UI

### Phase 2: Card Stacking Implementation

#### Step 2.1: Create card grouping logic
- Write tests for card grouping by name
- Implement grouping function in CardList component
- Test grouping algorithm with various card lists
- Ensure backward compatibility with current UI

#### Step 2.2: Implement card count badge
- Create count badge component
- Test badge visibility based on card count
- Style badge for different faction types
- Ensure badge position and visibility

#### Step 2.3: Modify CardList to use stacked cards
- Update CardList to render stacked cards
- Test interaction with stacked cards
- Ensure proper event handling
- Verify behavior with disabled cards

### Phase 3: Theme and Styling Modernization

#### Step 3.1: Implement faction-based styling
- Create faction color variables
- Test application of faction colors
- Implement hover effects for different factions
- Verify accessibility of color choices

#### Step 3.2: Enhance card hover effects
- Create smooth transitions for card hover
- Test hover effects across browsers
- Implement card elevation on hover
- Ensure performance with many cards

#### Step 3.3: Update overall layout appearance
- Implement dark mode theme
- Test theme consistency across components
- Update card grid layout
- Improve spacing and visual hierarchy

### Phase 4: Enhanced Filtering

#### Step 4.1: Implement Tabs component for filters
- Create basic Tabs component
- Test tab switching functionality
- Organize filters into logical tab groups
- Ensure tab content updates correctly

#### Step 4.2: Enhance filter components
- Replace checkboxes with shadcn Checkbox
- Implement sliders for numeric filters
- Test filter interaction and state
- Ensure filter state persistence

#### Step 4.3: Add active filter indicators
- Create Badge component for active filters
- Test adding/removing active filters
- Implement visual feedback for filter state
- Ensure filter removal updates results

### Phase 5: Deck Statistics and Visualization

#### Step 5.1: Create basic statistics component
- Implement DeckStats component with basic metrics
- Test statistics calculations
- Ensure statistics update when deck changes
- Verify display of multiple metrics

#### Step 5.2: Add faction distribution visualization
- Implement Progress component for faction distribution
- Test percentage calculations
- Style progress bars with faction colors
- Ensure responsive display of progress bars

#### Step 5.3: Implement mana curve visualization
- Create mana curve bar chart component
- Test distribution calculations
- Ensure proper scaling of chart
- Verify hover interactions with chart

### Phase 6: Responsive Layout Improvements

#### Step 6.1: Create mobile detection and basic responsiveness
- Implement responsive breakpoints
- Test layout on different screen sizes
- Create mobile-specific styles
- Ensure card grid adapts to screen width

#### Step 6.2: Implement mobile drawer for deck view
- Create Drawer component for mobile view
- Test drawer open/close functionality
- Ensure deck interactions work in drawer
- Verify smooth animations

#### Step 6.3: Optimize touch interactions
- Increase touch targets for mobile
- Test touch interactions on various devices
- Implement swipe gestures where appropriate
- Ensure accessibility for touch devices

### Phase 7: Testing and Refinement

#### Step 7.1: Create comprehensive UI test suite
- Write end-to-end tests for main UI flows
- Test all interactive elements
- Verify responsive behavior
- Ensure cross-browser compatibility

#### Step 7.2: Performance optimization
- Test and optimize rendering performance
- Measure and improve load times
- Implement lazy loading where appropriate
- Optimize animations for smooth experience

#### Step 7.3: Final polish and refinement
- Address any UI inconsistencies
- Refine animations and transitions
- Ensure all components meet accessibility standards
- Validate against design goals

## Test-Driven Development Approach

For each component or feature:

1. Write failing tests first that define expected behavior
2. Implement minimal code to make tests pass
3. Refactor code while ensuring tests continue to pass
4. Integrate with existing components and test integration
5. Repeat for next component or feature

## Implementation Prompts

Below are the detailed prompts for implementing each phase using TDD:

### Prompt 1: Setup and Infrastructure

```
I'm modernizing a SvelteKit deckbuilder application for a card game. I want to add shadcn-svelte components for a more polished UI. Please help me implement the following with a test-driven approach:

1. Set up shadcn-svelte in the project:
   - Add shadcn-svelte CLI as a dev dependency
   - Create the necessary configuration files
   - Set up the utils.js file required by shadcn-svelte

2. Create a basic theme configuration in tailwind.config.js:
   - Add a dark theme color palette with background, accent, and card faction colors
   - Add custom border radius and box shadow definitions for cards
   - Ensure the theme correctly integrates with shadcn-svelte

3. Create a BaseTheme component that:
   - Applies the dark theme to the application
   - Sets up global typography styles
   - Is properly tested with Vitest

Please provide the necessary code and tests for each step, ensuring backward compatibility with the existing application. The code should follow best practices for SvelteKit and shadcn-svelte integration.
```

### Prompt 2: Card Stacking Implementation

```
Now I need to implement card stacking for duplicate cards in the deck view of my SvelteKit card game application. Currently, duplicate cards are displayed individually. I want to stack them and show a count badge.

1. Implement the card grouping logic:
   - Modify the CardList component to group cards by name
   - Create a reactive statement that processes the list prop into grouped cards
   - Write Vitest tests to verify grouping works correctly

2. Create a card count badge component:
   - Design a circular badge that shows the count of stacked cards
   - Position it on the top-right corner of the card
   - Style it to be visible on different card backgrounds
   - Write tests to ensure it shows correctly based on card count

3. Update the CardList component to use stacked cards:
   - Render grouped cards instead of individual cards
   - Ensure click events still work properly with stacked cards
   - Handle disabled cards correctly when they're stacked
   - Write integration tests to verify the behavior

Please provide the code and tests for these components, focusing on maintainability and visual appeal. The implementation should work with the existing crossfade animation system and keep the same event handling behavior as before.
```

### Prompt 3: Theme and Styling Modernization

```
I need to implement a modern styling approach for my SvelteKit card game deckbuilder, focusing on faction-based styling and enhanced visual effects. Here's what I need:

1. Implement faction-based card styling:
   - Update the Card component to apply faction-specific colors (earth, wood, fire, water, metal)
   - Create hover effects that show a glow in the faction color
   - Write tests to verify that correct styles are applied based on faction

2. Enhance card hover effects:
   - Create smooth transitions for cards when hovered
   - Implement a slight elevation and scaling effect on hover
   - Ensure the transition feels polished and professional
   - Test the effects across different card states (normal, disabled)

3. Modernize the overall layout appearance:
   - Apply the dark theme consistently across components
   - Update card grid layout with improved spacing
   - Enhance visual hierarchy with subtle background contrasts
   - Write visual regression tests to ensure consistency

The styling should use Tailwind CSS where appropriate and follow the shadcn-svelte design aesthetic. Provide both the component code and CSS, along with tests that verify the styling is applied correctly.
```

### Prompt 4: Enhanced Filtering

```
I need to implement an enhanced filtering system for my card game deckbuilder using shadcn-svelte components. The current filtering is basic, and I want to make it more user-friendly and visually appealing.

1. Create a TabsFilter component:
   - Implement shadcn-svelte Tabs to organize filters by category (Factions, Cost, Type, etc.)
   - Ensure tab switching updates the displayed filters
   - Write tests to verify tab functionality and state

2. Enhance the filter input components:
   - Replace standard checkboxes with shadcn-svelte Checkbox components
   - Add a Search component for card name filtering
   - Implement Slider components for numeric filters like card cost
   - Write tests for filter state management and interactions

3. Add active filter indicators:
   - Create a BadgeList component showing active filters
   - Allow clicking a badge to remove that filter
   - Ensure the filtered results update when badges are removed
   - Write tests for adding and removing filters

The components should integrate with the existing filter store and maintain the same filtering logic while providing an enhanced UI. Focus on accessibility and ease of use while following the overall dark theme aesthetic.
```

### Prompt 5: Deck Statistics and Visualization

```
I need to add deck statistics and visualization components to my card game deckbuilder. These components will provide users with insights about their deck composition.

1. Create a DeckStats component:
   - Implement a Card component showing basic metrics (total cards, average cost)
   - Calculate statistics reactively based on the decklist prop
   - Write tests to verify calculation accuracy
   - Ensure the component updates when the deck changes

2. Add faction distribution visualization:
   - Create progress bars showing the percentage of each faction in the deck
   - Style the bars with faction-specific colors
   - Calculate percentages correctly and display them
   - Test the visualization with various deck compositions

3. Implement a mana curve visualization:
   - Create a bar chart showing the distribution of cards by cost
   - Scale the bars appropriately based on the maximum count
   - Add labels for each cost value
   - Write tests for the chart rendering and calculations

The components should be responsive, visually consistent with the dark theme, and provide meaningful information to the user. Use shadcn-svelte components where appropriate (Card, Progress, Separator) and ensure all visualizations are accessible.
```

### Prompt 6: Responsive Layout Improvements

```
I need to improve the responsive layout of my card game deckbuilder, particularly for mobile devices. The current layout doesn't adapt well to small screens.

1. Implement responsive breakpoints and layouts:
   - Update the main layout to use appropriate grid layouts for different screen sizes
   - Add responsive utility classes for hiding/showing elements
   - Write tests to verify layout changes at different breakpoints
   - Ensure card grids adjust the number of columns based on screen width

2. Create a mobile drawer for the deck view:
   - Implement a shadcn-svelte Drawer component that shows the decklist on mobile
   - Add a button that appears only on mobile to toggle the drawer
   - Ensure card interactions (adding/removing) work correctly in the drawer
   - Test drawer functionality and animations

3. Optimize touch interactions:
   - Increase touch target sizes for mobile users
   - Adjust card spacing for better touch interaction
   - Implement swipe gestures for navigating between sections
   - Write tests to verify touch interactions work correctly

The responsive implementation should follow modern mobile-first practices, use Tailwind's responsive utilities, and maintain the same functionality across all device sizes. Focus on creating a smooth, intuitive experience on both desktop and mobile.
```

### Prompt 7: Testing and Refinement

```
Now I need to create comprehensive tests and refinements for my modernized card game deckbuilder UI. This includes creating end-to-end tests, performance optimizations, and final polish.

1. Create comprehensive UI test suite:
   - Write end-to-end tests for main user flows (filtering cards, building a deck)
   - Test all interactive elements including card selection, filtering, and stats viewing
   - Verify responsive behavior across different screen sizes
   - Create visual regression tests for UI components

2. Optimize performance:
   - Implement and test virtualized lists for better rendering of large card collections
   - Add lazy loading for card images with appropriate loading states
   - Optimize animations to prevent jank and ensure smooth transitions
   - Write performance tests measuring render times and interaction responsiveness

3. Apply final polish and refinements:
   - Address any visual inconsistencies across components
   - Refine animations and transitions for a cohesive feel
   - Ensure all components meet WCAG accessibility standards
   - Add subtle micro-interactions for better user feedback

For each item, provide both the implementation code and the corresponding tests. Focus on creating a polished, professional experience that works well across different devices and browsers while maintaining excellent performance.
```

## Acceptance Criteria

For each phase:

1. All tests must pass
2. The UI must maintain or improve existing functionality
3. Visual design must be consistent with modern card game interfaces
4. Components must be responsive and work on mobile devices
5. Accessibility standards must be maintained

By following this TDD approach, we'll incrementally modernize the UI while ensuring that each step is fully tested and integrated with the existing codebase.
