import { filtered_pool } from '$lib/stores/cards_db.js';
import debounce from '$lib/debounce.js';

function next_card_id() {
  return (next_card_id.__counter += 1);
}
next_card_id.__counter = 0;

export function search_terms(value) {
  return value
    .toLowerCase()
    .split(' ')
    .reduce(
      ({ acc, curr, scope }, s) => {
        function push(term) {
          if (term.includes(':')) {
            scope = term.slice(0, term.indexOf(':'));
            term = term.slice(scope.length + 1);
          }
          if (term) {
            acc.push({ scope, term });
            scope = 'any';
          }
        }
        if (s.includes('"')) {
          for (var w of s.split('"')) {
            if (curr === null) {
              curr = ' ';
              if (w) {
                push(w);
              }
            } else if (w) {
              curr += w + ' ';
            } else if (curr !== ' ') {
              push(curr);
              curr = null;
              if (s === '"') {
                break;
              }
            }
          }
        } else if (curr !== null) {
          curr += s + ' ';
        } else if (s) {
          push(s);
        }
        return { acc, curr, scope };
      },
      { acc: [], curr: null, scope: 'any' }
    ).acc;
}

export function pool_entry(card) {
  return { id: next_card_id(), card };
}

export function to_pool_by_key(pool) {
  return pool.reduce((acc, entry) => {
    const key = entry.card?.key;
    if (key !== undefined) {
      if (acc[key] === undefined) {
        acc[key] = [];
      }
      acc[key].push(entry);
    }
    return acc;
  }, {});
}

export function from_pool_by_key(pool_by_key) {
  return Object.values(pool_by_key).reduce((acc, entries) => {
    entries.map((entry) => {
      if (entry.card) {
        acc.push(entry);
      }
    });
    return acc;
  }, []);
}

function _do_filter_card_pool(filter, pool_by_key, search_scopes) {
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
      acc.push(pool_entry(entry.card));
      return acc;
    }, []);
  filtered_pool.set(new_pool);
  return new_pool.length;
}

export const filter_card_pool = debounce(_do_filter_card_pool, 500);
