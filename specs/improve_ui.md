# Algomancy Deckbuilder UI Improvement PRD

## Executive Summary

This PRD outlines comprehensive improvements to the Algomancy Deckbuilder UI, focusing on maximizing screen space efficiency, enhancing card selection workflows, and creating a professional, modern interface. All improvements will utilize shadcn-ui components to maintain consistency and ensure high-quality implementation.

## Current State Analysis

### Identified Issues

1. **Inefficient Space Usage**: Large empty areas, especially in the deck view when empty
2. **Poor Card Density**: Cards are too large, limiting visible options
3. **Suboptimal Layout**: Fixed 2-column layout wastes space on wide screens
4. **Limited Visual Feedback**: No hover previews or selection states
5. **Basic Filtering**: Tab-based filtering is cumbersome and takes too much vertical space
6. **No Deck Statistics**: Missing mana curve and faction distribution visualizations
7. **Mobile Responsiveness**: Poor adaptation to smaller screens

## Proposed Improvements

### 1. Layout Optimization

#### 1.1 Adaptive Grid System

- **Implementation**: Dynamic 3-column layout (filters | card pool | deck)
- **Responsive Breakpoints**:
  - Desktop (>1400px): 3 columns with resizable panels
  - Tablet (768-1400px): 2 columns with collapsible sidebar
  - Mobile (<768px): Single column with bottom sheet filters
- **Benefits**: 50% more card visibility on desktop, better organization

#### 1.2 Collapsible Panels

- **Filter Panel**: Collapsible sidebar with persistent state
- **Deck Panel**: Can be minimized to show only statistics
- **Implementation**: shadcn-ui Collapsible component with smooth animations

### 2. Card Display Enhancements

#### 2.1 Compact Card View

- **Default Size**: Reduce card size by 20% while maintaining readability
- **Grid Density**:
  - Desktop: 6-8 cards per row
  - Tablet: 4-5 cards per row
  - Mobile: 2-3 cards per row
- **Hover Expansion**: Cards slightly enlarge on hover for better visibility

#### 2.2 Card Preview System

- **Implementation**: shadcn-ui HoverCard for instant previews
- **Features**:
  - Full-size card preview on hover
  - Card statistics and abilities
  - Faction-colored border glow
  - Keyboard navigation support (arrow keys)

#### 2.3 List View Option

- **Toggle**: Switch between grid and compact list view
- **List Features**:
  - Condensed rows showing: Name | Cost | Type | P/T | Faction icons
  - 3x more cards visible at once
  - Quick scanning for specific cards
  - Sortable columns

### 3. Advanced Filtering System

#### 3.1 Unified Filter Sidebar

- **Components**:
  - Search bar with autocomplete (shadcn-ui Command)
  - Faction multi-select checkboxes
  - Cost range slider (0-10+)
  - Type multi-select
  - Power/Toughness ranges
  - Text search for abilities
  - Attribute toggles

#### 3.2 Filter Presets

- **Quick Filters**:
  - "Aggro" (low cost creatures)
  - "Control" (removal and counters)
  - "Ramp" (mana acceleration)
  - "Combo pieces"
- **Custom Presets**: Save and name filter combinations

#### 3.3 Visual Filter Indicators

- **Active Filter Pills**: Show active filters as removable badges
- **Result Count**: Live update showing "Showing 47 of 350 cards"
- **Clear All**: Prominent reset button

### 4. Deck Management Improvements

#### 4.1 Deck Statistics Dashboard

- **Mana Curve Chart**: Interactive bar chart using shadcn-ui
- **Faction Distribution**: Donut chart with percentages
- **Card Type Breakdown**: Stacked bar showing creatures/spells/etc
- **Average Stats**: CMC, Power, Toughness averages
- **Deck Legality**: Visual indicator for format compliance

#### 4.2 Card Stacking

- **Duplicate Handling**: Stack identical cards with quantity badge
- **Visual Indicator**: "2x" badge in corner
- **Interaction**: Click to expand/collapse stack
- **Drag Support**: Drag entire stack or single cards

#### 4.3 Deck Zones

- **Main Deck**: Primary area with card count
- **Sideboard**: Separate collapsible section (15 cards)
- **Considering**: Temporary holding area for maybe cards
- **Visual Separation**: Different background tints for each zone

### 5. Interaction Enhancements

#### 5.1 Multi-Select Mode

- **Batch Operations**: Shift+click to select multiple cards
- **Actions**: Add/remove selected cards at once
- **Visual Feedback**: Selected cards have colored outline

#### 5.2 Keyboard Shortcuts

- **Navigation**: Arrow keys to move between cards
- **Actions**:
  - Space: Add/remove card
  - Enter: View full details
  - Esc: Clear selection
  - Ctrl+F: Focus search
