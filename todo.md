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

## Phase 3: Theme and Styling Modernization (Current Focus)
- [x] Implement faction-based styling
  - [x] Define faction color variables in tailwind.config.js
  - [x] Test application of faction colors
  - [x] Implement hover effects for different factions
  - [x] Verify accessibility of color choices
- [x] Enhance card hover effects
  - [x] Create smooth transitions for card hover
  - [x] Test hover effects across browsers
  - [x] Implement card elevation on hover
  - [x] Ensure performance with many cards
- [ ] Enhance UI with beautiful aesthetics
  - [x] Update card design with enhanced shadows and glows
  - [ ] Add subtle animations and transitions
  - [ ] Improve filter button styling
  - [ ] Update card tooltips with more visual appeal
  - [ ] Add card rarity visualization
  - [ ] Improve empty deck state with better visuals
  - [ ] Implement scroll animations for card sections
- [ ] Update overall layout appearance
  - [ ] Enhance background with subtle pattern or gradient
  - [ ] Implement header with more visual appeal
  - [ ] Improve filter UI with modern design
  - [ ] Add faction icons to faction filters
  - [ ] Update typography for better readability
  - [ ] Add subtle motion effects on user interaction

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

## Today's UI Enhancement Tasks
- [x] Update globals.css with enhanced styles and animations
- [ ] Improve App.jsx header with better typography and layout
- [ ] Enhance GameCard component with improved hover effects and styling
- [ ] Update DeckBuilder with better visual hierarchy and spacing
- [ ] Add faction-specific icons to faction filters
- [ ] Improve card tooltips with more beautiful design
- [ ] Add background patterns or subtle animations
- [ ] Improve empty state visuals for deck section

## UI Testing Feedback Tasks
- [ ] Enhance mobile responsiveness for filter UI
  - [ ] Improve tab/filter button spacing on small screens
  - [ ] Create collapsible filter sections for limited space
  - [ ] Ensure touch targets are appropriately sized (minimum 44px × 44px)
  - [ ] Convert filter grid to scrollable horizontal list on mobile
- [ ] Fix card aspect ratio inconsistencies
  - [ ] Implement uniform card dimensions (maintain 63mm × 88mm ratio)
  - [ ] Ensure images maintain proper proportions
  - [ ] Add skeleton placeholder for loading card images
  - [ ] Fix image stretching visible on some faction cards
- [ ] Improve visual hierarchy in deck section
  - [ ] Add section headers for card grouping by type or cost
  - [ ] Implement drag-and-drop reordering with visual feedback
  - [ ] Add visual indicators for deck statistics (color-coded faction distribution)
  - [ ] Implement collapsible card groups by faction or type
- [ ] Enhance visual feedback for user actions
  - [ ] Add card transition animations when adding/removing from deck
  - [ ] Implement toast notifications for actions (card added, exported, max copies)
  - [ ] Highlight newly added cards in deck (pulsing glow effect)
  - [ ] Add subtle sound effects for card interactions (optional toggle)
- [ ] Improve tooltip/hover card functionality
  - [ ] Make tooltips more responsive on touch devices (tap to show/hide)
  - [ ] Add scroll capabilities for long card descriptions
  - [ ] Ensure tooltips remain within viewport boundaries
  - [ ] Enhance tooltip content with card attributes and keywords
- [ ] Address color contrast issues
  - [ ] Improve readability of faction text on colored backgrounds (minimum 4.5:1 contrast ratio)
  - [ ] Enhance borders for better card distinction (especially for similar art cards)
  - [ ] Add focus states for keyboard navigation
  - [ ] Fix low contrast in footer text and faction badge text
- [ ] Fix footer layout on mobile
  - [ ] Improve spacing between footer elements
  - [ ] Make footer sticky on short content pages
  - [ ] Ensure links have proper hover states
  - [ ] Add proper tab navigation support

## UI Detailed Implementation Notes

### Mobile Responsiveness
The current filter UI becomes cramped on mobile screens, with faction buttons wrapping in a way that's difficult to use. Consider implementing a horizontally scrollable container for filters on mobile with larger touch targets. The current responsive breakpoints need adjustment as the layout breaks at certain widths between mobile and desktop.

