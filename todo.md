# Algomancy Deckbuilder UI Modernization - ToDo

This file tracks the implementation progress of the UI modernization plan.

## Current Status: In Progress

## Phase 1: Setup and Infrastructure
- [ ] Set up shadcn-ui via MCP server
  - [x] Connect to shadcn-ui MCP server
  - [ ] Install base components via MCP
  - [ ] Configure project for shadcn-ui components
  - [ ] Set up testing environment for UI components
- [ ] Create base theme components
  - [ ] Implement basic theme colors in Tailwind
  - [ ] Create BaseTheme component
  - [ ] Test theme application
  - [ ] Implement basic typography styles

## Phase 2: Card Stacking Implementation
- [ ] Create card grouping logic
  - [ ] Write tests for card grouping by name
  - [ ] Implement stackCards function
  - [ ] Test grouping algorithm with various card lists
  - [ ] Ensure backward compatibility with current UI
- [ ] Implement card count badge
  - [ ] Install Badge component
  - [ ] Test badge visibility based on card count
  - [ ] Style badge for different faction types
  - [ ] Ensure badge position and visibility
- [ ] Modify card display to use stacked cards
  - [ ] Update card rendering to show stacked cards
  - [ ] Test interaction with stacked cards
  - [ ] Ensure proper event handling
  - [ ] Verify behavior with disabled cards

## Phase 3: Theme and Styling Modernization
- [ ] Implement faction-based styling
  - [ ] Create faction color variables
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
  - [ ] Install Tabs component
  - [ ] Test tab switching functionality
  - [ ] Organize filters into logical tab groups
  - [ ] Ensure tab content updates correctly
- [ ] Enhance filter components
  - [ ] Install Checkbox component
  - [ ] Implement sliders for numeric filters
  - [ ] Test filter interaction and state
  - [ ] Ensure filter state persistence
- [ ] Add active filter indicators
  - [ ] Create Badge component for active filters
  - [ ] Test adding/removing active filters
  - [ ] Implement visual feedback for filter state
  - [ ] Ensure filter removal updates results

## Phase 5: Deck Statistics and Visualization
- [ ] Create basic statistics component
  - [ ] Install Card component for stats display
  - [ ] Test statistics calculations
  - [ ] Ensure statistics update when deck changes
  - [ ] Verify display of multiple metrics
- [ ] Add faction distribution visualization
  - [ ] Install Progress component
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
  - [ ] Install Drawer component
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