- **Shortcut Guide**: ? key shows overlay

#### 5.3 Drag and Drop

- **Visual Feedback**:
  - Drop zones highlight on drag start
  - Ghost card follows cursor
  - Invalid drop zones show red tint
- **Multi-Card Drag**: Drag selection of multiple cards
- **Auto-Scroll**: Scroll zones when dragging near edges

### 6. Visual Design Updates

#### 6.1 Modern Theme

- **Color Palette**:
  - Darker background (#0a0a0b)
  - Subtle gradients for depth
  - Faction colors as accents only
- **Typography**:
  - Larger, bolder headers
  - Improved contrast ratios
  - Variable font weights

#### 6.2 Micro-Animations

- **Card Interactions**:
  - Smooth scale on hover
  - Gentle float animation on add
  - Satisfying "snap" on drop
- **Transitions**:
  - Filter panel slide
  - Card grid reflow
  - Loading skeletons

#### 6.3 Visual Hierarchy

- **Z-Index Layers**:
  1. Background gradients
  2. Main content
  3. Floating panels
  4. Hover previews
  5. Modals/tooltips
- **Focus Management**: Clear focus indicators for accessibility

### 7. Performance Optimizations

#### 7.1 Virtualized Scrolling

- **Implementation**: React Virtual for card grids
- **Benefits**: Handle 1000+ cards smoothly
- **Lazy Loading**: Load card images on demand

#### 7.2 Search Optimization

- **Debounced Input**: 300ms delay before filtering
- **Indexed Search**: Pre-built search index for instant results
- **Fuzzy Matching**: Tolerate typos in card names

#### 7.3 State Management

- **Local Storage**: Persist deck and filter preferences
- **URL State**: Shareable deck URLs with state
- **Optimistic Updates**: Instant UI updates before server sync

### 8. Mobile-Specific Features

#### 8.1 Touch Optimizations

- **Larger Touch Targets**: Minimum 48x48px
- **Swipe Gestures**:
  - Swipe left: Remove from deck
  - Swipe right: Add to deck
  - Pull to refresh: Reload card pool
- **Haptic Feedback**: Subtle vibration on actions

#### 8.2 Bottom Sheet Filters

- **Implementation**: Draggable bottom sheet for filters
- **States**: Collapsed (peek), half, full
- **Quick Actions**: Common filters in peek state

#### 8.3 Responsive Card Views

- **Portrait Mode**: 2-column grid
- **Landscape Mode**: 3-4 column grid
- **Card Size Slider**: Pinch to zoom cards

### 9. Accessibility Improvements

#### 9.1 Screen Reader Support

- **ARIA Labels**: Comprehensive labeling
- **Live Regions**: Announce filter changes
- **Landmark Regions**: Proper section markup

#### 9.2 Color Accessibility

- **Faction Patterns**: Icons + patterns for colorblind users
- **Contrast Modes**: High contrast theme option
- **Focus Indicators**: Visible keyboard navigation

#### 9.3 Reduced Motion

- **Respect Preferences**: Check prefers-reduced-motion
- **Alternative Feedback**: Use opacity instead of movement
- **Instant Transitions**: No animations in reduced mode

### 10. Implementation Priority

#### Phase 1: Core Layout (Week 1-2)

1. Implement 3-column responsive layout
2. Add collapsible panels
3. Create compact card view
4. Basic virtualized scrolling

#### Phase 2: Filtering & Search (Week 3-4)

1. Build unified filter sidebar
2. Implement advanced search
3. Add filter presets
4. Create visual filter indicators

#### Phase 3: Deck Management (Week 5-6)

1. Add statistics dashboard
2. Implement card stacking
3. Create deck zones
4. Add import/export

#### Phase 4: Polish & Performance (Week 7-8)

1. Add animations and transitions
2. Optimize performance
3. Implement keyboard shortcuts
4. Mobile optimizations

## Success Metrics

1. **Card Visibility**: 50% more cards visible on screen
2. **Interaction Speed**: 30% faster deck building workflow
3. **Mobile Usage**: 40% increase in mobile engagement
4. **User Satisfaction**: Target 4.5/5 rating
5. **Performance**: <100ms filter response time

## Technical Requirements

- **Framework**: React 19 with TypeScript
- **UI Library**: shadcn-ui components exclusively
- **State Management**: Zustand or Context API
- **Styling**: Tailwind CSS with custom design tokens
- **Performance**: React Virtual for lists, Web Workers for search
- **Testing**: Jest + React Testing Library
- **Accessibility**: WCAG 2.1 AA compliance

## Conclusion

These improvements will transform the Algomancy Deckbuilder into a best-in-class deck building tool that maximizes screen efficiency while providing a delightful user experience. The phased approach ensures steady progress while maintaining stability.