### Card Display Issues
Card images appear to have inconsistent aspect ratios in the grid, causing uneven visual appearance. Implement a consistent card container with fixed aspect ratio and handle images with object-fit properties. The card hover effect currently causes layout shifts - should use transforms instead of dimension changes to maintain layout stability.

### GameCard Component Improvements
The current GameCard component has several areas for enhancement:
1. **Performance optimization**: The faction-specific glow effects use complex CSS that can cause performance issues when many cards are displayed. Consider using simpler effects or conditionally applying them only on hover.
2. **Badge positioning**: The cost and count badges can sometimes overlap with important card art. Make badge positions consistent and consider semi-transparent backgrounds to ensure readability without obscuring art.
3. **Card name display**: The card name appearing on hover at the bottom is sometimes hard to read over complex card art. Add a more consistent background gradient or blur effect behind text.
4. **Loading states**: Add skeleton loading states for cards to improve perceived performance.
5. **Accessibility**: Add proper ARIA attributes and ensure keyboard navigation works for selecting cards.

```jsx
// Example improvements for GameCard component
<Card
  className={cardClasses}
  onClick={!disabled ? onClick : undefined}
  tabIndex={disabled ? -1 : 0}
  onKeyDown={(e) => e.key === 'Enter' && !disabled && onClick()}
  aria-disabled={disabled}
  role="button"
  aria-label={`${name}, ${faction} faction card, Cost: ${cost}`}
  {...props}
>
  {/* Add loading skeleton state */}
  {!imageLoaded && <div className="card-skeleton-loader animate-pulse" />}

  {/* Rest of card content */}
</Card>
```

### Visual Hierarchy Improvements
The deck section lacks visual organization that would help users understand their deck composition at a glance. Adding faction-based grouping or cost curve visualization would improve usability. The current empty state is too subtle - needs more visual guidance for new users.

### User Feedback Enhancements
When cards are added or removed from the deck, there's insufficient visual feedback. This creates uncertainty about whether actions were successful. Implement a subtle animation path showing cards moving between sections and add confirmation indicators.

### Tooltip Issues
Card tooltips sometimes appear off-screen on smaller displays. They should be positioned dynamically based on available viewport space. Touch interaction with tooltips is problematic - implement a tap-to-show/tap-elsewhere-to-dismiss pattern for mobile users.

### Accessibility Concerns
Current faction colors lack sufficient contrast for text readability, especially the Wood (green) and Water (blue) factions. Update the color palette to maintain the faction identity while improving text contrast. Focus indicators are missing for keyboard navigation, which is essential for accessibility.

### Color Palette Recommendations
| Faction | Current Color | Recommended Color | Notes |
|---------|---------------|------------------|-------|
| Earth   | #D97706       | #E67E22          | Increase brightness slightly for better contrast |
| Wood    | #10B981       | #27AE60          | Adjust to improve contrast with white text |
| Fire    | #EF4444       | #E74C3C          | Good contrast, minimal adjustment needed |
| Water   | #0EA5E9       | #3498DB          | Increase brightness for better text contrast |
| Metal   | #94A3B8       | #7F8C8D          | Add slightly more contrast with background |

### Footer Improvements
On mobile, the footer links are too close together, making them difficult to tap accurately. The copyright text and links should stack on very small screens rather than trying to maintain the horizontal layout.

## High-Priority Improvements Summary

Based on the UI testing, the following issues should be addressed first for maximum impact:

1. **Fix Mobile Layout Issues**:
   - Implement horizontal scrolling for faction filters on mobile
   - Fix tab container overflow issues
   - Adjust grid column configuration for smaller screens

2. **Card Component Fixes**:
   - Fix inconsistent card aspect ratios
   - Add loading state for card images
   - Fix tooltip positioning to prevent off-screen content
   - Optimize hover effects for better performance

3. **Accessibility Improvements**:
   - Fix contrast issues in faction-colored text
   - Add proper keyboard navigation support
   - Implement ARIA attributes for interactive elements
   - Ensure touch targets meet minimum size requirements (44px)

4. **Empty State Enhancement**:
   - Create more visually engaging empty deck state
   - Add guidance text and example actions
   - Improve visual feedback when adding first card

5. **User Feedback Improvements**:
   - Add visual confirmation when cards are added/removed
   - Implement toast notifications for key actions
   - Fix issues with disabled state feedback
   - Add transition animations between states

These improvements should address the most noticeable UI issues while enhancing overall usability and aesthetics.
