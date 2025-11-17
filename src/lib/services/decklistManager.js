/**
 * Service for managing saved decklists in localStorage
 */

const DECK_PREFIX = 'algomancy:deck:';

/**
 * Get all saved decklist names from localStorage
 * @returns {Array<string>} Array of deck names
 */
export function getAllDecklistNames() {
  const deckNames = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(DECK_PREFIX)) {
      deckNames.push(key.substring(DECK_PREFIX.length));
    }
  }
  return deckNames.sort();
}

/**
 * Get all saved decklists with metadata
 * @returns {Array<Object>} Array of deck objects with metadata
 */
export function getAllDecklists() {
  const decklists = [];
  const names = getAllDecklistNames();

  for (const name of names) {
    const deck = loadDeck(name);
    if (deck) {
      const metadata = getDeckMetadata(deck, name);
      decklists.push({
        name,
        deck,
        ...metadata,
      });
    }
  }

  // Sort by last modified (most recent first)
  return decklists.sort((a, b) => b.lastModified - a.lastModified);
}

/**
 * Load a deck by name
 * @param {string} name - Deck name
 * @returns {Array|null} Deck array or null if not found
 */
export function loadDeck(name) {
  try {
    const data = localStorage.getItem(`${DECK_PREFIX}${name}`);
    if (!data) return null;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    console.error(`Failed to load deck '${name}':`, e);
    return null;
  }
}

/**
 * Save a deck with the given name
 * @param {string} name - Deck name
 * @param {Array} deck - Deck array
 * @returns {boolean} Success status
 */
export function saveDeck(name, deck) {
  try {
    if (!name || !name.trim()) {
      throw new Error('Deck name cannot be empty');
    }
    if (!Array.isArray(deck)) {
      throw new Error('Invalid deck data');
    }
    localStorage.setItem(`${DECK_PREFIX}${name}`, JSON.stringify(deck));
    return true;
  } catch (e) {
    console.error(`Failed to save deck '${name}':`, e);
    return false;
  }
}

/**
 * Delete a deck by name
 * @param {string} name - Deck name
 * @returns {boolean} Success status
 */
export function deleteDeck(name) {
  try {
    localStorage.removeItem(`${DECK_PREFIX}${name}`);
    return true;
  } catch (e) {
    console.error(`Failed to delete deck '${name}':`, e);
    return false;
  }
}

/**
 * Rename a deck
 * @param {string} oldName - Current deck name
 * @param {string} newName - New deck name
 * @returns {boolean} Success status
 */
export function renameDeck(oldName, newName) {
  try {
    if (!newName || !newName.trim()) {
      throw new Error('New deck name cannot be empty');
    }
    if (oldName === newName) {
      return true;
    }
    if (deckExists(newName)) {
      throw new Error(`Deck '${newName}' already exists`);
    }

    const deck = loadDeck(oldName);
    if (!deck) {
      throw new Error(`Deck '${oldName}' not found`);
    }

    saveDeck(newName, deck);
    deleteDeck(oldName);
    return true;
  } catch (e) {
    console.error(`Failed to rename deck '${oldName}' to '${newName}':`, e);
    return false;
  }
}

/**
 * Check if a deck exists
 * @param {string} name - Deck name
 * @returns {boolean} True if deck exists
 */
export function deckExists(name) {
  return localStorage.getItem(`${DECK_PREFIX}${name}`) !== null;
}

/**
 * Get metadata for a deck
 * @param {Array} deck - Deck array
 * @param {string} name - Deck name
 * @returns {Object} Metadata object
 */
export function getDeckMetadata(deck, name) {
  const cardCount = deck.length;
  const uniqueCards = new Set();
  const factions = new Set();

  deck.forEach(entry => {
    const card = entry.card || entry;
    uniqueCards.add(card.key);

    // Extract factions
    if (card.factions && Array.isArray(card.factions)) {
      card.factions.forEach(faction => factions.add(faction.toLowerCase()));
    }
  });

  // Try to get last modified time from localStorage metadata
  // For now, we'll use current time as a placeholder
  const lastModified = Date.now();

  return {
    cardCount,
    uniqueCardCount: uniqueCards.size,
    factions: Array.from(factions),
    lastModified,
  };
}

/**
 * Duplicate a deck with a new name
 * @param {string} sourceName - Source deck name
 * @param {string} newName - New deck name
 * @returns {boolean} Success status
 */
export function duplicateDeck(sourceName, newName) {
  try {
    if (!newName || !newName.trim()) {
      throw new Error('New deck name cannot be empty');
    }
    if (deckExists(newName)) {
      throw new Error(`Deck '${newName}' already exists`);
    }

    const deck = loadDeck(sourceName);
    if (!deck) {
      throw new Error(`Deck '${sourceName}' not found`);
    }

    return saveDeck(newName, deck);
  } catch (e) {
    console.error(`Failed to duplicate deck '${sourceName}':`, e);
    return false;
  }
}
