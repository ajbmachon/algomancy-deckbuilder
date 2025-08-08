import React, { createContext, useState, useCallback } from 'react';

// Create the context
export const FilterContext = createContext(null);

// Default filter state
const defaultFilter = {
  factions: {},
  hybrids_only: false,
  search_value: '',
  sort_by: 'any',
  cost: null,
  types: [],
};

// Helper function to partition cards by attribute
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

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState(defaultFilter);
  const [analyseScope, setAnalyseScope] = useState([]);

  // Toggle faction filter
  const toggleFaction = useCallback(faction => {
    setFilter(prev => ({
      ...prev,
      factions: {
        ...prev.factions,
        [faction]: !prev.factions[faction],
      },
    }));
  }, []);

  // Set cost filter
  const setCost = useCallback(cost => {
    setFilter(prev => ({
      ...prev,
      cost: prev.cost === cost ? null : cost,
    }));
  }, []);

  // Toggle type filter
  const toggleType = useCallback(type => {
    setFilter(prev => {
      const types = [...prev.types];
      const index = types.indexOf(type);

      if (index === -1) {
        types.push(type);
      } else {
        types.splice(index, 1);
      }

      return { ...prev, types };
    });
  }, []);

  // Set search value
  const setSearchValue = useCallback(value => {
    setFilter(prev => ({
      ...prev,
      search_value: value,
    }));
  }, []);

  // Set sort by
  const setSortBy = useCallback(sortBy => {
    setFilter(prev => ({
      ...prev,
      sort_by: sortBy,
    }));
  }, []);

  // Toggle hybrids only
  const toggleHybridsOnly = useCallback(() => {
    setFilter(prev => ({
      ...prev,
      hybrids_only: !prev.hybrids_only,
    }));
  }, []);

  // Reset filter to default
  const resetFilter = useCallback(() => {
    setFilter(defaultFilter);
  }, []);

  // Clear all filters but keep search
  const clearFilters = useCallback(() => {
    setFilter(prev => ({
      ...defaultFilter,
      search_value: prev.search_value,
    }));
  }, []);

  const value = {
    // State
    filter,
    setFilter,
    analyseScope,
    setAnalyseScope,

    // Actions
    toggleFaction,
    setCost,
    toggleType,
    setSearchValue,
    setSortBy,
    toggleHybridsOnly,
    resetFilter,
    clearFilters,

    // Helpers
    partition,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}
