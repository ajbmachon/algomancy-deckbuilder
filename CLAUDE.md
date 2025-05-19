# Algomancy Deckbuilder

This is a SvelteKit application being modernized with shadcn-ui components for building and analyzing decks for the Algomancy card game. The application allows users to browse cards, filter them by various properties, add them to a deck, and analyze the deck composition.

## Project Structure

- `/src/lib/assets/cards_db.json` - Generated card database
- `/src/lib/stores/` - Svelte stores for managing application state
- `/src/components/ui/` - shadcn-ui components (to be installed via MCP)
- `/src/routes/` - SvelteKit pages and routes
- `/static/card_images/` - Card image files
- `/tools/` - Utilities for generating card data

## Key Features

- Filter and search cards by various properties (name, faction, cost, type, etc.)
- Build decks by selecting cards from the filtered pool
- Limit of 2 copies of each card in a deck
- Analyze deck composition and properties
- Persist decklist in local storage
- Responsive UI for different screen sizes
- Card stacking for duplicates (in development)

## Current Feature Branch

`feature/stack-duplicates` - Working on stacking duplicate cards in the deck view to provide a cleaner interface and better visual representation of card quantities.

## UI Modernization

We're transitioning from custom Svelte components to shadcn-ui components installed via the Model Context Protocol (MCP). This provides:
- Professional, accessible UI components
- Consistent design system
- Better mobile responsiveness
- Enhanced user experience

## Commands

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run test` - Run Vitest tests
- `npm run lint` - Run Prettier and ESLint checks
- `npm run format` - Format code with Prettier

## MCP Commands

- `claude mcp add --transport sse shadcn-ui http://localhost:3000/sse` - Add the shadcn-ui MCP server
- `@shadcn-ui install <component>` - Install a shadcn-ui component via the MCP

## Data Generation

The card database is generated from an upstream source using the `tools/gen-cardsdb.py` script, which:
1. Fetches card data from the Algomancy API
2. Processes and structures the data for application use
3. Generates search indexes for efficient filtering
4. Outputs the processed data to a JSON file

## Card Properties

- `name` - Card name
- `power` - Power value
- `toughness` - Toughness value
- `affinity` - Resource affinities
- `cost` - Total resource cost
- `type` - Card type
- `attributes` - Card attributes
- `complexity` - Complexity level
- `text` - Card text/description
- `factions` - Card factions (earth, wood, fire, water, metal)
- `image_name` - Filename of card image
