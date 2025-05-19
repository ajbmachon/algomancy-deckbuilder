import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CardWithCount from './CardWithCount.test.svelte';

describe('CardWithCount', () => {
  it('should render the card with proper image', () => {
    render(CardWithCount, {
      props: {
        name: 'Test Card',
        image_name: 'test.jpg',
        faction: 'earth'
      }
    });

    const img = screen.getByAlt('Test Card');
    expect(img).toBeTruthy();
    expect(img.src).toContain('test.jpg');
  });

  it('should not show badge when count is 1', () => {
    const { queryByTestId } = render(CardWithCount, {
      props: {
        name: 'Test Card',
        image_name: 'test.jpg',
        faction: 'earth',
        count: 1
      }
    });

    // With count=1, the badge should not be rendered
    expect(queryByTestId('card-badge')).toBeNull();
  });

  it('should show badge when count is greater than 1', () => {
    const { getByTestId } = render(CardWithCount, {
      props: {
        name: 'Test Card',
        image_name: 'test.jpg',
        faction: 'fire',
        count: 3
      }
    });

    const badge = getByTestId('card-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toBe('3');
  });

  it('should handle click events', () => {
    let clicked = false;
    const { component } = render(CardWithCount, {
      props: {
        name: 'Test Card',
        image_name: 'test.jpg',
        faction: 'water',
        count: 2
      }
    });

    component.$on('click', () => {
      clicked = true;
    });

    const img = screen.getByAlt('Test Card');
    img.click();

    expect(clicked).toBe(true);
  });
});
