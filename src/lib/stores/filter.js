import { writable } from 'svelte/store';

export const search_filter = writable({
  factions: { colorless: false },
  hybrids_only: false,
  search_value: ''
});
export function filter_card_pool(filter, pool_by_key, search_scopes) {
  console.log('run filter');
  const init_acc = [];
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

  return new_pool;
}
