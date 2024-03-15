import {expect, test} from 'vitest'
import { get } from 'svelte/store';

import { card_pool, card_pool_by_key, cards_by_key, cards_by_name } from '$lib/stores/cards_db.js'


test('cards db properly set up', () => {
  const card = cards_by_name["Megadeath"];
  expect(card).toBeDefined();
  expect(cards_by_key[card.key]).toBe(card);
})

test('`card_pool` store ok', () => {
  expect(get(card_pool)).toHaveProperty('cards');
})

test('`card_pool_by_key` store ok', () => {
  expect(get(card_pool_by_key)).toBeTypeOf('object');
})
