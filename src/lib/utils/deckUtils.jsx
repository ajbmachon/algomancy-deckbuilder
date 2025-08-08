/**
 * Deck building utility functions
 */

import React from 'react';

/**
 * Faction utility classes (explicit strings so Tailwind doesn't purge them)
 */
export const factionBgClass = faction => {
  switch (faction) {
    case 'earth':
      return 'bg-faction-earth';
    case 'wood':
      return 'bg-faction-wood';
    case 'fire':
      return 'bg-faction-fire';
    case 'water':
      return 'bg-faction-water';
    case 'metal':
      return 'bg-faction-metal';
    case 'hybrid':
      return 'bg-faction-shard';
    default:
      return 'bg-primary';
  }
};

export const factionBg20Class = faction => {
  switch (faction) {
    case 'earth':
      return 'bg-faction-earth/20';
    case 'wood':
      return 'bg-faction-wood/20';
    case 'fire':
      return 'bg-faction-fire/20';
    case 'water':
      return 'bg-faction-water/20';
    case 'metal':
      return 'bg-faction-metal/20';
    case 'hybrid':
      return 'bg-faction-shard/20';
    default:
      return 'bg-primary/20';
  }
};

export const factionTextClass = faction => {
  switch (faction) {
    case 'earth':
      return 'text-faction-earth';
    case 'wood':
      return 'text-faction-wood';
    case 'fire':
      return 'text-faction-fire';
    case 'water':
      return 'text-faction-water';
    case 'metal':
      return 'text-faction-metal';
    case 'hybrid':
      return 'text-faction-shard';
    default:
      return 'text-primary';
  }
};

/**
 * Get faction icon component
 */
export const getFactionIcon = faction => {
  switch (faction) {
    case 'earth':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      );
    case 'wood':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    case 'fire':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      );
    case 'water':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      );
    case 'metal':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      );
    default:
      return null;
  }
};

/**
 * Extract real card types (those with {braces}) from the cards
 */
export const extractRealTypes = str => {
  const matches = str.match(/{([^}]+)}/g);
  return matches ? matches.map(match => match.replace(/[{}]/g, '')) : [];
};

/**
 * Get unique values from card pool
 */
export const getUniqueValues = contextFilteredPool => {
  // Get unique faction values (filter out colorless)
  const factions = [
    ...new Set(contextFilteredPool.flatMap(card => card.card.factions.map(f => f.toLowerCase()))),
  ].filter(faction => faction !== 'colorless');

  // Get unique cost values (ensure numeric costs are sorted with 'X' at the end)
  const rawCostsSet = new Set(contextFilteredPool.map(c => c.card.cost));
  const numericSet = new Set();
  let hasX = false;
  for (const v of rawCostsSet) {
    if (v === 'X' || v === 'x') {
      hasX = true;
      continue;
    }
    const n = typeof v === 'number' ? v : Number.parseInt(String(v), 10);
    if (Number.isFinite(n)) numericSet.add(n);
  }
  const costs = [...numericSet].sort((a, b) => a - b);
  if (hasX) costs.push('X');

  // Get all real types from the card pool
  const allRealTypes = contextFilteredPool.flatMap(card => extractRealTypes(card.card.type));

  // Filter to types that appear in multiple cards and sort alphabetically
  const typeCounts = allRealTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const types = Object.entries(typeCounts)
    .filter(([_, count]) => count > 1)
    .map(([type]) => type)
    .sort();

  return { factions, costs, types };
};

/**
 * Apply filters to card pool
 */
export const applyFilters = (contextFilteredPool, activeFilters) => {
  // Use the filtered pool from context
  let filtered = contextFilteredPool.filter(
    card => !card.card.factions.some(faction => faction.toLowerCase() === 'colorless')
  );

  // Filter by factions
  if (activeFilters.factions.length > 0) {
    filtered = filtered.filter(card =>
      card.card.factions.some(faction => activeFilters.factions.includes(faction.toLowerCase()))
    );
  }

  // Filter by cost
  if (activeFilters.cost !== null) {
    filtered = filtered.filter(card => card.card.cost === activeFilters.cost);
  }

  // Filter by types (multiple selection)
  if (activeFilters.types.length > 0) {
    filtered = filtered.filter(card =>
      activeFilters.types.some(type => card.card.type.includes(type))
    );
  }

  return filtered;
};

/**
 * Calculate deck statistics
 */
export const calculateDeckStats = deck => {
  const factionCounts = {};
  const typeCounts = {};
  const costCounts = {};
  const totalCards = deck.length;

  // Count cards by faction, type, and cost
  deck.forEach(item => {
    const card = item.card;

    // Count by faction
    const cardFactions = card.factions;
    cardFactions.forEach(faction => {
      const normalizedFaction = faction.toLowerCase();
      if (normalizedFaction !== 'colorless') {
        factionCounts[normalizedFaction] = (factionCounts[normalizedFaction] || 0) + 1;
      }
    });

    // Count by type
    const cardType = card.type;
    typeCounts[cardType] = (typeCounts[cardType] || 0) + 1;

    // Count by cost
    const cardCost = card.cost;
    costCounts[cardCost] = (costCounts[cardCost] || 0) + 1;
  });

  return { factionCounts, typeCounts, costCounts, totalCards };
};

/**
 * Sort cards by specified criteria
 */
export const sortCards = (cards, sortBy, sortDir) => {
  const arr = [...cards];
  arr.sort((a, b) => {
    const ca = a.card;
    const cb = b.card;
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'cost') return (ca.cost - cb.cost) * mul;
    return ca.name.localeCompare(cb.name) * mul;
  });
  return arr;
};
