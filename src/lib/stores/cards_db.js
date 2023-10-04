import { readable } from 'svelte/store';

import cards_db from '$lib/assets/cards_db.json';

export const cards_by_key = cards_db.cards.reduce((acc, card) => {
  acc[card.key] = card;
  return acc;
}, {});

export default readable(cards_db);

export function cards_list(keys) {
  return keys.reduce((acc, key) => {
    acc.push(cards_by_key[key]);
    return acc;
  }, []);
}
