/**
 * Utility functions for card operations
 * Contains functions for grouping and processing card data
 */

/**
 * Groups cards by name, counting duplicates
 * @param {Array} cards - List of card entries
 * @returns {Array} - Grouped card entries with count and ids
 */
export function groupCardsByName(cards) {
  if (!cards || !cards.length) return [];

  const cardGroups = {};

  // Group cards by name
  cards.forEach((card) => {
    const cardName = card.card.name;

    if (!cardGroups[cardName]) {
      cardGroups[cardName] = {
        id: card.id,
        card: card.card,
        count: 1,
        ids: [card.id]
      };
    } else {
      cardGroups[cardName].count += 1;
      cardGroups[cardName].ids.push(card.id);
    }
  });

  // Convert back to array
  return Object.values(cardGroups);
}
