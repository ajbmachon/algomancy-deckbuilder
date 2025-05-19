import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import BaseTheme from './BaseTheme.svelte';

// Create a simple test wrapper
const TestWrapper = `
<script>
  import BaseTheme from './BaseTheme.svelte';
</script>

<BaseTheme>
  <span data-testid="slot-content">Test Content</span>
</BaseTheme>
`;

describe('BaseTheme component', () => {
  it('should render as a container element', () => {
    const { container } = render(BaseTheme);
    // Simply check that it renders something
    expect(container.firstChild).not.toBeNull();
  });
  
  it('should render as a div element', () => {
    const { container } = render(BaseTheme);
    const element = container.firstChild;
    expect(element.nodeName).toBe('DIV');
  });
});