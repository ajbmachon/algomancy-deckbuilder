# Algomancy Deckbuilder UI Modernization - ToDo

This file tracks the implementation progress of the UI modernization plan.

## Current Status: In Progress

## Phase 1: Setup and Infrastructure
- [ ] Set up shadcn-ui via MCP server
  - [x] Connect to shadcn-ui MCP server
  - [x] Create migration plan documentation
  - [x] Create direct usage documentation for MCP components
  - [x] Remove shadcn-svelte references
  - [x] Create utility functions for card stacking
  - [ ] Implement direct MCP component usage
  - [x] Create directory structure for new components
  - [ ] Set up testing environment for UI components
- [ ] Create base theme components
  - [x] Define faction-based colors in tailwind.config.js
  - [x] Create BaseTheme component
  - [ ] Test theme application
  - [ ] Implement basic typography styles

## Phase 2: Card Stacking Implementation
- [x] Create card grouping logic
  - [x] Write tests for card grouping by name
  - [x] Implement stackCards function
  - [x] Test grouping algorithm with various card lists
  - [ ] Ensure backward compatibility with current UI
- [ ] Implement card count badge
  - [ ] Use Badge component from MCP
  - [ ] Test badge visibility based on card count
  - [ ] Style badge for different faction types
  - [ ] Ensure badge position and visibility
- [ ] Modify card display to use stacked cards
  - [ ] Use Card component from MCP
  - [ ] Test interaction with stacked cards
  - [ ] Ensure proper event handling
  - [ ] Verify behavior with disabled cards

## Phase 3: Theme and Styling Modernization
- [ ] Implement faction-based styling
  - [x] Define faction color variables in tailwind.config.js
  - [ ] Test application of faction colors
  - [ ] Implement hover effects for different factions
  - [ ] Verify accessibility of color choices
- [ ] Enhance card hover effects
  - [ ] Create smooth transitions for card hover
  - [ ] Test hover effects across browsers
  - [ ] Implement card elevation on hover
  - [ ] Ensure performance with many cards
- [ ] Update overall layout appearance
  - [ ] Implement dark mode theme
  - [ ] Test theme consistency across components
  - [ ] Update card grid layout
  - [ ] Improve spacing and visual hierarchy

## Phase 4: Enhanced Filtering
- [ ] Implement Tabs component for filters
  - [ ] Use Tabs component from MCP
  - [ ] Test tab switching functionality
  - [ ] Organize filters into logical tab groups
  - [ ] Ensure tab content updates correctly
- [ ] Enhance filter components
  - [ ] Use Checkbox component from MCP
  - [ ] Implement sliders for numeric filters
  - [ ] Test filter interaction and state
  - [ ] Ensure filter state persistence
- [ ] Add active filter indicators
  - [ ] Use Badge component for active filters
  - [ ] Test adding/removing active filters
  - [ ] Implement visual feedback for filter state
  - [ ] Ensure filter removal updates results

## Phase 5: Deck Statistics and Visualization
- [ ] Create basic statistics component
  - [ ] Use Card component from MCP for stats display
  - [ ] Test statistics calculations
  - [ ] Ensure statistics update when deck changes
  - [ ] Verify display of multiple metrics
- [ ] Add faction distribution visualization
  - [ ] Use Progress component from MCP
  - [ ] Test percentage calculations
  - [ ] Style progress bars with faction colors
  - [ ] Ensure responsive display of progress bars
- [ ] Implement mana curve visualization
  - [ ] Create mana curve bar chart
  - [ ] Test distribution calculations
  - [ ] Ensure proper scaling of chart
  - [ ] Verify hover interactions with chart

## Phase 6: Responsive Layout Improvements
- [ ] Create mobile detection and basic responsiveness
  - [ ] Implement responsive breakpoints
  - [ ] Test layout on different screen sizes
  - [ ] Create mobile-specific styles
  - [ ] Ensure card grid adapts to screen width
- [ ] Implement mobile drawer for deck view
  - [ ] Use Drawer component from MCP
  - [ ] Test drawer open/close functionality
  - [ ] Ensure deck interactions work in drawer
  - [ ] Verify smooth animations
- [ ] Optimize touch interactions
  - [ ] Increase touch targets for mobile
  - [ ] Test touch interactions on various devices
  - [ ] Implement swipe gestures where appropriate
  - [ ] Ensure accessibility for touch devices

## Phase 7: Testing and Refinement
- [ ] Create comprehensive UI test suite
  - [ ] Write end-to-end tests for main UI flows
  - [ ] Test all interactive elements
  - [ ] Verify responsive behavior
  - [ ] Ensure cross-browser compatibility
- [ ] Performance optimization
  - [ ] Test and optimize rendering performance
  - [ ] Measure and improve load times
  - [ ] Implement lazy loading where appropriate
  - [ ] Optimize animations for smooth experience
- [ ] Final polish and refinement
  - [ ] Address any UI inconsistencies
  - [ ] Refine animations and transitions
  - [ ] Ensure all components meet accessibility standards
  - [ ] Validate against design goals
