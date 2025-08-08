import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import cardsDb from '@/lib/assets/cards_db.json';
import { search_terms, pool_entry, to_pool_by_key } from '@/lib/search';
import debounce from '@/lib/debounce';

// Create the context
export const CardContext = createContext(null);

// Helper function to convert search terms to filter format
function parseSearchValue(value) {
  const terms = search_terms(value);
  return terms.length > 0 ? { search_terms: terms } : {};
}

// Filter card pool based on search filter
function filterCardPool(filter, poolByKey, searchScopes) {
  const initAcc = [];

  // Parse search terms if we have a search value
  const searchFilter = filter.search_value ? parseSearchValue(filter.search_value) : filter;

  // Filter by search terms
  const matchedKeys =
    (searchFilter.search_terms &&
      searchFilter.search_terms
        .map(({ scope, term }) =>
          Object.entries(searchScopes)
            .filter(([searchScope, _]) => searchScope.includes(scope))
            .map(([_, searchTerms]) =>
              Object.entries(searchTerms)
                .filter(([searchTerm, _]) => searchTerm.includes(term))
                .reduce((acc, [_, keys]) => acc.concat(keys), [])
            )
            .reduce((acc, keys) => acc.concat(keys), [])
        )
        .reduce(
          (acc, keys) => (acc === initAcc ? keys : acc.filter(key => keys.includes(key))),
          initAcc
        )) ||
    initAcc;

  const newPool = Object.values(poolByKey)
    .filter(([entry]) => {
      if (matchedKeys !== initAcc && !matchedKeys.includes(entry.card.key)) {
        return false;
      }
      if (filter.hybrids_only && entry.card.factions.length < 2) {
        return false;
      }
      if (filter.factions && Object.keys(filter.factions).length > 0) {
        const activeFactions = Object.entries(filter.factions)
          .filter(([_, active]) => active)
          .map(([faction, _]) => faction);

        if (
          activeFactions.length > 0 &&
          !entry.card.factions.some(faction => activeFactions.includes(faction))
        ) {
          return false;
        }
      }
      return true;
    })
    .reduce((acc, [entry]) => {
      acc.push(entry);
      return acc;
    }, []);

  if (filter.sort_by && filter.sort_by !== 'any') {
    newPool.sort((a, b) => {
      const aVal = a.card[filter.sort_by];
      const bVal = b.card[filter.sort_by];
      // Doing reverse order, to get "biggest" on top!
      if (aVal > bVal) {
        return -1;
      }
      if (aVal < bVal) {
        return 1;
      }
      return 0;
    });
  }

  return newPool;
}

export function CardProvider({ children }) {
  // Card pool state
  const cardPool = cardsDb;
  const cardPoolByKey = useMemo(() => to_pool_by_key(cardPool.cards.map(pool_entry)), [cardPool]);

  // Filter state
  const [searchFilter, setSearchFilter] = useState({
    factions: {},
    hybrids_only: false,
    search_value: '',
    sort_by: 'any',
  });

  // Working state for loading indicator
  const [working, setWorking] = useState(false);

  // Filtered pool state
  const [filteredPool, setFilteredPool] = useState([]);

  // Create debounced filter function
  const debouncedFilter = useMemo(
    () =>
      debounce((filter, poolByKey, searchScopes) => {
        setWorking(true);
        const filtered = filterCardPool(filter, poolByKey, searchScopes);
        setFilteredPool(filtered);
        setWorking(false);
      }, 500),
    []
  );

  // Update filtered pool when filter changes
  useEffect(() => {
    debouncedFilter(searchFilter, cardPoolByKey, cardPool.search_scopes);
  }, [searchFilter, cardPoolByKey, cardPool.search_scopes, debouncedFilter]);

  // Helper objects for quick lookups
  const cardsByKey = useMemo(
    () =>
      cardPool.cards.reduce((acc, card) => {
        acc[card.key] = card;
        return acc;
      }, {}),
    [cardPool]
  );

  const cardsByName = useMemo(
    () =>
      cardPool.cards.reduce((acc, card) => {
        acc[card.name] = card;
        return acc;
      }, {}),
    [cardPool]
  );

  // Helper function to get cards list from keys
  const getCardsList = useCallback(
    keys => {
      return keys.reduce((acc, key) => {
        if (cardsByKey[key]) {
          acc.push(cardsByKey[key]);
        }
        return acc;
      }, []);
    },
    [cardsByKey]
  );

  const value = {
    // Data
    cardPool,
    cardPoolByKey,
    filteredPool,
    cardsByKey,
    cardsByName,
    working,

    // Filter state
    searchFilter,
    setSearchFilter,

    // Helper functions
    getCardsList,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
