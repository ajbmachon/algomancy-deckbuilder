import { describe, it, expect } from 'vitest';
import { groupCardsByName } from './card-utils';

describe('groupCardsByName', () => {
  it('should group cards by name', () => {
    const cards = [
      { id: '1', card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] } },
      { id: '2', card: { name: 'Card B', image_name: 'CardB.jpg', factions: ['fire'] } },
      { id: '3', card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] } },
      { id: '4', card: { name: 'Card C', image_name: 'CardC.jpg', factions: ['water'] } }
    ];

    const result = groupCardsByName(cards);

    expect(result).toEqual([
      {
        id: '1',
        card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] },
        count: 2,
        ids: ['1', '3']
      },
      {
        id: '2',
        card: { name: 'Card B', image_name: 'CardB.jpg', factions: ['fire'] },
        count: 1,
        ids: ['2']
      },
      {
        id: '4',
        card: { name: 'Card C', image_name: 'CardC.jpg', factions: ['water'] },
        count: 1,
        ids: ['4']
      }
    ]);
  });

  it('should return empty array for empty input', () => {
    const result = groupCardsByName([]);
    expect(result).toEqual([]);
  });

  it('should handle cards with no duplicates', () => {
    const cards = [
      { id: '1', card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] } },
      { id: '2', card: { name: 'Card B', image_name: 'CardB.jpg', factions: ['fire'] } },
      { id: '3', card: { name: 'Card C', image_name: 'CardC.jpg', factions: ['water'] } }
    ];

    const result = groupCardsByName(cards);

    expect(result).toEqual([
      {
        id: '1',
        card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] },
        count: 1,
        ids: ['1']
      },
      {
        id: '2',
        card: { name: 'Card B', image_name: 'CardB.jpg', factions: ['fire'] },
        count: 1,
        ids: ['2']
      },
      {
        id: '3',
        card: { name: 'Card C', image_name: 'CardC.jpg', factions: ['water'] },
        count: 1,
        ids: ['3']
      }
    ]);
  });

  it('should handle multiple duplicates of the same card', () => {
    const cards = [
      { id: '1', card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] } },
      { id: '2', card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] } },
      { id: '3', card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] } }
    ];

    const result = groupCardsByName(cards);

    expect(result).toEqual([
      {
        id: '1',
        card: { name: 'Card A', image_name: 'CardA.jpg', factions: ['earth'] },
        count: 3,
        ids: ['1', '2', '3']
      }
    ]);
  });
});
