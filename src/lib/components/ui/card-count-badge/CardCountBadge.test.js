import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CardCountBadge from './CardCountBadge.svelte';

describe('CardCountBadge', () => {
  it('should render with the correct count', () => {
    render(CardCountBadge, { props: { count: 3, faction: 'earth' } });

    const badge = screen.getByText('3');
    expect(badge).toBeTruthy();
  });

  it('should not render when count is 1', () => {
    const { container } = render(CardCountBadge, { props: { count: 1, faction: 'water' } });

    // With count=1, the component shouldn't render the badge
    expect(container.textContent).toBe('');
  });

  it('should apply the correct faction class', () => {
    const { container } = render(CardCountBadge, { props: { count: 2, faction: 'fire' } });

    const badge = container.querySelector('.bg-faction-fire');
    expect(badge).toBeTruthy();
  });

  it('should handle undefined faction', () => {
    const { container } = render(CardCountBadge, { props: { count: 2 } });

    // Should use a default styling when no faction is provided
    const badge = container.querySelector('.badge');
    expect(badge).toBeTruthy();
  });
});
