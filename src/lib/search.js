export function next_card_id() {
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
