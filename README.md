# Algomancy Deckbuilder

A modern deckbuilding application for [Algomancy](https://algomancy.io/), the deckbuilder CCG.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- Browse and filter the card collection
- Build decks with up to 2 copies of each card
- Analyze deck composition and properties
- Persist decklist in local storage
- Responsive UI for different screen sizes

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Development Commands

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run test` - Run Vitest tests
- `npm run lint` - Run ESLint checks
- `npm run format` - Format code with Prettier

## Project Structure

- `/src/lib/assets/cards_db.json` - Generated card database
- `/src/lib/stores/` - Svelte stores for managing application state
- `/src/lib/components/` - Reusable UI components
- `/src/routes/` - SvelteKit pages and routes
- `/static/card_images/` - Card image files
- `/tools/` - Utilities for generating card data

## UI Features

The application uses shadcn-ui components to provide a polished look and better user experience:
- Card stacking for duplicates
- Enhanced filtering and search
- Modern dark UI theme
- Improved deck analysis tools
- Responsive design for all devices

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Original code created by Andreas Stenius (2023) with enhancements by Andre Machon.

All card data and images are property of Algomancy.
