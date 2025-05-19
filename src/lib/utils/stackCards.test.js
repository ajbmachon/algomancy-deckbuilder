import { describe, it, expect } from 'vitest';
import { stackCards, isCardAtMaxCount } from './stackCards';

describe('stackCards', () => {
  it('should return an empty array when given null or undefined', () => {
    expect(stackCards(null)).toEqual([]);
    expect(stackCards(undefined)).toEqual([]);
  });

  it('should return an empty array when given an empty array', () => {
    expect(stackCards([])).toEqual([]);
  });

  it('should stack cards with the same name', () => {
    const cards = [
      {
        id: '1',
        card: {
          name: 'Card A',
          factions: ['earth'],
          image_name: 'card-a.jpg'
        }
      },
      {
        id: '2',
        card: {
          name: 'Card A',
          factions: ['earth'],
          image_name: 'card-a.jpg'
        }
      },
      {
        id: '3',
        card: {
          name: 'Card B',
          factions: ['water'],
          image_name: 'card-b.jpg'
        }
      }
    ];

    const result = stackCards(cards);

    expect(result).toHaveLength(2);

    // Check Card A stack
    expect(result[0].card.name).toBe('Card A');
    expect(result[0].count).toBe(2);
    expect(result[0].entries).toHaveLength(2);
    expect(result[0].entries[0].id).toBe('1');
    expect(result[0].entries[1].id).toBe('2');

    // Check Card B stack
    expect(result[1].card.name).toBe('Card B');
    expect(result[1].count).toBe(1);
    expect(result[1].entries).toHaveLength(1);
    expect(result[1].entries[0].id).toBe('3');
  });
});

describe('isCardAtMaxCount', () => {
  it('should return false when given null or undefined stack', () => {
    expect(isCardAtMaxCount('Card A', null)).toBe(false);
    expect(isCardAtMaxCount('Card A', undefined)).toBe(false);
  });

  it('should return false when card is not at max count', () => {
    const stack = [
      {
        id: '1',
        card: {
          name: 'Card A',
          factions: ['earth'],
          image_name: 'card-a.jpg'
        }
      }
    ];

    expect(isCardAtMaxCount('Card A', stack, 2)).toBe(false);
  });

  it('should return true when card is at max count', () => {
    const stack = [
      {
        id: '1',
        card: {
          name: 'Card A',
          factions: ['earth'],
          image_name: 'card-a.jpg'
        }
      },
      {
        id: '2',
        card: {
          name: 'Card A',
          factions: ['earth'],
          image_name: 'card-a.jpg'
        }
      }
    ];

    expect(isCardAtMaxCount('Card A', stack, 2)).toBe(true);
  });

  it('should use default max count of 2 if not specified', () => {
    const stack = [
      {
        id: '1',
        card: {
          name: 'Card A',
          factions: ['earth'],
          image_name: 'card-a.jpg'
        }
      },
      {
        id: '2',
        card: {
          name: 'Card A',
          factions: ['earth'],
          image_name: 'card-a.jpg'
        }
      }
    ];

    expect(isCardAtMaxCount('Card A', stack)).toBe(true);
  });
});
