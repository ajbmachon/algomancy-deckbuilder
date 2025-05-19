/**
 * Groups cards by name and returns stacked representation
 * @param {Array} cards - Array of card objects to stack
 * @returns {Array} - Array of grouped card objects with count
 */
export function stackCards(cards) {
  if (!cards || !Array.isArray(cards)) {
    return [];
  }

  const groups = cards.reduce((acc, entry) => {
    const key = entry.card.name;
    if (!acc[key]) {
      acc[key] = {
        card: entry.card,
        count: 0,
        entries: []
      };
    }
    acc[key].count++;
    acc[key].entries.push(entry);
    return acc;
  }, {});

  return Object.values(groups);
}

/**
 * Check if a card is disabled (e.g., at maximum count)
 * @param {string} cardName - Name of the card to check
 * @param {Array} stack - Current deck or collection of cards
 * @param {number} maxCount - Maximum allowed copies of a card (default: 2)
 * @returns {boolean} - Whether the card is at maximum count
 */
export function isCardAtMaxCount(cardName, stack, maxCount = 2) {
  if (!stack || !Array.isArray(stack)) {
    return false;
  }

  const count = stack.filter((entry) => entry.card.name === cardName).length;
  return count >= maxCount;
}
