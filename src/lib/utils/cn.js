import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine multiple class name strings with tailwind merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
