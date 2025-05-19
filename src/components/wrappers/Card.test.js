import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Card from './Card.svelte';
import { useComponent } from '$lib/utils/mcp-integration';

// Mock the MCP integration module
vi.mock('$lib/utils/mcp-integration', () => {
  return {
    useComponent: vi.fn(() =>
      Promise.resolve({
        html: '<div class="shadcn-card">Test Card</div>',
        script: '',
        styles: ''
      })
    )
  };
});

// Mock $app/paths for testing
vi.mock('$app/paths', () => {
  return {
    base: ''
  };
});

describe('Card Component', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    vi.clearAllMocks();
  });

  it('should render the Card component', async () => {
    render(Card, { name: 'Test Card', image_name: 'test.jpg', faction: 'earth' });

    // Verify the component exists
    expect(document.querySelector('.card-container')).toBeTruthy();
  });

  it('should call useComponent with correct props', async () => {
    render(Card, {
      name: 'Test Card',
      image_name: 'test.jpg',
      faction: 'earth',
      count: 1
    });

    // Check that useComponent was called with the correct props
    expect(useComponent).toHaveBeenCalledWith('Card', {
      name: 'Test Card',
      image: '/card_images/test.jpg',
      faction: 'earth',
      count: 1,
      withBadge: false
    });
  });

  it('should set withBadge to true when count > 1', async () => {
    render(Card, {
      name: 'Test Card',
      image_name: 'test.jpg',
      faction: 'earth',
      count: 2
    });

    // Check that withBadge is set to true when count > 1
    expect(useComponent).toHaveBeenCalledWith('Card', {
      name: 'Test Card',
      image: '/card_images/test.jpg',
      faction: 'earth',
      count: 2,
      withBadge: true
    });
  });
});
