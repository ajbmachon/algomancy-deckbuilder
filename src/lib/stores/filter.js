import { writable } from 'svelte/store';

export function default_filter() {
  return {
    factions: { colorless: false },
    hybrids_only: false,
    search_value: '',
    sort_by: 'any'
  };
}
export const search_filter = writable(default_filter());
export function filter_card_pool(filter, pool_by_key, search_scopes) {
  const init_acc = [];

  // Yes yes, utterly unreadable, I know...
  const matched_keys =
    (filter.search_terms &&
      filter.search_terms
        .map(({ scope, term }) =>
          Object.entries(search_scopes)
            .filter(([search_scope, _]) => search_scope.includes(scope))
            .map(([_, search_terms]) =>
              Object.entries(search_terms)
                .filter(([search_term, _]) => search_term.includes(term))
                .reduce((acc, [_, keys]) => acc.concat(keys), [])
            )
            .reduce((acc, keys) => acc.concat(keys), [])
        )
        .reduce(
          (acc, keys) => (acc == init_acc ? keys : acc.filter((key) => keys.includes(key))),
          init_acc
        )) ||
    init_acc;

  const new_pool = Object.values(pool_by_key)
    .filter(([entry]) => {
      if (matched_keys != init_acc && !matched_keys.includes(entry.card.key)) {
        return false;
      }
      if (filter.hybrids_only && entry.card.factions.length < 2) {
        return false;
      }
      if (filter.factions && !entry.card.factions.every((faction) => filter.factions[faction])) {
        return false;
      }
      return true;
    })
    .reduce((acc, [entry]) => {
      acc.push(entry);
      return acc;
    }, []);

  if (filter.sort_by !== 'any') {
    new_pool.sort((a, b) => {
      const a_val = a.card[filter.sort_by];
      const b_val = b.card[filter.sort_by];
      // Doing reverse order, to get "biggest" on top!
      if (a_val > b_val) {
        return -1;
      }
      if (a_val < b_val) {
        return 1;
      }
      return 0;
    });
  }
  return new_pool;
}

export function partition(cards, attr) {
  return Object.entries(
    cards.reduce((part, card) => {
      let values = card[attr];
      if (!Array.isArray(values)) {
        values = [values];
      } else if (attr === 'factions' && values.length > 1) {
        values = ['hybrid'];
      }
      for (const value of values) {
        if (part[value] === undefined) {
          part[value] = [];
        }
        part[value].push(card);
      }
      return part;
    }, {})
  );
}

export const analyse_scope = writable([]);
