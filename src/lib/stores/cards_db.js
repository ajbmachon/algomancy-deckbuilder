import { readable, writable, derived } from 'svelte/store';
import { search_filter, filter_card_pool } from '$lib/stores/filter.js';
import { pool_entry, to_pool_by_key } from '$lib/search.js';

import cards_db from '$lib/assets/cards_db.json';

export const card_pool = readable(cards_db);
export const card_pool_by_key = derived(card_pool, ($card_pool) =>
  to_pool_by_key($card_pool.cards.map(pool_entry))
);

let filter_timeout;
export const filtered_pool = derived(
  [search_filter, card_pool_by_key, card_pool],
  ([$search_filter, $card_pool_by_key, $card_pool], set) => {
    if (filter_timeout) {
      clearTimeout(filter_timeout);
    }
    filter_timeout = setTimeout(() => {
      filter_timeout = undefined;
      set(filter_card_pool($search_filter, $card_pool_by_key, $card_pool.search_scopes));
    }, 500);
    return () => {
      if (filter_timeout) {
        clearTimeout(filter_timeout);
        filter_timeout = undefined;
      }
    };
  },
  []
);

export const cards_by_key = cards_db.cards.reduce((acc, card) => {
  acc[card.key] = card;
  return acc;
}, {});

export const cards_by_name = cards_db.cards.reduce((acc, card) => {
  acc[card.name] = card;
  return acc;
}, {});

export function cards_list(keys) {
  return keys.reduce((acc, key) => {
    acc.push(cards_by_key[key]);
    return acc;
  }, []);
}
