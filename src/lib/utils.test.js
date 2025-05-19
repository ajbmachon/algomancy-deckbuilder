import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional class names', () => {
      const condition = true;
      expect(cn('foo', condition && 'bar')).toBe('foo bar');
      expect(cn('foo', false && 'bar')).toBe('foo');
    });

    it('should merge tailwind classes correctly', () => {
      expect(cn('p-4 text-red-500', 'p-8')).toBe('text-red-500 p-8');
    });

    it('should handle arrays and objects', () => {
      expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
      expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
    });

    it('should handle null, undefined and empty values', () => {
      expect(cn('foo', null, undefined, '', 'bar')).toBe('foo bar');
    });
  });
});