import {expect, test} from 'vitest'
import { get } from 'svelte/store';

import { card_pool, card_pool_by_key } from '$lib/stores/cards_db.js'
import { search_filter, default_filter, filter_card_pool } from '$lib/stores/filter.js'


test('filter no cards', () => {
  let filter = {};
  const filtered_pool = filter_card_pool(filter, get(card_pool_by_key), {});
  expect(filtered_pool).toBeInstanceOf(Array);
  expect(filtered_pool.length > 0).toBe(true);
})

test('filter all cards', () => {
  let filter = { factions: {} };
  const filtered_pool = filter_card_pool(filter, get(card_pool_by_key), {});
  expect(filtered_pool).toBeInstanceOf(Array);
  expect(filtered_pool).toHaveLength(0);
})


test('filter fire cards', () => {
  let filter = {
    factions: { fire: true }
  };
  const filtered_pool = filter_card_pool(filter, get(card_pool_by_key), {});
  expect(filtered_pool).toBeInstanceOf(Array);
  expect(filtered_pool.length > 0).toBe(true);
  expect(filtered_pool.every(e => e.card.factions.includes('fire'))).toBe(true);
})


test('filter fire cards using scope', () => {
  let filter = {
    search_terms: [
      {scope: 'faction', term: 'fire'},
    ]
  };
  const filtered_pool = filter_card_pool(filter, get(card_pool_by_key), get(card_pool).search_scopes);
  expect(filtered_pool).toBeInstanceOf(Array);
  expect(filtered_pool.length > 0).toBe(true);
  expect(filtered_pool.every(e => e.card.factions.includes('fire'))).toBe(true);
})

test('filter cards with virus attribute', () => {
  let filter = {
    search_terms: [
      {scope: 'attr', term: 'virus'},
    ]
  };
  const filtered_pool = filter_card_pool(filter, get(card_pool_by_key), get(card_pool).search_scopes);
  expect(filtered_pool).toBeInstanceOf(Array);
  expect(filtered_pool.length > 0).toBe(true);
  expect(filtered_pool.every(e => e.card.attributes.includes('Virus'))).toBe(true);
})
