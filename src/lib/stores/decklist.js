import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createDecklist() {
  const initial = browser ? JSON.parse(localStorage.getItem('decklist') || '[]') : [];
  const { subscribe, set, update } = writable(initial);
  if (browser) {
    subscribe((value) => {
      localStorage.setItem('decklist', JSON.stringify(value));
    });
  }
  return { subscribe, set, update };
}

export const decklist = createDecklist();
