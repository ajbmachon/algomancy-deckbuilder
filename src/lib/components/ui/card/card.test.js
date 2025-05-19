import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './index.js';

describe('Card components', () => {
  it('should render Card as a div by default', () => {
    const { container } = render(Card);
    const cardElement = container.querySelector('div');
    
    expect(cardElement).not.toBeNull();
    expect(cardElement.tagName).toBe('DIV');
  });
  
  it('should render Card with custom element', () => {
    const { container } = render(Card, { props: { element: 'section' } });
    const cardElement = container.querySelector('section');
    
    expect(cardElement).not.toBeNull();
    expect(cardElement.tagName).toBe('SECTION');
  });
  
  it('should render CardHeader as a div', () => {
    const { container } = render(CardHeader);
    const headerElement = container.querySelector('div');
    
    expect(headerElement).not.toBeNull();
  });
  
  it('should render CardTitle as h3 by default', () => {
    const { container } = render(CardTitle);
    const titleElement = container.querySelector('h3');
    
    expect(titleElement).not.toBeNull();
  });
  
  it('should render CardContent as a div', () => {
    const { container } = render(CardContent);
    const contentElement = container.querySelector('div');
    
    expect(contentElement).not.toBeNull();
  });
});